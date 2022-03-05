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
        <option selected disabled>
          지역을 선택해주세요
        </option>
        <option value="서울특별시">서울특별시</option>
        <option value="부산광역시">부산광역시</option>
        <option value="대구광역시">대구광역시</option>
        <option value="인천광역시">인천광역시</option>
        <option value="광주광역시">광주광역시</option>
        <option value="대전광역시">대전광역시</option>
        <option value="울산광역시">울산광역시</option>
        <option value="세종특별자치시">세종특별자치시</option>
        <option value="경기도">경기도</option>
        <option value="강원도">강원도</option>
        <option value="충청북도">충청북도</option>
        <option value="충청남도">충청남도</option>
        <option value="전라남도">전라남도</option>
        <option value="전라북도">전라북도</option>
        <option value="경상북도">경상북도</option>
        <option value="경상남도">경상남도</option>
        <option value="제주특별자치도">제주특별자치도</option>
      </SearchRegion>
    </>
  )
}
