import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { TodayDate } from "../../../commons/libraries/utils"
import { useRouter } from "next/router"

const Wrapper = styled.div`
  width: 680px;
  margin: 20px auto 0;
  padding: 20px 0;
  overflow: hidden;
  border-top: 1px solid lightgray;
`

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 18px;
  }
`

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
`

const Card = styled.div`
  width: calc(33% - 44px);
  margin-right: 44px;
  margin-bottom: 56px;
  :hover {
    cursor: pointer;
  }
`

const ItemImgBox = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
`

const ItemImg = styled.img`
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
`

const Name = styled.div`
  font-weight: 400;
  color: gray;
`

const Price = styled.div`
  font-size: 15px;
  font-weight: 700;
`

const Address = styled.div`
  font-size: 13px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const PickedCount = styled.div`
  font-size: 13px;
  color: lightgray;
`

export default function ItemLists() {
  const [list, setList] = useState([])
  const router = useRouter()
  useEffect(() => {
    setList(JSON.parse(localStorage.getItem(`${TodayDate()}`) || "[]"))
  }, [])

  const onClickDetail = (event) => {
    router.push(`/useditems/${event.currentTarget.id}`)
  }

  const onClickList = () => {
    router.push("/useditems")
  }

  return (
    <Wrapper>
      {list.length > 0 && (
        <WrapperTop>
          <p> 오늘 본 상품</p>
          <p
            style={{ fontSize: "14px", color: "#ff7e35", cursor: "pointer" }}
            onClick={onClickList}
          >
            {" "}
            더 구경하기
          </p>
        </WrapperTop>
      )}

      <Box>
        {list.slice(-3).map((el) => (
          <Card
            key={el._id}
            id={el._id}
            style={{ display: "felx", flexDirection: "column" }}
            onClick={onClickDetail}
          >
            <ItemImgBox>
              <ItemImg
                src={`https://storage.googleapis.com/${el.images[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-basic.svg"
                }}
              />
            </ItemImgBox>
            <Name>{el.name}</Name>
            <Price>{el.price}원</Price>
            <Address>
              {el?.useditemAddress?.address
                ? el.useditemAddress.address
                : "위치 정보 없음"}
            </Address>
            <PickedCount>관심 {el.pickedCount}</PickedCount>
          </Card>
        ))}
      </Box>
    </Wrapper>
  )
}
