import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../src/commons/types/generated/types"
import UsedItemWrite from "../../../../src/components/units/usedItem/write/usedItemWrite.container"

const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      name
      remarks
      contents
      price
      images
    }
  }
`

export default function UsedItemEditPage() {
  const router = useRouter()

  const { data } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, { variables: { useditemId: String(router.query.id) } })

  return <UsedItemWrite isEdit={true} data={data} />
}
