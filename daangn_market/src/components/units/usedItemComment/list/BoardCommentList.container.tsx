import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types"
import BoardCommentListUI from "./BoardCommentList.presenter"
import { FETCH_USED_ITEM_QUESTIONS } from "./BoardCommentList.queries"

export default function UsedItemCommentList() {
  const router = useRouter()
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.id) },
  })

  function onLoadMore() {
    if (!data) return

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestions)
          return { fetchUseditemQusetions: [...prev.fetchUseditemQuestions] }
        return {
          fetchUseditemQusetions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        }
      },
    })
  }

  return <BoardCommentListUI data={data} onLoadMore={onLoadMore} />
}
