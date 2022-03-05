import styled from "@emotion/styled"

const Wrapper = styled.footer`
  width: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #495057;
  color: white;
`

const FooterHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
`

const HeaderBox = styled.div`
  width: 18%;
  font-size: 14px;
  margin-bottom: 20px;
  & p {
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

const FooterBottom = styled.div`
  padding: 20px 0px;
  & p {
    color: #858e96;
  }
`

export default function LayoutFooter() {
  return (
    <Wrapper>
      <FooterHeader>
        <HeaderBox>
          <img src="/images/logo-basic.svg" />
        </HeaderBox>
        <HeaderBox>
          <p>믿을 수 있는 중고거래</p>
          <p>자주 묻는 질문</p>
        </HeaderBox>
        <HeaderBox>
          <p>광고주센터</p>
          <p>당근페이</p>
          <p>동네가게</p>
        </HeaderBox>
        <HeaderBox>
          <p>회사 소개</p>
          <p>채용</p>
        </HeaderBox>
        <HeaderBox>
          <p>이용 약관</p>
          <p>개인정보처리방침</p>
          <p>위치기반서비스 이용약관</p>
        </HeaderBox>
      </FooterHeader>
      <FooterBottom>
        <p>고객문의 cs@daangnservice.com</p>
        <p>제휴문의 contact@daangn.com</p>
        <p>지역광고 ad@daangn.com</p>
        <p>PR문의 pr@daangn.com</p>
        <p>
          서울특별시 구로구 디지털로30길 28, 609호 (당근서비스) 사업자 등록번호
          : 375-87-00088 직업정보제공사업 신고번호 : J1200020200016
        </p>
      </FooterBottom>
    </Wrapper>
  )
}
