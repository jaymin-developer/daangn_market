import styled from "@emotion/styled"

export const Input = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 10px;
  /* border: none; */
  border: 1px solid #d4d4d4;
`

export default function Input02(props) {
  return (
    <Input
      placeholder={props.placeholder}
      type={props.type}
      {...props.register}
      defaultValue={props.defaultValue}
      readOnly={props.readonly}
      onChange={props.onChangeTag}
      onKeyUp={props.onKeyUpTags}
    />
  )
}
