import {
  ChangeEventHandler,
  ReactChild,
  ReactFragment,
  ReactPortal,
  MouseEventHandler,
  KeyboardEventHandler,
} from "react"
import * as S from "./login.styles"

interface IProps {
  onChangeEmail: ChangeEventHandler<HTMLInputElement>
  email: string | number | readonly string[]
  emailError: boolean | ReactChild | ReactFragment | ReactPortal
  onChangePassword: ChangeEventHandler<HTMLInputElement>
  password: string | number | readonly string[]
  passwordError: boolean | ReactChild | ReactFragment | ReactPortal
  onClickLogin: MouseEventHandler<HTMLButtonElement>
  onClickSignUp: MouseEventHandler<HTMLDivElement>
  onCheckEnter: KeyboardEventHandler<HTMLDivElement>
}

export default function LoginPageUI(props: IProps) {
  return (
    <>
      <S.Wrapper>
        <S.LoginHeader>
          <S.Logo src="/images/logo-basic.svg" />
        </S.LoginHeader>
        <S.LoginBody onKeyPress={props.onCheckEnter}>
          <S.Email
            type="email"
            placeholder="아이디"
            onChange={props.onChangeEmail}
            value={props.email}
            required
          ></S.Email>
          <S.ErrorMessage>{props.emailError}</S.ErrorMessage>
          <S.Password
            type="password"
            placeholder="패스워드"
            onChange={props.onChangePassword}
            value={props.password}
            required
          ></S.Password>
          <S.ErrorMessage>{props.passwordError}</S.ErrorMessage>
          <S.LoginButton onClick={props.onClickLogin}>로그인</S.LoginButton>
        </S.LoginBody>
        <S.LoginFooter>
          <S.FindEmail>아이디 찾기</S.FindEmail>
          <S.FindPassword>비밀번호 찾기</S.FindPassword>
          <S.SignUp onClick={props.onClickSignUp}>회원가입</S.SignUp>
        </S.LoginFooter>
        <S.SocialLoginButton>
          <S.SocialLoginButtonImg src="/images/kakao.png"></S.SocialLoginButtonImg>
          <S.SocialLoginButtonTitle>
            카카오톡으로 로그인
          </S.SocialLoginButtonTitle>
        </S.SocialLoginButton>
      </S.Wrapper>
    </>
  )
}
