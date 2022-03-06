import UsedItemWriteUI from "./usedItemWrite.presenter"
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import {
  CREATE_USED_ITEM,
  UPDATE_USED_ITEM,
  UPLOAD_FILE,
} from "./usedItemWrite.queries"
import { useMutation } from "@apollo/client"
import { Modal } from "antd"

const schema = yup.object().shape({
  name: yup
    .string()
    .max(20, "최대 20자까지 작성 가능합니다.")
    .required("상품명은 필수 입력 사항입니다."),
  price: yup.string().required("판매 가격은 필수 입력 사항입니다."),
  remarks: yup
    .string()
    .min(10, "10자 이상 작성해주세요.")
    .max(100, "100자 까지 작성가능합니다.")
    .required("한줄평은 필수 입력 사항입니다."),
  contents: yup
    .string()
    .min(10, "설명란에 10자 이상 작성해주세요.")
    .required("설명란은 필수 입력 사항입니다."),
})

interface FormValues {
  name?: string
  remarks?: string
  contents?: string
  price?: number
}

export default function UsedItemWrite(props) {
  const router = useRouter()
  const [uploadFile] = useMutation(UPLOAD_FILE)
  const [createUseditem] = useMutation(CREATE_USED_ITEM)
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM)
  const [images, setImages] = useState([])
  const [address, setAddress] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tag, setTag] = useState("")

  const { register, handleSubmit, formState, setValue, trigger, getValues } =
    useForm({
      mode: "onChange",
      resolver: yupResolver(schema),
      // 리액트 훅 폼과 연결한다.
    })

  useEffect(() => {
    setValue("name", props.data?.fetchUseditem.name)
    setValue("remarks", props.data?.fetchUseditem.remarks)
    setValue("contents", props.data?.fetchUseditem.contents)
    setValue("price", props.data?.fetchUseditem.price)
    setValue("images", props.data?.fetchUseditem.images)
  }, [props.data])
  console.log(props.data)
  useEffect(() => {
    if (props.data?.fetchUseditem.tags?.length) {
      setTags([...props.data?.fetchUseditem.tags])
      console.log(tags)
    }
  }, [props.data])

  // 이미지 수정
  useEffect(() => {
    if (props.data?.fetchUseditem.images?.length) {
      setImages([...props.data?.fetchUseditem.images])
      console.log(images)
    }
  }, [props.data])

  const handleChange = (value: string) => {
    setValue("contents", value === "<p><br></p>" ? "" : value)
    trigger("contents")
  }

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    try {
      const result = await uploadFile({
        variables: { file },
      })
      const imageUrl = result.data?.uploadFile.url
      setImages((prev) => [...prev, imageUrl])
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    }
  }
  const onChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value)
  }

  const onKeyUpTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      tag.includes("#") &&
      tags.includes(tag) === false &&
      tags.length < 5
    ) {
      setTags((prev) => [...prev, tag])
      setTag("")
    }
  }

  const onClickDeleteTag = (tagname: string) => () => {
    setTags((prev) => prev.filter((el) => el !== tagname))
  }

  const onClickSubmit = async (data: FormValues) => {
    if (!(data.name && data.remarks && data.price && data.contents)) {
      Modal.warn({ content: "필수 입력 사항입니다!" })
      return
    }

    const writeVariables = {
      createUseditemInput: {
        name: data.name,
        remarks: data.remarks,
        contents: data.contents,
        price: Number(data.price),
        images: images,
        tags: tags,
        useditemAddress: {
          address,
        },
      },
    }

    try {
      const result = await createUseditem({
        variables: writeVariables,
      })
      alert("제품 등록 성공!")
      router.push(`/useditems/${result.data.createUseditem._id}`)
    } catch (error) {
      if (error instanceof Error) alert(error.message)
    }
  }

  function onClickMovetoUseditem() {
    router.push(`/useditems/`)
  }

  const onClickUpdate = async (data: FormValues) => {
    try {
      await updateUseditem({
        variables: {
          useditemId: router.query.id,
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(data.price),
            images: images,
            tags: tags,
          },
        },
      })
      Modal.success({ content: "수정이 완료되었습니다." })
      router.push(`/useditems/${router.query.id}`)
    } catch (error) {
      Modal.error({ content: error.message })
    }
  }

  return (
    <UsedItemWriteUI
      isEdit={props.isEdit}
      data={props.data}
      images={images}
      tag={tag}
      tags={tags}
      contents={getValues("contents")}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      handleChange={handleChange}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeFile={onChangeFile}
      onClickMovetoUseditem={onClickMovetoUseditem}
      onChangeTag={onChangeTag}
      onKeyUpTags={onKeyUpTags}
      onClickDeleteTag={onClickDeleteTag}
      setAddress={setAddress}
    />
  )
}
