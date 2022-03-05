import { gql, useQuery } from "@apollo/client"
import { getMyDate2 } from "../../../commons/libraries/utils"

import * as S from "./mypage.styles"

const FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($page: Int) {
    fetchPointTransactions(page: $page) {
      _id
      amount
      balance
      status
      statusDetail
      createdAt
    }
  }
`

export default function AllHistory() {
  const { data } = useQuery(FETCH_POINT_TRANSACTIONS)

  return (
    <>
      <S.Row>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>내용</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>거래 및 충전 내역</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>잔액</S.ColumnHeaderBasic>
      </S.Row>
      {data?.fetchPointTransactions.map((el) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{getMyDate2(el.createdAt)}</S.ColumnBasic>
          <S.ColumnTitle
            style={{
              color:
                el.status === "판매"
                  ? "blue"
                  : el.status === "구매"
                  ? "red"
                  : "black",
            }}
          >
            {el.status}
          </S.ColumnTitle>
          <S.ColumnBasic
            style={{
              color: el.amount >= 0 ? "blue" : "red",
            }}
          >
            {el.amount}
          </S.ColumnBasic>
          <S.ColumnBasic>{el.balance}원</S.ColumnBasic>
        </S.Row>
      ))}
    </>
  )
}
