import styled from "@emotion/styled"
import { getMyDate } from "../../../../commons/libraries/utils"
// import { Rating } from "@mui/material"
import { Modal } from "antd"
import { useState } from "react"
import {
  DELETE_USED_ITEM_QUESTION,
  FETCH_USED_ITEM_QUESTIONS,
} from "./BoardCommentList.queries"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
} from "../../../../commons/types/generated/types"
import BoardCommentWrite from "../write/BoardCommentWrite.container"
import UsedItemQuestionAnswer from "../write/UsedItemQuestionAnswer.container"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border: 1px solid #bdbdbd;
  border-radius: 20px;
  margin: 20px 0px;
`

const WrapperStart = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const ProfileImg = styled.img`
  width: 50%;
  border-radius: 50%;
`

const WrapperMiddle = styled.div`
  width: 75%;
`

const MiddleTop = styled.div`
  width: 100%;
  font-size: 16px;
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
`

const WrapperLast = styled.div`
  width: 10%;
  padding: 10px 0;
`

export default function BoardCommentListItemUI(props) {
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [isAnswer, setIsAnswer] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

  const handleModal = () => {
    setIsOpenDeleteModal((prev) => !prev)
  }

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION)

  function onClickOpenDeleteModal() {
    setIsOpenDeleteModal(true)
  }

  function onClickUpdate() {
    setIsEdit(true)
  }

  function onClickAnswer() {
    setIsAnswer(true)
  }

  async function onClickDelete() {
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.id },
          },
        ],
      })
      alert("삭제가 완료되었습니다.")
      setIsOpenDeleteModal(false)
    } catch (error) {
      Modal.error({ content: error.message })
    }
  }

  return (
    <>
      {isOpenDeleteModal && (
        <Modal visible={true} onOk={onClickDelete} onCancel={handleModal}>
          <div>댓글을 삭제하시겠습니까?</div>
        </Modal>
      )}
      {!isEdit && (
        <Wrapper>
          <WrapperStart>
            <ProfileImg src="https://us.123rf.com/450wm/3t0n4k/3t0n4k1902/3t0n4k190200018/125360306-%EC%B1%85-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B8%B0%ED%98%B8-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%95%99%EC%8A%B5-%EA%B5%90%EC%9C%A1-%EC%84%9C%EC%A0%90-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6" />
            {props.el?.user.name}
          </WrapperStart>
          <WrapperMiddle>
            <MiddleTop></MiddleTop>
            <p>{props.el?.contents}</p>
            <p style={{ color: "#bdbdbd" }}>{getMyDate(props.el?.createdAt)}</p>
          </WrapperMiddle>
          <WrapperLast>
            <button onClick={onClickUpdate}>수정</button>
            <button onClick={onClickOpenDeleteModal}>삭제</button>
            <button onClick={onClickAnswer}>대댓글</button>
          </WrapperLast>
        </Wrapper>
      )}
      {isEdit && (
        <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      )}
      {isAnswer && (
        <UsedItemQuestionAnswer
          isAnswer={true}
          setIsAnswer={setIsAnswer}
          el={props.el}
        />
      )}
    </>
  )
}
