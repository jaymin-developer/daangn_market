import styled from "@emotion/styled"

export const Wrapper = styled.div`
  margin: 172px auto 100px;
  width: 540px;
  padding: 100px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ff8a3d;
  box-shadow: 7px 7px 39px rgba(139, 0, 0, 0.25);
  border-radius: 20px;
`

export const LoginHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Logo = styled.img``

export const LoginBody = styled.div`
  margin-top: 20px;
  width: 100%;
`
export const Email = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px solid;
  border-radius: 7px;
`

export const ErrorMessage = styled.div`
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: red;
`

export const Password = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 18px;
  border: 1px solid;
  border-radius: 7px;
`

export const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  background-color: #ff8a3d;
  color: white;
  font-size: 18px;
  border-radius: 7px;
  :hover {
    cursor: pointer;
  }
`

export const LoginFooter = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

export const FindEmail = styled.div``
export const FindPassword = styled.div``
export const SignUp = styled.div`
  :hover {
    cursor: pointer;
  }
`

export const SocialLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  border-radius: 38px;
  padding: 20px 0;
  background-color: #fae100;
  border: 2px solid none;
  margin-top: 10px;
  cursor: pointer;
`
export const SocialLoginButtonImg = styled.img`
  width: 32px;
  height: 30px;
  margin-right: 20px;
`
export const SocialLoginButtonTitle = styled.div`
  opacity: 1;
  font-size: 16px;
  font-weight: bold;
`
