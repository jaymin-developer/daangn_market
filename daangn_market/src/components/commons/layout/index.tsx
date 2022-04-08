import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { ReactChild } from "react"
import LayoutFooter from "./footer"
import LayoutHeader from "./header/Header.container"
// import LayoutNavigation from "./navigation"
// import LayoutSidebar from "./sidebar"
// import LayoutSidebar2 from "./sidebar2"

interface IProps {
  children: ReactChild
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const BodyWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`

export default function Layout(props: IProps) {
  const router = useRouter()
  const HIDDEN = ["/useditems"]
  const isHidden = HIDDEN.includes(router.asPath)

  return (
    <Wrapper>
      <LayoutHeader />
      <BodyWrapper>{props.children}</BodyWrapper>
      {isHidden || <LayoutFooter />}
    </Wrapper>
  )
}
