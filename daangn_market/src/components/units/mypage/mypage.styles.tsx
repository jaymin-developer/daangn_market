import styled from "@emotion/styled"
import { Box, Card, Typography } from "@mui/material"

export const Wrapper = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const WrapperLeft = styled.div`
  width: 100%;
  margin-top: 100px;
  padding: 0 20px 0;
  display: flex;
  flex-direction: column;
`

export const ProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

export const ProfileEdit = styled.div``

export const IconBox = styled.div`
  width: 100px;
  height: 100px;
  font-size: 25px;
  background-color: #ff7e35;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  & span {
    font-size: 14px;
  }
`

export const ProfileButtonList = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  :hover {
    cursor: pointer;
  }
`

export const WrapperRight = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 20px;
`

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
`

export const ColumnHeaderBasic = styled.div`
  width: 20%;
  text-align: center;
`

export const ColumnHeaderTitle = styled.div`
  width: 40%;
  text-align: center;
`

export const ColumnBasic = styled.div`
  width: 20%;
  text-align: center;
`

export const ColumnTitle = styled.div`
  width: 40%;
  text-align: center;
`

export const TopMenu = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  margin-bottom: 20px;
`

export const Selling = styled.div`
  cursor: pointer;
  color: ${(props) => (props.isSellingClicked ? "#FF7E35" : "black")};
  /* text-decoration: underline; */
`

export const Sold = styled.div`
  cursor: pointer;
  color: ${(props) => (props.isSoldClicked ? "#FF7E35" : "black")};
`

export const ItemListBox = styled(Box)`
  min-width: 275;
  margin-bottom: 2;
  height: 220;
`

export const ItemListCard = styled(Card)`
  width: 100%;
  padding: 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  :hover {
    cursor: pointer;
    background-color: #ffdbc7;
  }
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
`

export const ImageBox = styled.img`
  border-radius: 20px;
  width: 180px;
  height: 180px;
  margin: auto 20px auto 20px;
`

export const TypographyName = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 700px;
`

export const TypographyPrice = styled(Typography)`
  max-width: 700px;
  display: flex;
  font-size: 24px;
`

export const Balance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`
