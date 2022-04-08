import styled from "@emotion/styled"

export const Wrapper = styled.div`
  width: 100%;
  padding: 10px 0;
`

export const WrapperHead = styled.div`
  width: 100%;
  padding: 0px 0px 20px;
`
export const WrapperHeadInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const WrapperBody = styled.div`
  display: flex;
  flex-direction: column;
`

export const BodyInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 20px;
  border: 1px solid #bdbdbd;
  resize: none;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
`

export const BodyBottom = styled.div`
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
