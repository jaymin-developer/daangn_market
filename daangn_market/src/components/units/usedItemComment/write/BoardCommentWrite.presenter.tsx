import styled from "@emotion/styled"

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

export default function UsedItemQuestionWriteUI(props) {
  function onClickCancel() {
    props.setIsEdit(false)
  }
  return (
    <>
      <Wrapper>
        <WrapperHead>
          {!props.isEdit ? <h2>📮 댓글</h2> : <h2>📝 댓글 수정</h2>}
          <WrapperHeadInput>
            {props.isEdit && <button onClick={onClickCancel}>취소하기</button>}
          </WrapperHeadInput>
        </WrapperHead>
        <WrapperBody>
          <BodyInput
            maxLength={100}
            defaultValue={props.el?.contents}
            onChange={props.onChangeContents}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <BodyBottom>
            <p>{props.contents.length}/100</p>
            <button
              onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </BodyBottom>
        </WrapperBody>
      </Wrapper>
    </>
  )
}
