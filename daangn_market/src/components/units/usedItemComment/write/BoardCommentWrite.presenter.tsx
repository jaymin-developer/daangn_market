import * as S from "./BoardCommentWrite.styles"

export default function UsedItemQuestionWriteUI(props) {
  function onClickCancel() {
    props.setIsEdit(false)
  }
  return (
    <>
      <S.Wrapper>
        <S.WrapperHead>
          {!props.isEdit ? <h2>📮 댓글</h2> : <h2>📝 댓글 수정</h2>}
          <S.WrapperHeadInput>
            {props.isEdit && <button onClick={onClickCancel}>취소하기</button>}
          </S.WrapperHeadInput>
        </S.WrapperHead>
        <S.WrapperBody>
          <S.BodyInput
            maxLength={100}
            defaultValue={props.el?.contents}
            onChange={props.onChangeContents}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <S.BodyBottom>
            <p>{props.contents.length}/100</p>
            <button
              onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}
            >
              {props.isEdit ? "수정하기" : "등록하기"}
            </button>
          </S.BodyBottom>
        </S.WrapperBody>
      </S.Wrapper>
    </>
  )
}
