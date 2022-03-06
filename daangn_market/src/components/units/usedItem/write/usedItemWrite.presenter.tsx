import * as S from "./usedItemWrite.styles"
import Input01 from "../../../commons/inputs/01/inputs01"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import Input02 from "../../../commons/inputs/02/inputs02"
import UploadButtons from "../../../commons/imageUpload"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export default function UsedItemWriteUI(props) {
  return (
    <S.Wrapper>
      <S.Form
        onSubmit={
          props.isEdit
            ? props.handleSubmit(props.onClickUpdate)
            : props.handleSubmit(props.onClickSubmit)
        }
      >
        <S.WrapperHead>
          <S.CancelButton type="button" onClick={props.onClickMovetoUseditem}>
            취소
          </S.CancelButton>
          <S.WrapperTitle>
            {props.isEdit ? "상품 수정" : "상품 등록"}
          </S.WrapperTitle>
          <S.SubmitButton isEdit={props.isEdit} isActive={props.isActive}>
            {props.isEdit ? "수정" : "등록"}
          </S.SubmitButton>
        </S.WrapperHead>
        <S.WrapperBody>
          <S.ImageUpload>
            <UploadButtons
              onChangeFile={props.onChangeFile}
              images={props.images}
            />
          </S.ImageUpload>
          <S.WrapperBodyHead>
            <S.ItemName>
              <Input01
                type="text"
                placeholder="상품명을 입력해주세요"
                register={props.register("name")}
                defaultValue={props.data?.fetchUseditem.name}
              ></Input01>
              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.name?.message}
              </div>
            </S.ItemName>
            <S.ItemPrice>
              <Input01
                type="number"
                placeholder="판매 가격을 입력해주세요."
                register={props.register("price")}
                defaultValue={props.data?.fetchUseditem.price}
              ></Input01>
              <div style={{ color: "red", fontSize: "14px" }}>
                {props.formState.errors.price?.message}
              </div>
            </S.ItemPrice>
          </S.WrapperBodyHead>
          <S.WrapperBodyBody>
            <Input01
              type="text"
              placeholder="한 줄 상품평을 입력해주세요"
              register={props.register("remarks")}
              defaultValue={props.data?.fetchUseditem.remarks}
            />
            <div style={{ color: "red" }}>
              {props.formState.errors.remarks?.message}
            </div>
            <S.Contents>
              <ReactQuill
                placeholder="상품를 소개해주세요"
                onChange={props.handleChange}
                style={{ height: "300px" }}
                defaultValue={
                  props.contents || props.data?.fetchUseditem.contents || ""
                }
              />
            </S.Contents>
            <div style={{ color: "red", fontSize: "14px" }}>
              {props.formState.errors.contents?.message}
            </div>
            <div style={{ display: "flex" }}>
              {props.tags.map((el, index) => (
                <div
                  key={index}
                  style={{
                    color: "white",
                    backgroundColor: "darkred",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px 5px",
                  }}
                >
                  {el}
                  <button
                    type="button"
                    onClick={props.onClickDeleteTag(el)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </S.WrapperBodyBody>
        </S.WrapperBody>
      </S.Form>

      <S.WrapperFoot>
        <Input02
          type="text"
          placeholder="태그를 입력하고 엔터를 눌러주세요.(예시 : #태그)"
          onChangeTag={props.onChangeTag}
          onKeyUpTags={props.onKeyUpTags}
          defaultValue={props.data?.fetchUseditem.tag}
        />
      </S.WrapperFoot>
    </S.Wrapper>
  )
}
