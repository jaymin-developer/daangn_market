import styled from "@emotion/styled";

export const LocationBox = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5%;
  padding-top: 3%;
  border-top: 1px solid #dddddd;
`;

export const InnerWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const MapBox = styled.div`
  width: 100%;
  height: auto;
  min-height: 380px;
`;

export const AddressBox = styled.div`
  min-width: 380px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ffffff;
  padding: 20px 35px 10px;
  z-index: 1;
  border-radius: 30px 0 0 0;
  font-size: 1em;
  .zipcode {
    color: #09a5ed;
    font-size: 1.3em;
    font-weight: 700;
    margin-bottom: 8px;
    border-bottom: 1px solid #bbbbbb;
    display: flex;
    flex-direction: row;
    align-items: center;
    .zip {
      color: #ffffff;
      background: #09a5ed;
      font-size: 0.65em;
      display: inline-block;
      width: 22px;
      height: 22px;
      border-radius: 3px;
      text-align: center;
      margin-right: 5px;
    }
  }
  .address {
  }
`;
