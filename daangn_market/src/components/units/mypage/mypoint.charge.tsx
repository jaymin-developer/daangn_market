import { gql, useQuery } from "@apollo/client"
import { getMyDate2 } from "../../../commons/libraries/utils"
import * as S from "./mypage.styles"

const FETCH_POINT_TRANSACTION_OF_LOADING = gql`
  query fetchPointTransactionsOfLoading {
    fetchPointTransactionsOfLoading {
      _id
      impUid
      amount
      balance
      createdAt
    }
  }
`

export default function ChargeHistory() {
  const { data } = useQuery(FETCH_POINT_TRANSACTION_OF_LOADING)

  return (
    <>
      <S.Row>
        <S.ColumnHeaderBasic>충전일</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>결제ID</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>충전 내역</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>충전 후 잔액</S.ColumnHeaderBasic>
      </S.Row>
      {data?.fetchPointTransactionsOfLoading.map((el) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>{getMyDate2(el.createdAt)}</S.ColumnBasic>
          <S.ColumnTitle>{el.impUid}</S.ColumnTitle>
          <S.ColumnBasic style={{ color: "red" }}>{el.amount}</S.ColumnBasic>
          <S.ColumnBasic>{el.balance}원</S.ColumnBasic>
        </S.Row>
      ))}
    </>
  )
}
