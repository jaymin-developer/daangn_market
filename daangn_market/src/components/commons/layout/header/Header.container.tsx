import { useMutation, gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../../../pages/_app"
import { IQuery } from "../../../../commons/types/generated/types"
import LayoutHeaderUI from "./Header.presenter"

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
    }
  }
`

export const LOGOUT_USER = gql`
  mutation logoutUser {
    logoutUser
  }
`

export default function LayoutHeader() {
  const { accessToken, setUserInfo, setSearch } = useContext(GlobalContext)
  const router = useRouter()
  const [keyword, setKeyword] = useState("")
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)
  const [logoutUser] = useMutation(LOGOUT_USER)

  function onChangeKeyword(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value)
  }

  function onClickSearch() {
    setSearch(keyword)
    router.push("/useditems")
  }

  function onClickLogin() {
    router.push("/login")
  }

  function onClickSignup() {
    router.push("/signup")
  }

  function onClickGoHome() {
    router.push("/")
  }

  function onClickGoMyPage() {
    router.push("/mypage")
  }

  function onClickLogOut() {
    logoutUser()
    alert("로그아웃이 됐습니다.")
    window.location.reload()
  }

  useEffect(() => {
    if (data) {
      localStorage.setItem("UserInfo", JSON.stringify(data.fetchUserLoggedIn))
    }
    if (localStorage.getItem("UserInfo")) {
      setUserInfo(localStorage.getItem("UserInfo") || {})
    }
  }, [])

  return (
    <LayoutHeaderUI
      data={data}
      accessToken={accessToken}
      onChangeKeyword={onChangeKeyword}
      onClickSearch={onClickSearch}
      onClickLogOut={onClickLogOut}
      onClickLogin={onClickLogin}
      onClickSignup={onClickSignup}
      onClickGoHome={onClickGoHome}
      onClickGoMyPage={onClickGoMyPage}
    />
  )
}
