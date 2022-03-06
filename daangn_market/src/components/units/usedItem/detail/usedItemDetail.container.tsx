import Head from "next/head"
import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import {
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  DELETE_USED_ITEM,
  FETCH_USED_ITEM,
  FETCH_USED_ITEMS_PICKED,
  FETCH_USER_LOGGED_IN,
  TOGGLE_USED_ITEM_PICK,
} from "./usedItemDetail.queries"
import UsedItemDetailUI from "./usedItemDetail.presenter"
import { useEffect, useState } from "react"

export default function UsedItemDetail() {
  const router = useRouter()
  const [pick, setPick] = useState(false)
  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN)

  const [deleteUseditem] = useMutation(DELETE_USED_ITEM)
  const [toggleUseditemPick] = useMutation(TOGGLE_USED_ITEM_PICK)
  const [createPointTransactionOfBuyingAndSelling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
    { variables: { useritemId: String(router.query.id) } }
  )

  const { data: itemData } = useQuery(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.id) },
  })

  const { data: pickData } = useQuery(FETCH_USED_ITEMS_PICKED, {
    variables: {
      search: "",
    },
  })

  useEffect(() => {
    if (
      pickData?.fetchUseditemsIPicked.filter(
        (el) => el._id === itemData?.fetchUseditem._id
      ).length
    ) {
      setPick(true)
    } else {
      setPick(false)
    }
  }, [pickData])

  const onClickDelete = async () => {
    try {
      await deleteUseditem({
        variables: { useditemId: String(router.query.id) },
      })
      alert("삭제가 완료되었습니다.")
      router.push("/usedItems")
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickToggleUsedItemPick = async () => {
    try {
      await toggleUseditemPick({
        variables: { useditemId: String(router.query.id) },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: String(router.query.id) },
          },
        ],
      })
      if (pick === false) {
        alert("상품을 찜했습니다!")
        setPick(true)
      }
      if (pick === true) {
        alert("찜을 취소했습니다!")
        setPick(false)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickPayment = async () => {
    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: { useritemId: String(router.query.id) },
      })
      alert("상품 구매 완료!")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <UsedItemDetailUI
        pick={pick}
        userData={userData}
        itemData={itemData}
        onClickDelete={onClickDelete}
        onClickPayment={onClickPayment}
        onClickToggleUsedItemPick={onClickToggleUsedItemPick}
      />
    </>
  )
}
