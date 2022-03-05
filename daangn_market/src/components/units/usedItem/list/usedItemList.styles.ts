import styled from "@emotion/styled"
import { Box, Card, Typography } from "@mui/material"

export const Wrapper = styled.div`
  width: 680px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
  padding: 30px 0;
`

export const Head = styled.h1`
  text-align: center;
`
export const BestBoards = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const BodyInfo = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 20px;
`
export const WriteButton = styled.button`
  width: 100px;
  height: 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: #ff7e35;
  border-radius: 5px;
  :hover {
    cursor: pointer;
  }
`

export const ContentsList = styled.div`
  width: 100%;
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

// export const SearchWord = styled.span`
//   color: ${(props) => (props.isMatched ? "red" : "black")};
// `
