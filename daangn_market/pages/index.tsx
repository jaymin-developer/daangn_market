import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { MouseEvent } from "react"

const FETCH_USED_ITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $search: String, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        address
      }
      seller {
        name
      }
      createdAt
    }
  }
`
const Wrapper = styled.div`
  width: 100%;
  margin-top: 72px;
`
const Page1 = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px 10%;
  background-color: #fbf7f3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & img {
    width: 60%;
  }
`

const Box = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & div {
    flex-direction: row;
    align-items: center;
  }

  & h1 {
    font-size: 32px;
    font-weight: bold;
  }
  & button {
    width: 120px;
    height: 45px;
    border: none;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`

const Page2 = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const ImageDiv1 = styled.div`
  width: 600px;
  height: 685px;
  background-image: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-68ba12f0da7b5af9a574ed92ca8b3a9c0068db176b566dd374ee50359693358b.png);
  background-size: 600px 685px;
`

const ImageDiv2 = styled.div`
  width: 532px;
  height: 684px;
  background-image: url(https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-39ac203e8922f615aa3843337871cb654b81269e872494128bf08236157c5f6a.png);
  background-size: 532px 684px;
`

const Page3 = styled.div`
  width: 100vw;
  padding: 50px 10% 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: #f8f9fa;
`
const Card = styled.div`
  width: calc(25% - 44px);
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

const Box2 = styled.div`
  width: 1024px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: #f8f9fa;
`

export default function LandingPage() {
  const router = useRouter()
  const { data } = useQuery(FETCH_USED_ITEMS, {
    variables: { page: 1 },
  })

  const onClickMoveToList = () => {
    router.push(`/useditems`)
  }

  const onClickMoveToDetail = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/useditems/${event.currentTarget.id}`)
  }

  return (
    <Wrapper>
      <Page1>
        <Box>
          <div>
            <h1>당신 근처의</h1>
            <h1>당근마켓</h1>
            <p>중고 거래부터 동네 정보까지, 이웃과 함께해요.</p>
            <p>가깝고 따뜻한 당신의 근처를 만들어요.</p>
          </div>
          <ImageDiv1></ImageDiv1>
        </Box>
      </Page1>
      <Page2>
        <Box>
          <ImageDiv2></ImageDiv2>
          <div>
            <h1>우리 동네 </h1>
            <h1>중고 직거래 마켓</h1>
            <p>동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</p>
            <button onClick={onClickMoveToList}>인기매물 보기</button>
          </div>
        </Box>
      </Page2>
      <Page3>
        <Box2>
          {data?.fetchUseditems
            .filter((el, index) => el.price && el.pickedCount >= 0 && index > 1)
            .map((el) => (
              <Card
                key={el._id}
                id={el._id}
                style={{ display: "felx", flexDirection: "column" }}
                onClick={onClickMoveToDetail}
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
                  {el.useditemAddress.address
                    ? el.useditemAddress.address
                    : "위치 정보 없음"}
                </Address>
                <PickedCount>관심 {el.pickedCount}</PickedCount>
              </Card>
            ))}
        </Box2>
      </Page3>
      <p
        style={{
          textAlign: "center",
          margin: "30px 0px",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={onClickMoveToList}
      >
        인기매물 더 보기
      </p>
    </Wrapper>
  )
}
