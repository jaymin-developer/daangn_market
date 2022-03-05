import { useMutation, useQuery } from "@apollo/client"
import { Modal } from "antd"

import { useState } from "react"
import { IQuery } from "../../../commons/types/generated/types"
import { useRouter } from "next/router"

import {
  FETCH_USER_LOGGED_IN,
  CREATE_POINT_TRANSACTION_OF_LOADING,
} from "./mypage.queries"
import MyPageUI from "./mypage.presenter"

export default function MyPageList() {
  const router = useRouter()
  const [sellItems, setSellItems] = useState(true)
  const [buyItems, setBuyItems] = useState(false)
  const [pickUsedItem, setPickUsedItem] = useState(false)
  const [pickMyPoint, setPickMyPoint] = useState(false)
  const [pickMyProfile, setMyProfile] = useState(false)
  const [amount, setAmount] = useState(0)
  const [isModal, setIsModal] = useState(false)
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING,
    { variables: { impUid: "imp49910675" } }
  )

  const { data, refetch } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN)

  const onChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

  const onClickModal = () => {
    setIsModal((prev) => !prev)
  }

  const chargePoint = async (rsp) => {
    try {
      await createPointTransactionOfLoading({
        variables: {
          impUid: rsp.imp_uid,
        },
      })
      refetch()
      Modal.success({ content: `포인트 충전이 완료되었습니다.` })
    } catch (error) {
      Modal.error({ content: `${error.message}` })
    }
  }

  const onClickPayment = () => {
    const IMP = window.IMP
    IMP.init("imp49910675")
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        name: "포인트 충전",
        amount,
        buyer_email: data?.fetchUserLoggedIn?.email,
        buyer_name: data?.fetchUserLoggedIn?.name,
        // m_redirect_url: ,  << 모바일 웹에서 결제 후 돌아갈 주소
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          console.log(rsp)
          // 결제 성공 시 로직,
          // 포인트 충전시 이 곳에서 BE로 정보를 넘겨주는 로직을 작성해야함 ( imp_uid , paid_amount ) 즉, Mutation 실행 (createPointTransactionOfLoading)
          // console.log("ㅁㄴㅇ", rsp);
          chargePoint(rsp)
          onClickModal()
          // router.push("/mypage")
        } else {
          alert("결제에 실패했습니다.")
          // 결제 실패 시 로직,
        }
      }
    )
  }

  function onClickMoveToBoardDetail(event) {
    router.push(`/useditems/${event.target.id}`)
  }

  function onClickSellItem() {
    setSellItems(true)
    setBuyItems(false)
    setPickUsedItem(false)
    setPickMyPoint(false)
    setMyProfile(false)
  }

  function onClickBuyItem() {
    setSellItems(false)
    setBuyItems(true)
    setPickUsedItem(false)
    setPickMyPoint(false)
    setMyProfile(false)
  }

  function onClickPickUsedItem() {
    setSellItems(false)
    setBuyItems(false)
    setPickUsedItem(true)
    setPickMyPoint(false)
    setMyProfile(false)
  }

  function onClickPickMyPoint() {
    setSellItems(false)
    setBuyItems(false)
    setPickUsedItem(false)
    setPickMyPoint(true)
    setMyProfile(false)
  }

  function onClickMyProfile() {
    setSellItems(false)
    setBuyItems(false)
    setPickUsedItem(false)
    setPickMyPoint(false)
    setMyProfile(true)
  }

  return (
    <>
      <MyPageUI
        data={data}
        sellItems={sellItems}
        buyItems={buyItems}
        pickUsedItem={pickUsedItem}
        pickMyPoint={pickMyPoint}
        pickMyProfile={pickMyProfile}
        isModal={isModal}
        onClickModal={onClickModal}
        onChangeAmount={onChangeAmount}
        onClickPayment={onClickPayment}
        onClickMoveToBoardDetail={onClickMoveToBoardDetail}
        onClickSellItem={onClickSellItem}
        onClickBuyItem={onClickBuyItem}
        onClickPickUsedItem={onClickPickUsedItem}
        onClickPickMyPoint={onClickPickMyPoint}
        onClickMyProfile={onClickMyProfile}
      />
    </>
  )
}
