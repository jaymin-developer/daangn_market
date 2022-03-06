import * as S from "./usedItemDetail.styles"
import { getMyDate } from "../../../../commons/libraries/utils"
import BasicMenu from "../../../commons/basicMenu/index"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Dompurify from "dompurify"
import { FcLikePlaceholder, FcLike } from "react-icons/fc"
import { useEffect } from "react"
import ItemLists from "../../../commons/itemlist/itemlist"

declare const window: typeof globalThis & {
  kakao: any
}

export default function UsedItemDetailUI(props) {
  const location = "useditems"

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  useEffect(() => {
    // 여기서 직접 다운로드 받고, 다 받을때까지 기다렸다가 그려주기!!
    const script = document.createElement("script") // <script></script> 태그를 만들어줌
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_API}&libraries=services&autoload=false`
    document.head.appendChild(script) // html 문서에 head부분에 자식태그로 script를 넣어줘

    script.onload = () => {
      window.kakao.maps.load(function () {
        const mapContainer = document.getElementById("map") // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            props.itemData.fetchUseditem?.useditemAddress?.lat,
            props.itemData?.fetchUseditem?.useditemAddress?.lng
          ), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption) // 지도를 생성합니다

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          props.itemData?.fetchUseditem?.useditemAddress?.lat,
          props.itemData?.fetchUseditem?.useditemAddress?.lng
        )

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map)
      })
    }
  })

  return (
    <S.Wrapper>
      <S.DetailWrapper>
        <Slider {...settings}>
          {props.itemData?.fetchUseditem?.images.map(
            (_, index) =>
              props.itemData?.fetchUseditem?.images[index] && (
                <S.SliderBox key={index}>
                  <S.Image
                    src={`https://storage.googleapis.com/${props.itemData?.fetchUseditem?.images?.[index]}`}
                  />
                </S.SliderBox>
              )
          )}
        </Slider>
        <S.WriterBox>
          <S.ProfilePhoto src="/images/Profile.png" />
          <S.WriterCreatedAt>
            <S.Writer>{props.itemData?.fetchUseditem?.seller.name}</S.Writer>
            <S.Location>
              {props.itemData?.fetchUseditem.useditemAddress?.address
                ? props.itemData?.fetchUseditem.useditemAddress?.address
                : "위치 정보 없음"}
            </S.Location>
          </S.WriterCreatedAt>
          {props.userData?.fetchUserLoggedIn?._id ===
          props.itemData?.fetchUseditem?.seller?._id ? (
            <BasicMenu
              location={location}
              onClickDelete={props.onClickDelete}
            />
          ) : (
            <div style={{ width: "10%" }}></div>
          )}
        </S.WriterBox>
        <div style={{ display: "flex" }}>
          {props.itemData?.fetchUseditem?.tags?.map((el, index) => (
            <S.Tags key={index}>{el}</S.Tags>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          <S.Info>
            <S.CreatedAt>
              {getMyDate(props.itemData?.fetchUseditem?.createdAt)}
            </S.CreatedAt>
            <S.Name>상품명 : {props.itemData?.fetchUseditem?.name}</S.Name>
            <S.Remark>
              한줄평 : {props.itemData?.fetchUseditem?.remarks}
            </S.Remark>
            <S.Price>{props.itemData?.fetchUseditem?.price} 원</S.Price>
          </S.Info>
          {props.pick === false ? (
            <div style={{ alignItems: "center", fontSize: "16px" }}>
              <FcLikePlaceholder
                style={{ cursor: "pointer", marginRight: "5px" }}
                onClick={props.onClickToggleUsedItemPick}
              />
              <span> {props.itemData?.fetchUseditem?.pickedCount}명 </span>
            </div>
          ) : (
            <div style={{ alignItems: "center", fontSize: "16px" }}>
              <FcLike
                style={{ cursor: "pointer", marginRight: "5px" }}
                onClick={props.onClickToggleUsedItemPick}
              />
              {props.itemData?.fetchUseditem?.pickedCount}명
            </div>
          )}
        </div>

        {process.browser && (
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(
                String(props.itemData?.fetchUseditem.contents)
              ),
            }}
          ></S.Contents>
        )}
        {props.itemData?.fetchUseditem?.useditemAddress?.lat && (
          <div id="map" style={{ width: "100%", height: "350px" }}></div>
        )}
        <div></div>
      </S.DetailWrapper>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        {props.itemData?.fetchUseditem?.soldAt ? (
          <S.BuyButton disabled>
            {getMyDate(props.itemData?.fetchUseditem?.soldAt)} <br /> 판매완료!
          </S.BuyButton>
        ) : (
          <S.BuyButton onClick={props.onClickPayment}>
            {props.itemData?.fetchUseditem?.price} 원 <br /> 구매하기
          </S.BuyButton>
        )}
      </div>
      <ItemLists />
    </S.Wrapper>
  )
}
