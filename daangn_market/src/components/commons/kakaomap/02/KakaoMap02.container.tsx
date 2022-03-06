import * as Map from "./KakaoMap02.styled";
import { useEffect } from "react";

declare const window: typeof globalThis & {
  kakao: any;
};
export default function KakaoMap02(props) {
  const zipcode = props.zipcode;
  const address = props.address;
  const addressDetail = props.addressDetail;
  useEffect(() => {
    // 여기서 직접 다운로드 받고, 다 받을때까지 기다렸다가 그려주기!!
    const script = document.createElement("script"); // html에 script라는 태그(Element)를 만든다.
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=86840c4da9a9777828c0a573cd3619cf&autoload=false&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        // script가 다 로드되면 하단의 내용을 실행한다.
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(
          // "서울 구로구 경서로 6",
          address,
          function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시합니다
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              const infowindow = new window.kakao.maps.InfoWindow({
                content: address,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );

        // // 마커가 표시될 위치입니다
        // const markerPosition = new window.kakao.maps.LatLng(
        //   33.450701,
        //   126.570667
        // );

        // // 마커를 생성합니다
        // const marker = new window.kakao.maps.Marker({
        //   position: markerPosition,
        // });

        // // 마커가 지도 위에 표시되도록 설정합니다
        // marker.setMap(map);

        // // 지도에 클릭 이벤트를 등록합니다
        // // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
        // window.kakao.maps.event.addListener(
        //   map,
        //   "click",
        //   function (mouseEvent) {
        //     // 클릭한 위도, 경도 정보를 가져옵니다
        //     const latlng = mouseEvent.latLng;

        //     // 마커 위치를 클릭한 위치로 옮깁니다
        //     marker.setPosition(latlng);
        //     console.log(latlng);
        //   }
        // );
      });
    };
  }, [address]);
  return (
    <Map.LocationBox>
      <Map.InnerWrap>
        <Map.MapBox id="map"></Map.MapBox>
        <Map.AddressBox>
          {zipcode && (
            <p className="zipcode">
              <span className="zip">우</span>
              {zipcode}
            </p>
          )}

          <p className="address">{address}</p>
          <p className="addressDetail">{addressDetail}</p>
        </Map.AddressBox>
      </Map.InnerWrap>
    </Map.LocationBox>
  );
}
