import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useState, MouseEvent, useContext, useEffect } from "react"
import { GlobalContext } from "../../../../../pages/_app"
import { TodayDate } from "../../../../commons/libraries/utils"
import UsedItemListUI from "./usedItemList.presenter"
import { FETCH_USED_ITEMS } from "./usedItemList.queries"

export default function UsedItemList() {
  const { search } = useContext(GlobalContext)
  const router = useRouter()
  const [region, setRegion] = useState("")
  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEMS, {
    variables: { page: 1, search: search || "" },
  })

  const onLoadMore = () => {
    if (!data) return

    fetchMore({
      variables: { page: Math.ceil(data.fetchUseditems.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchUseditems)
          return { fetchUseditems: [...prev.fetchUseditems] }

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        }
      },
    })
  }

  useEffect(() => {
    refetch({ search: search, page: 1 })
  }, [])

  const onChangeRegion = (event) => {
    setRegion(event.target.value)
  }

  const onClickMoveToUsedItemDetail = (el: any) => (event: MouseEvent) => {
    const basket = JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]")

    if (JSON.stringify(localStorage).includes(el._id) === false) {
      basket.push(el)
    }
    localStorage.setItem(`${TodayDate()}`, JSON.stringify(basket))
    router.push(`/useditems/${event.currentTarget.id}`)
  }

  function onClickMoveToUsedItemNew() {
    router.push("/useditems/new")
  }

  return (
    <UsedItemListUI
      region={region}
      data={data}
      onLoadMore={onLoadMore}
      onChangeRegion={onChangeRegion}
      onClickMoveToUsedItemDetail={onClickMoveToUsedItemDetail}
      onClickMoveToUsedItemNew={onClickMoveToUsedItemNew}
    />
  )
}
