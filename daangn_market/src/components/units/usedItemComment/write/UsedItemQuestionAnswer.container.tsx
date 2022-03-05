import { useQuery } from "@apollo/client"
import { FETCH_USED_ITEM_QUESTIONS_ANSWERS } from "../list/BoardCommentList.queries"
import UsedItemQuestionAnswerUI from "./UsedItemQuestionAnswer.presenter"
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../commons/types/generated/types"
import UsedItemQuestionAnswerListItem from "../list/UsdeItemQuestionAnswerListItem.container"
import { ChangeEvent, useState } from "react"

export default function UsedItemQuestionAnswer(props) {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTIONS_ANSWERS, {
    variables: { useditemQuestionId: String(props.el?._id) },
  })
  const [contents, setContents] = useState("")

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  function onLoadMore() {
    if (!data) return

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestionAnswers.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestionAnswers)
          return {
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
          }
        return {
          fetchUseditemQuestionAnswers: [
            ...prev.fetchUseditemQuestionAnswers,
            ...fetchMoreResult.fetchUseditemQuestionAnswers,
          ],
        }
      },
    })
  }

  return (
    <>
      {data?.fetchUseditemQuestionAnswers && (
        <UsedItemQuestionAnswerListItem
          el={props.el}
          data={data}
          onLoadMore={onLoadMore}
        />
      )}
      <UsedItemQuestionAnswerUI
        contents={contents}
        onChangeContents={onChangeContents}
        // onClickUpdate={onClickUpdate}
        isEdit={props.isEdit}
        setIsEdit={props.setIsEdit}
        data={props.data}
        el={props.el}
        setIsAnswer={props.setIsAnswer}
      />
    </>
  )
}
