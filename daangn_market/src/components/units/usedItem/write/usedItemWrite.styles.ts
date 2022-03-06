import styled from "@emotion/styled"
// import dynamic from "next/dynamic"

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export const Wrapper = styled.div`
  width: 1000px;
  box-sizing: border-box;
  margin: 100px auto 30px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d4d4d4;
`

export const Form = styled.form`
  width: 100%;
`

export const WrapperHead = styled.div`
  padding: 0 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d4d4d4;
  height: 66px;
  line-height: 66px;
`

export const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  color: gray;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`

export const WrapperTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`

export const SubmitButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: red;
  :hover {
    cursor: pointer;
  }
`

export const WrapperBody = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WrapperBodyHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ItemName = styled.div`
  font-size: 18px;
  width: 50%;
`

export const Input = styled.input`
  font-size: 18px;
  height: 20px;
  margin-left: 10px;
  padding-left: 5px;
  border: none;
  border-left: 1px solid;
`

export const ItemPrice = styled.div`
  font-size: 18px;
  width: 50%;
`

export const WrapperBodyBody = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const Contents = styled.div`
  margin-top: 20px;
  font-size: 18px;
  width: 100%;
  margin-bottom: 50px;
  /* height: 300px; */
  /* resize: none; */
  /* padding: 10px; */
  /* border: 1px solid #d4d4d4; */
  border: none;
`

export const Location = styled.div`
  width: 100%;
  height: 300px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #d4d4d4;
`

export const LocationLeft = styled.div`
  width: 50%;
`

export const LocationRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & div {
    margin-bottom: 10px;
  }
`

export const WrapperFoot = styled.div`
  width: 100%;
  padding: 0 20px 10px;
`

export const ImageUpload = styled.div`
  width: 100%;
  padding: 0px 0px 20px;
`
export const AddressBox = styled.div``
export const AddressInputBox = styled.div``
export const MapBox = styled.div``
export const AddressButton = styled.button``
