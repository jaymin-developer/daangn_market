import styled from "@emotion/styled"

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 72px 0 0;
  padding: 50px 0 0;
  border-bottom: 1px solid lightgray;
`

export const DetailWrapper = styled.div`
  width: 680px;
  display: flex;
  flex-direction: column;
`

export const TopMenu = styled.div`
  font-size: 16px;
  color: darkred;
  :hover {
    cursor: pointer;
  }
`

export const WriterBox = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ProfilePhoto = styled.img`
  height: 50px;
  border-radius: 25px;
`

export const WriterCreatedAt = styled.div`
  width: 75%;
`
export const Writer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const CreatedAt = styled.div`
  color: #828282;
`

export const Location = styled.div`
  color: #828282;
`

export const Name = styled.div`
  word-wrap: break-word;
  font-size: 24px;
  line-height: 50px;
`
export const Remark = styled.div`
  word-wrap: break-word;
  font-size: 14px;
  color: #bdbdbd;
  line-height: 20px;
`

export const Price = styled.div`
  word-wrap: break-word;
  font-size: 24px;
  line-height: 50px;
`

export const SliderBox = styled.div`
  display: flex;
  align-items: center;
  /* padding: 20px 0; */
  /* width: 100%; */
  height: 500px;
`

export const Image = styled.img`
  margin: auto;
  height: 100%;
  border-radius: 20px;
`

export const Contents = styled.div`
  table-layout: fixed;
  word-wrap: break-word;
  padding-top: 10px;
`

export const Tags = styled.div`
  color: white;
  background-color: #ff7e35;
  padding: 5px;
  border-radius: 10px;
  margin: 10px 5px;
`

export const BuyButton = styled.button`
  width: 150px;
  height: 70px;
  bottom: 10px;
  right: 200px;
  background-color: #ff7e35;
  border: none;
  border-radius: 10px;
  color: white;
  position: fixed;
  z-index: 1;
  cursor: pointer;
`
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
`
