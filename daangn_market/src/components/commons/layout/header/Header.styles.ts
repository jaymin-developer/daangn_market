import styled from "@emotion/styled"

export const Wrapper = styled.div`
  width: 100%;
  padding: 0px 10%;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`
export const HeaderBox = styled.div`
  width: 1024px;
  display: flex;
  padding: 16px 0px;
  justify-content: space-between;
`

export const HeaderLeft = styled.div`
  width: 550px;
  display: flex;
  justify-content: space-between;
`

export const Logo = styled.img`
  cursor: pointer;
`

export const SearchBarBox = styled.div`
  width: 350px;
  height: 40px;
  padding: 0px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: solid 1px #e9ecef;
  & img {
    :hover {
      cursor: pointer;
    }
  }
`

export const SearchBar = styled.input`
  width: 300px;
  height: 100%;
  border: none;
  ::placeholder {
    color: #e9ecef;
  }
`
export const HeaderCenter = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 40px;
`

export const HeaderRight = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
`

export const ButtonBox = styled.div`
  width: 500px;
  height: 40px;
  display: flex;
  justify-content: space-between;
`

export const LoginButton = styled.button`
  width: 120px;
  background-color: #ff7e35;
  color: white;
  border: none;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`

export const SignUpButton = styled.button`
  width: 120px;
  background-color: white;
  color: #ff7e35;
  border: 1px solid #ff7e35;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`
