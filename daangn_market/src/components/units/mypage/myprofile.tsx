import { gql, useQuery } from "@apollo/client"

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      email
      name
      #   createAt
      #   updateAt
    }
  }
`

export default function MyProfilePage() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN)
  console.log(data)
  return (
    <>
      <div>이메일 : {data?.fetchUserLoggedIn.email}</div>
      <div>이름 : {data?.fetchUserLoggedIn.name}</div>
      {/* <div>생성일자 : {data?.fetchUserLoggedIn.createAt}</div>
      <div>업데이트일자 : {data?.fetchUserLoggedIn.updateAt}</div> */}
    </>
  )
}
