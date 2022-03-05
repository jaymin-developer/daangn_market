import { useMutation } from "@apollo/client"
import styled from "@emotion/styled"
import { ChangeEvent, useState } from "react"
// import {
//   IQuery,
//   IQueryFetchUseditemQuestionAnswersArgs,
// } from "../../../../commons/types/generated/types"
import { FETCH_USED_ITEM_QUESTIONS_ANSWERS } from "../list/BoardCommentList.queries"
import {
  CREATE_USED_ITEM_QUESTION_ANSWER,
  UPDATE_USED_ITEM_QUESTION_ANSWER,
} from "./BoardCommentWrite.queries"

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0;
`

const WrapperHead = styled.div`
  width: 100%;
  padding: 0px 0px 20px;
`
const WrapperHeadInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const WrapperBody = styled.div`
  display: flex;
  flex-direction: column;
`

const BodyInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  border: 1px solid #bdbdbd;
  resize: none;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
`

const BodyBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  border: 1px solid #bdbdbd;
  border-radius: 0 0 10px 10px;

  & p {
    color: #bdbdbd;
    padding-left: 10px;
    line-height: 40px;
  }
  & button {
    background-color: darkred;
    color: white;
    border: none;
    border-radius: 0 0 10px 0;
    :hover {
      cursor: pointer;
    }
  }
`

export default function UsedItemQuestionAnswerUI(props) {
  const [contents, setContents] = useState("")
  const [createUsedItemQuestionAnswer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER
  )
  const [updateUseditemQuestionAnswer] = useMutation(
    UPDATE_USED_ITEM_QUESTION_ANSWER
  )

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }
  async function onClickWrite() {
    if (contents) {
      try {
        await createUsedItemQuestionAnswer({
          variables: {
            createUseditemQuestionAnswerInput: {
              contents,
            },
            useditemQuestionId: String(props.el._id),
          },
          refetchQueries: [
            {
              query: FETCH_USED_ITEM_QUESTIONS_ANSWERS,
              variables: {
                useditemQuestionId: String(props.el._id),
              },
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

      const updateUseditemQuestionAnswerInput = {}
      if (contents) updateUseditemQuestionAnswerInput.contents = contents

      await updateUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput: {
            contents,
          },
          useditemQuestionAnswerId: props.answerEl?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS_ANSWERS,
            variables: { useditemQuestionId: props.questionEl?._id },
          },
        ],
      })
      props.setIsEdit(false)
    } catch (error) {
      alert(error.message)
    }
  }

  function onClickCancel() {
    props.setIsEdit(false)
  }
  return (
    <>
      <Wrapper>
        <WrapperHead>
          {!props.isEdit ? <h2>📮 대댓글</h2> : <h2>📝 대댓글 수정</h2>}
          <WrapperHeadInput>
            {props.isEdit && <button onClick={onClickCancel}>취소하기</button>}
          </WrapperHeadInput>
        </WrapperHead>
        <WrapperBody>
          <BodyInput
            maxLength={100}
            defaultValue={props.contents}
            onChange={onChangeContents}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <BodyBottom>
            <p>{contents.length}/100</p>
            <button onClick={props.isEdit ? onClickUpdate : onClickWrite}>
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </BodyBottom>
        </WrapperBody>
      </Wrapper>
    </>
  )
}
