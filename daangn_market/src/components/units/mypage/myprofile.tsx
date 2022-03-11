import { useMutation, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { Modal } from "antd"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { getMyDate2 } from "../../../commons/libraries/utils"
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../commons/types/generated/types"
import {
  FETCH_USER_LOGGED_IN,
  RESET_USER_PASSWORD,
  UPDATE_USER,
  UPLOAD_FILE,
} from "./mypage.queries"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImageBox = styled.div``

export default function MyProfilePage() {
  const { data, refetch } = useQuery(FETCH_USER_LOGGED_IN)
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const [newName, setNewName] = useState("")
  const [image, setImage] = useState("")
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE)
  const [updateUser] = useMutation(UPDATE_USER)
  const [resetUserPassword] = useMutation(RESET_USER_PASSWORD)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    router.push("/mypage/?myProfile", undefined, { shallow: true })
  }, [])

  const onClickResetUserPassword = async () => {
    if (newPassword === checkPassword) {
      try {
        await resetUserPassword({
          variables: {
            password: newPassword,
          },
        })
        alert("비밀번호가 변경되었습니다.")
      } catch (error) {
        alert("잘못 작성하였습니다")
      }
    }
  }

  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value)
  }

  const onChangeCheckPassword = (event) => {
    setCheckPassword(event.target.value)
  }

  const onClickUpload = () => {
    fileRef.current?.click()
  }

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    try {
      const result = await uploadFile({ variables: { file } })

      setImage(result.data?.uploadFile.url || "")
    } catch (error) {
      alert(error.message)
    }
  }

  const onClickUpdateUser = async () => {
    await updateUser({
      variables: {
        updateUserInput: {
          name: String(newName),
          picture: image,
        },
      },
    })
    Modal.success({ content: "회원 정보가 업데이트 됐습니다." })
    refetch()
  }

  return (
    <Wrapper>
      <ProfileImageBox>
        <img
          src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`}
          onError={(e) => {
            e.currentTarget.src = "/images/Profile.png"
          }}
          width="100px"
          height="100px"
          style={{
            cursor: "pointer",
            marginRight: "20px",
            borderRadius: "50%",
          }}
          onClick={onClickUpload}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileRef}
          onChange={onChangeFile}
        />
      </ProfileImageBox>
      <input
        type="text"
        onChange={onChangeName}
        defaultValue={data?.fetchUserLoggedIn.name}
      />
      <div>이메일 : {data?.fetchUserLoggedIn.email}</div>
      <div>생성일자 : {getMyDate2(data?.fetchUserLoggedIn.createdAt)}</div>
      <div>업데이트일자 : {getMyDate2(data?.fetchUserLoggedIn.updatedAt)}</div>
      <button onClick={onClickUpdateUser}> 업데이트 </button>
      <div>
        현재 비밀번호 :
        <input type="password" />
      </div>
      <div>
        새 비밀번호 :
        <input type="password" onChange={onChangeNewPassword} />
      </div>
      <div>
        새 비밀번호 확인 :
        <input type="password" onChange={onChangeCheckPassword} />
      </div>
      <button onClick={onClickResetUserPassword}>변경하기</button>
    </Wrapper>
  )
}
