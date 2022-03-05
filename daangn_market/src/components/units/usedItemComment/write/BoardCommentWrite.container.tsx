import { useMutation } from "@apollo/client"
import { ChangeEvent, useState } from "react"
import BoardCommentWriteUI from "./BoardCommentWrite.presenter"
import {
  CREATE_USED_ITEM_QUESTION,
  UPDATE_USED_ITEM_QUESTION,
} from "./BoardCommentWrite.queries"
import { FETCH_USED_ITEM_QUESTIONS } from "../list/BoardCommentList.queries"
import { useRouter } from "next/router"

export default function UsedItemQuestionWrite(props) {
  const router = useRouter()
  const [contents, setContents] = useState("")

  const [createUseditemQuestion] = useMutation(CREATE_USED_ITEM_QUESTION)
  const [updateUseditemQuestion] = useMutation(UPDATE_USED_ITEM_QUESTION)

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  async function onClickWrite() {
    if (contents) {
      try {
        await createUseditemQuestion({
          variables: {
            createUseditemQuestionInput: {
              contents,
            },
            useditemId: String(router.query.id),
          },
          refetchQueries: [
            {
              query: FETCH_USED_ITEM_QUESTIONS,
              variables: { useditemId: String(router.query.id) },
            },
          ],
        })
        alert("성공")
      } catch (error) {
        alert(error.message)
      }
    } else {
      alert("누락된 내용이 있는지 확인해주세요.")
    }
  }

  async function onClickUpdate() {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.")
      return
    }

    try {
      // if (!props.el?._id) return;

      const updateUseditemQuestionInput = {}
      if (contents) updateUseditemQuestionInput.contents = contents

      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: {
            contents,
          },
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.id },
          },
        ],
      })
      props.setIsEdit(false)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <BoardCommentWriteUI
      contents={contents}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      setIsEdit={props.setIsEdit}
      el={props.el}
    />
  )
}
