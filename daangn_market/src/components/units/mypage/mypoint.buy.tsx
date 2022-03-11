import { useQuery } from "@apollo/client"
import { getMyDate } from "../../../commons/libraries/utils"
import { FETCH_POINT_TRANSACTION_OF_BUYING } from "./mypage.queries"
import * as S from "./mypage.styles"
import InfiniteScroll from "react-infinite-scroller"
import { CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function BuyHistory() {
  const router = useRouter()

  useEffect(() => {
    router.push("/mypage/?buyList", undefined, { shallow: true })
  }, [])

  const { data, fetchMore } = useQuery(FETCH_POINT_TRANSACTION_OF_BUYING, {
    variables: { page: 1 },
  })

  const onLoadMore = () => {
    if (!data) return

    fetchMore({
      variables: {
        page: Math.ceil(data.fetchPointTransactionsOfBuying.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchPointTransactionsOfBuying)
          return {
            fetchPointTransactionsOfBuying: [
              ...prev.fetchPointTransactionsOfBuying,
            ],
          }

        return {
          fetchPointTransactionsOfBuying: [
            ...prev.fetchPointTransactionsOfBuying,
            ...fetchMoreResult.fetchPointTransactionsOfBuying,
          ],
        }
      },
    })
  }

  const onClickDetail = (event) => {
    router.push(`/useditems/${event.currentTarget.id}`)
  }

  return (
    <>
      <S.TopMenu>
        <S.Selling style={{ color: "#FF7E35" }}>구매목록</S.Selling>
      </S.TopMenu>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchPointTransactionsOfBuying.map((el) => (
          <S.ItemListBox key={el._id} id={el._id} onClick={onClickDetail}>
            <S.ItemListCard variant="outlined">
              <S.ImageBox
                src={`https://storage.googleapis.com/${el.useditem.images[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-basic.svg"
                }}
              />
              <CardContent style={{ width: "75%" }}>
                <S.TypographyName id={el._id} variant="h5">
                  상품명 :<span> </span>
                  {el.useditem.name}
                </S.TypographyName>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  판매일자 : {getMyDate(el.useditem.soldAt)}
                </Typography>
                <p style={{ color: "gray" }}>
                  거래위치 :
                  {el.useditem.useditemAddress?.address
                    ? el.useditem.useditemAddress?.address
                    : "위치 정보 없음"}
                </p>
                <S.TypographyPrice variant="body2">
                  <div>
                    <span
                      style={{
                        backgroundColor: "gray",
                        color: "white",
                        borderRadius: "10px",
                        padding: "5px",
                      }}
                    >
                      거래완료
                    </span>
                    <span> {el.useditem.price}원</span>
                  </div>
                </S.TypographyPrice>
              </CardContent>
              <CardContent
                style={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div>남은포인트</div>
                {el.balance}
              </CardContent>
            </S.ItemListCard>
          </S.ItemListBox>
        ))}
      </InfiniteScroll>
    </>
  )
}
