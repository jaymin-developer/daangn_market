import { useMutation } from "@apollo/client"
import { ChangeEvent, useRef } from "react"
import { checkValidationImage } from "./Uploads01.validation"
// import Uploads01UI from "./Uploads01.presenter"
import { IUploads01Props } from "./Uploads01.types"
import { UPLOAD_FILE } from "./Uploads01.queries"
import { Modal } from "antd"
import { UploadButton, UploadFileHidden, UploadImage } from "./Uploads01.styles"
// import { IUploads01UIProps } from "./Uploads01.types"

export default function Uploads01(props: IUploads01Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploadFile] = useMutation(UPLOAD_FILE)

  const onClickUpload = () => {
    fileRef.current?.click()
  }

  const onChangeFile = (el) => async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0])
    if (!file) return

    try {
      const result = await uploadFile({ variables: { file } })
      props.onChangeFile(result.data.uploadFile.url, props.index)
    } catch (error) {
      Modal.error({ content: error.message })
    }
  }
  return (
    <>
      {props.files ? (
        <UploadImage
          onClick={onClickUpload}
          src={`https://storage.googleapis.com/${props.images}`}
        />
      ) : (
        <UploadButton onClick={onClickUpload} type="button">
          <>+</>
          <>Upload</>
        </UploadButton>
      )}
      <UploadFileHidden
        type="file"
        ref={fileRef}
        onChange={onChangeFile(props.el)}
      />
    </>
  )
}
