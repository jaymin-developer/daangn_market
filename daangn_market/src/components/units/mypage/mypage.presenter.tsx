import * as S from "./mypage.styles"
// import MyUsedItemsPage from "./myuseditems"
// import MyProfilePage from "./myprofile"
// import MyPointPage from "./mypoint"
import {
  FaReceipt,
  FaHeart,
  FaShoppingBag,
  FaListAlt,
  FaMoneyBillAlt,
} from "react-icons/fa"
import { Modal } from "antd"
import Head from "next/head"
import SellHistory from "./mypoint.sell"
import BuyHistory from "./mypoint.buy"
import PickedItems from "./myuseditems.pickeditmes"
import MyPointPage from "./mypoint"

export default function MyPageUI(props) {
  return (
    <>
      {props.isModal && (
        <Modal
          visible={true}
          onOk={props.onClickPayment}
          onCancel={props.onClickModal}
          okText="충전하기"
          cancelText="취소하기"
          style={{ textAlign: "center", width: "100%" }}
        >
          <h1>🥕 당근 포인트 충전</h1>
          <select
            onChange={props.onChangeAmount}
            style={{ width: "80%", textAlign: "center", fontSize: "18px" }}
          >
            <option selected disabled>
              충전 금액을 선택해주세요.
            </option>
            <option value="500">500 포인트</option>
            <option value="1000">1000 포인트</option>
            <option value="2000">2000 포인트</option>
            <option value="3000">3000 포인트</option>
          </select>
        </Modal>
      )}
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <S.Wrapper>
        <S.WrapperLeft>
          <h1 style={{ borderBottom: "1px solid lightgray" }}>나의 당근</h1>
          <S.ProfileBox>
            <div style={{ display: "flex" }}>
              <img
                src="/images/Profile.png"
                width="80px"
                style={{ cursor: "pointer", marginRight: "20px" }}
              />
              <div>
                <h2>
                  {props.data?.fetchUserLoggedIn.name}{" "}
                  <span style={{ fontSize: "14px" }}>
                    ({props.data?.fetchUserLoggedIn.email})
                  </span>
                </h2>
                <p></p>
                <p style={{ color: "gray" }}>
                  당근 포인트 {props.data?.fetchUserLoggedIn.userPoint.amount}
                </p>
              </div>
            </div>
            <S.ProfileEdit
              onClick={props.onClickMyProfile}
            >{`프로필 수정 >`}</S.ProfileEdit>
          </S.ProfileBox>
          <S.ProfileButtonList>
            <S.IconBox onClick={props.onClickSellItem}>
              <FaListAlt />
              <span>판매 내역</span>
            </S.IconBox>
            <S.IconBox onClick={props.onClickBuyItem}>
              <FaShoppingBag />
              <span>구매 내역</span>
            </S.IconBox>
            <S.IconBox onClick={props.onClickPickUsedItem}>
              <FaHeart />
              <span>찜한 내역</span>
            </S.IconBox>
            <S.IconBox onClick={props.onClickPickMyPoint}>
              <FaReceipt />
              <span>포인트 내역</span>
            </S.IconBox>
            <S.IconBox onClick={props.onClickModal}>
              <FaMoneyBillAlt />
              <span>포인트 충전</span>
            </S.IconBox>
          </S.ProfileButtonList>
        </S.WrapperLeft>
        <S.WrapperRight>
          {props.sellItems && <SellHistory />}
          {props.buyItems && <BuyHistory />}
          {props.pickUsedItem && <PickedItems />}
          {props.pickMyPoint && <MyPointPage />}
        </S.WrapperRight>
      </S.Wrapper>
    </>
  )
}
