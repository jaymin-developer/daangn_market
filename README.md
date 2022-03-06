# daangn_market

당근마켓 프론트엔드 지원자 : 김 재 민

본격적으로 개발 공부를 시작한 지 2개월, 본 프로젝트는 3일 동안 30시간이라는 시간을 투자하여 당근마켓 클론코딩을 진행했습니다. 짧은 시간이지만 그 누구보다도 성장 가능성이 높다는 것을 강조드리고 싶습니다. 본 프로젝트는 함수형 컴포넌트로 진행하며 부트캠프에서 제공되는 GraphQl를 활용한 데이터 요청, 가공하여 클라이언트에게 화면을 제공하는 것이 주 기능입니다.

페이지 설명

테스트 아이디 : asd@asd.com
테스트 비밀번호 : asd123!@#

1. http://localhost:3000/
   구현 리스트
   : 레이아웃 Head, Body, Footer로 나눠 랜딩페이지 제작.
   : Head 부분, useContext을 활용한 로그인 검증 및 결과(유저 정보) 표시
   : Body 부분, GraphQl을 활용한 데이터 요청, 가공된 콘텐츠 제공

2. http://localhost:3000/login & http://localhost:3000/signup
   구현 리스트
   : 정규표현식을 활용한 검증 기능 로그인, 회원가입 페이지 구현.
   : 로그인 이후 리프레시 토큰을 활용한 로그인 유지 기능 구현.

3. http://localhost:3000/useditems
   구현 리스트
   : 아이템 리스트 인피니트 스크롤로 구현
   : 아이템 리스트 클릭시 로컬스토리지, 브라우저 저장소를 활용한 저장.
   : 이후, 상품 상세페이지에서 오늘 본 상품 리스트 구현
   : select에서 지역 선택에 따른 결과값 표시 구현
   : Head 상품명 검색시 상품명 검색결과 구현

4. http://localhost:3000/useditems/62110bd78cd4860029b4baf4
   구현 리스트
   : 동적 라우팅 활용, 페이지 이동
   : 리액트 슬릭, 슬라이더를 활용한 이미지 리스트 구현
   : 브라우저 저장소를 활용한 오늘 본 상품 리스트 구현

5. http://localhost:3000/useditems/new
   구현 리스트
   : 권한분기(withAuth)를 활용한 accessToken 검증 및 접근 제한 기능 구현
   : 폼 라이브러리 useForm와 검증 라이브러리 yup을 활용.
   : Reactquill을 활용한 에디터폼 구현

   구현 예정 리스트
   : 다음 포스트코드 및 카카오맵 연동
   : FileReader를 활용한 이미지 업로드 성능 높이기

6. http://localhost:3000/useditems/62110bd78cd4860029b4baf4/edit
   구현 리스트
   : props를 활용한 데이터 전달

   구현 예정 리스트
   : 다음 포스트코드 및 카카오맵 연동
   : 등록된 이미지 삭제

7. http://localhost:3000/mypage
   구현 리스트
   : 포인트 충전 - 아임포트 연결, 결제 기능 구현

   구현 예정 리스트
   : 프로필 수정 페이지 구축(프로필 이미지 설정, 비밀번호 변경 등)
   : 포인트 내역 페이지네이션으로 구현