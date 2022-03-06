import styled from "@emotion/styled"

const SearchRegion = styled.select`
  width: 150px;
  height: 30px;
  border: solid 1px #e9ecef;
  border-radius: 5px;
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`

export default function RegionSelect(props) {
  return (
    <>
      <SearchRegion name="region" onChange={props.onChangeRegion}>
        <option value="">지역 전체</option>
        <option value="서울">서울특별시</option>
        <option value="부산">부산광역시</option>
        <option value="대구">대구광역시</option>
        <option value="인천">인천광역시</option>
        <option value="광주">광주광역시</option>
        <option value="대전">대전광역시</option>
        <option value="울산">울산광역시</option>
        <option value="세종">세종특별자치시</option>
        <option value="경기">경기도</option>
        <option value="강원">강원도</option>
        <option value="충북">충청북도</option>
        <option value="충남">충청남도</option>
        <option value="전북">전라북도</option>
        <option value="전남">전라남도</option>
        <option value="경북">경상북도</option>
        <option value="경남">경상남도</option>
        <option value="제주">제주특별자치도</option>
      </SearchRegion>
    </>
  )
}
