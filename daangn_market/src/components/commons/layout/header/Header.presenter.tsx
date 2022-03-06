import * as HStyle from "./Header.styles"
import { IHeaderProps } from "./Header.types"

export default function LayoutHeaderUI(props: IHeaderProps) {
  return (
    <HStyle.Wrapper>
      <HStyle.HeaderBox>
        <HStyle.HeaderLeft>
          <HStyle.Logo
            src="/images/logo-basic.svg"
            onClick={props.onClickGoHome}
          />
          <HStyle.SearchBarBox>
            <HStyle.SearchBar
              type="search"
              placeholder="물품명을 검색해보세요!"
              onChange={props.onChangeKeyword}
            />
            <img src="/images/search-icon.svg" onClick={props.onClickSearch} />
          </HStyle.SearchBarBox>
        </HStyle.HeaderLeft>
        <HStyle.HeaderCenter>
          {props.data?.fetchUserLoggedIn &&
            `${props.data?.fetchUserLoggedIn.name}님 환영합니다`}
        </HStyle.HeaderCenter>
        <HStyle.HeaderRight>
          {props.accessToken ? (
            <HStyle.ButtonBox>
              <HStyle.LoginButton onClick={props.onClickGoMyPage}>
                마이페이지
              </HStyle.LoginButton>
              <HStyle.SignUpButton onClick={props.onClickLogOut}>
                로그아웃
              </HStyle.SignUpButton>
            </HStyle.ButtonBox>
          ) : (
            <HStyle.ButtonBox>
              <HStyle.LoginButton onClick={props.onClickLogin}>
                로그인
              </HStyle.LoginButton>
              <HStyle.SignUpButton onClick={props.onClickSignup}>
                회원가입
              </HStyle.SignUpButton>
            </HStyle.ButtonBox>
          )}
        </HStyle.HeaderRight>
      </HStyle.HeaderBox>
    </HStyle.Wrapper>
  )
}
