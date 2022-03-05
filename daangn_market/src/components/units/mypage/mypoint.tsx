import styled from "@emotion/styled"
import { useState } from "react"
import AllHistory from "./mypoint.all"
import ChargeHistory from "./mypoint.charge"

const Wrapper = styled.div`
  margin-bottom: 50px;
`

const WrapperRightTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const WrapperRightBody = styled.div`
  width: 100%;
`

export default function MyPointPage() {
  const [allHistory, setAllHistory] = useState(true)
  const [chargeHistory, setChargeHistory] = useState(false)

  const onClickAll = () => {
    setAllHistory(true)
    setChargeHistory(false)
  }

  const onClickCharge = () => {
    setAllHistory(false)
    setChargeHistory(true)
  }

  return (
    <Wrapper>
      <WrapperRightTop>
        <div style={{ display: "flex" }}>
          <span
            onClick={onClickAll}
            style={{
              cursor: "pointer",
              color: allHistory === true ? "darkred" : "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            전체 내역
          </span>
          |
          <span
            onClick={onClickCharge}
            style={{
              cursor: "pointer",
              color: chargeHistory === true ? "darkred" : "black",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            충전내역
          </span>
        </div>
      </WrapperRightTop>
      <WrapperRightBody>
        {allHistory && <AllHistory />}
        {chargeHistory && <ChargeHistory />}
      </WrapperRightBody>
    </Wrapper>
  )
}
