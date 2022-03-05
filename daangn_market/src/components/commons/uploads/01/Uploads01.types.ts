import { ChangeEvent, RefObject } from "react"

export interface IUploads01Props {
  index: number
  images: any
  files: any
  defaultFileUrl?: string
  onChangeFile: (fileUrl: string, index: number) => void
}

export interface IUploads01UIProps {
  fileRef: RefObject<HTMLInputElement>
  // fileUrl: string
  files: any
  defaultFileUrl?: string
  onClickUpload: () => void
  onChangeFile: (event: ChangeEvent<HTMLInputElement>) => void
}
