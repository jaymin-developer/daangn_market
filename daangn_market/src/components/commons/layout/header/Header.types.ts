import { ChangeEvent } from "react"

export interface IHeaderProps {
  data: any
  accessToken: string
  onClickLogOut: () => void
  onClickLogin: () => void
  onClickSignup: () => void
  onClickGoHome: () => void
  onClickGoMyPage: () => void
  onClickSearch: () => void
  onChangeKeyword: (event: ChangeEvent<HTMLInputElement>) => void
}
