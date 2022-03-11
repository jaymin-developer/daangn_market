import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { getMyDate } from "../../../commons/libraries/utils"
import {
  FETCH_USED_ITEMS_I_SOLD,
  FETCH_USED_ITMES_COUNT_I_SOLD,
} from "./mypage.queries"
import * as S from "./mypage.styles"
import InfiniteScroll from "react-infinite-scroller"
import { CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router"

export default function SellHistory() {
  const router = useRouter()
  const [_, setSelling] = useState(true)
  const [sold, setSold] = useState(false)
  const [isSellingClicked, setIsSellingClicked] = useState(true)
  const [isSoldClicked, setIsSoldClicked] = useState(false)
  const { data, fetchMore } = useQuery(FETCH_USED_ITEMS_I_SOLD, {
    variables: { page: 1 },
  })
  const { data: countData } = useQuery(FETCH_USED_ITMES_COUNT_I_SOLD)

  useEffect(() => {
    router.push("/mypage/?soldList", undefined, { shallow: true })
  }, [])

  const onClickSelling = () => {
    setSelling(true)
    setSold(false)
    setIsSellingClicked(true)
    setIsSoldClicked(false)
  }

  const onClickSold = () => {
    setSelling(false)
    setSold(true)
    setIsSellingClicked(false)
    setIsSoldClicked(true)
  }

  const onLoadMore = () => {
    if (!data) return

    fetchMore({
      variables: {
        page: Math.ceil(data.fetchUseditemsISold.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditemsISold)
          return { fetchUseditemsISold: [...prev.fetchUseditemsISold] }

        return {
          fetchUseditemsISold: [
            ...prev.fetchUseditemsISold,
            ...fetchMoreResult.fetchUseditemsISold,
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
        <S.Selling isSellingClicked={isSellingClicked} onClick={onClickSelling}>
          판매중
        </S.Selling>
        <S.Sold isSoldClicked={isSoldClicked} onClick={onClickSold}>
          거래완료 ( {countData?.fetchUseditemsCountISold}건 )
        </S.Sold>
      </S.TopMenu>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditemsISold
          .filter((el) => (sold ? el.buyer : !el.buyer))
          .map((el) => (
            <S.ItemListBox key={el._id} id={el._id} onClick={onClickDetail}>
              <S.ItemListCard variant="outlined">
                <S.ImageBox
                  src={`https://storage.googleapis.com/${el.images[0]}`}
                  onError={(e) => {
                    e.currentTarget.src = "/images/logo-basic.svg"
                  }}
                />
                <CardContent style={{ width: "100%" }}>
                  <S.TypographyName id={el._id} variant="h5">
                    상품명 :<span> </span>
                    {el.name}
                  </S.TypographyName>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {el.soldAt
                      ? `판매일자 : ${getMyDate(el.soldAt)}`
                      : `등록일자 : ${getMyDate(el.createdAt)}`}
                  </Typography>
                  <p style={{ color: "gray" }}>
                    거래위치 :
                    {el.useditemAddress?.address
                      ? el.useditemAddress?.address
                      : "위치 정보 없음"}
                  </p>
                  <S.TypographyPrice variant="body2">
                    {el.soldAt ? (
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
                        <span> {el.price}원</span>
                      </div>
                    ) : (
                      <div>
                        <span>판매금액 </span> <span>{el.price}원</span>
                      </div>
                    )}
                  </S.TypographyPrice>
                </CardContent>
              </S.ItemListCard>
            </S.ItemListBox>
          ))}
      </InfiniteScroll>
    </>
  )
}
