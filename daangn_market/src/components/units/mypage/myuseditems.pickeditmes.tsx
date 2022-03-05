import { useQuery } from "@apollo/client"
import { getMyDate } from "../../../commons/libraries/utils"
import * as S from "./mypage.styles"
import InfiniteScroll from "react-infinite-scroller"
import { FETCH_USED_ITEMS_PICKED } from "./mypage.queries"
import { useRouter } from "next/router"
import { CardContent, Typography } from "@mui/material"

export default function PickedItems(props) {
  const router = useRouter()
  const { data, fetchMore } = useQuery(FETCH_USED_ITEMS_PICKED, {
    variables: {
      page: 1,
      search: "",
    },
  })

  const onLoadMore = () => {
    if (!data) return

    fetchMore({
      variables: {
        page: Math.ceil(data.fetchUseditemsIPicked.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditemsIPicked)
          return {
            fetchUseditemsIPicked: [...prev.fetchUseditemsIPicked],
          }

        return {
          fetchUseditemsIPicked: [
            ...prev.fetchUseditemsIPicked,
            ...fetchMoreResult.fetchUseditemsIPicked,
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
        <S.Selling style={{ color: "#FF7E35" }}>찜한 목록</S.Selling>
      </S.TopMenu>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditemsIPicked.map((el) => (
          <S.ItemListBox key={el._id} id={el._id} onClick={onClickDetail}>
            <S.ItemListCard variant="outlined">
              <S.ImageBox
                src={`https://storage.googleapis.com/${el.images[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-basic.svg"
                }}
              />
              <CardContent style={{ width: "75%" }}>
                <S.TypographyName id={el._id} variant="h5">
                  상품명 :<span> </span>
                  {el.name}
                </S.TypographyName>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  판매일자 : {getMyDate(el.soldAt)}
                </Typography>
                <p style={{ color: "gray" }}>
                  거래위치 :
                  {el.useditemAddress?.address
                    ? el.useditemAddress?.address
                    : "위치 정보 없음"}
                </p>
                <S.TypographyPrice variant="body2">
                  <div>
                    <span>판매가격</span>
                    <span> {el.price}원</span>
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
                <div>❤️ {el.pickedCount}</div>
              </CardContent>
            </S.ItemListCard>
          </S.ItemListBox>
        ))}
      </InfiniteScroll>
    </>
  )
}
