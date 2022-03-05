import LoginPageUI from "./login.presenter"
import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { gql, useMutation } from "@apollo/client"
import { Modal } from "antd"
import { GlobalContext } from "../../../../pages/_app"

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`

export default function LoginPage() {
  const router = useRouter()
  const { accessToken } = useContext(GlobalContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginUser] = useMutation(LOGIN_USER)

  const onChangeEmail = (event: { target: { value } }) => {
    setEmail(event.target.value)
    if (/^\w+@\w+\.\w+$/.test(event.target.value)) {
      setEmailError("")
    }
  }

  const onChangePassword = (event: { target: { value } }) => {
    setPassword(event.target.value)
    if (
      /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
        event.target.value
      )
    ) {
      setPasswordError("")
    }
  }

  const onClickLogin = async () => {
    try {
      await loginUser({
        variables: {
          email,
          password,
        },
      })
      if (/^\w+@\w+\.\w+$/.test(email) === false) {
        setEmailError("올바른 이메일 형식이 아닙니다.")
      }

      if (
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          password
        ) === false
      ) {
        setPasswordError(
          "8~16자의 영문,숫자,특수 문자의 조합하여 작성해주세요."
        )
      }
      if (
        /^\w+@\w+\.\w+$/.test(email) &&
        /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          password
        )
      ) {
        router.reload()
      }
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: error.message })
        router.push("/login")
      }
    }
  }

  if (accessToken) {
    router.push("/useditems")
  }

  const onClickSignUp = () => {
    router.push(`/signup`)
  }

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      onClickLogin()
    }
  }

  return (
    <LoginPageUI
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onClickLogin={onClickLogin}
      onClickSignUp={onClickSignUp}
      onCheckEnter={onCheckEnter}
    ></LoginPageUI>
  )
}
