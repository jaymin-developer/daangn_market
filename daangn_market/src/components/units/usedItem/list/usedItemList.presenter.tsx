import * as ItemList from "./usedItemList.styles"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { getMyDate, NowDate } from "../../../../commons/libraries/utils"
import InfiniteScroll from "react-infinite-scroller"
import RegionSelect from "../../../commons/regionSelect/RegionSelect"

export default function UsedItemListUI(props) {
  return (
    <ItemList.Wrapper>
      <ItemList.Head>중고거래 상품</ItemList.Head>
      <ItemList.BodyInfo>
        <RegionSelect onChangeRegion={props.onChangeRegion} />
        <ItemList.WriteButton onClick={props.onClickMoveToUsedItemNew}>
          작성하기
        </ItemList.WriteButton>
      </ItemList.BodyInfo>
      <ItemList.ContentsList>
        <InfiniteScroll
          pageStart={0}
          loadMore={props.onLoadMore}
          hasMore={true}
        >
          {props.data?.fetchUseditems.map((el) => (
            <ItemList.ItemListBox
              key={el._id}
              id={el._id}
              onClick={props.onClickMoveToUsedItemDetail(el)}
            >
              <ItemList.ItemListCard variant="outlined">
                <ItemList.ImageBox
                  src={`https://storage.googleapis.com/${el.images[0]}`}
                  onError={(e) => {
                    e.currentTarget.src = "/images/logo-basic.svg"
                  }}
                />
                <CardContent style={{ width: "80%" }}>
                  <ItemList.TypographyName id={el._id} variant="h5">
                    {Number(NowDate().slice(0, 10).split(".").join("")) ===
                      Number(
                        getMyDate(el.createdAt).slice(0, 10).split(".").join("")
                      ) && (
                      <span style={{ fontSize: "20px", color: "#ff7e35" }}>
                        New<span> </span>
                      </span>
                    )}
                    상품명 :<span> </span>
                    {el.name}
                  </ItemList.TypographyName>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    작성일자 : {getMyDate(el.createdAt)}
                  </Typography>
                  <p style={{ color: "gray" }}>
                    거래위치 :
                    {el.useditemAddress?.address
                      ? el.useditemAddress?.address
                      : "위치 정보 없음"}
                  </p>
                  <ItemList.TypographyPrice variant="body2">
                    {el.price}원<br />
                  </ItemList.TypographyPrice>
                </CardContent>
                <CardContent style={{ width: "20%" }}>
                  <div> ❤️ {el.pickedCount}</div>
                </CardContent>
              </ItemList.ItemListCard>
            </ItemList.ItemListBox>
          ))}
        </InfiniteScroll>
      </ItemList.ContentsList>
    </ItemList.Wrapper>
  )
}
