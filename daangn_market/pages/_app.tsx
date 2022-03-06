import "antd/dist/antd.css"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client"
import { AppProps } from "next/app"
import { Global } from "@emotion/react"
import Layout from "../src/components/commons/layout"
import { globalStyles } from "../src/commons/styles/globalStyles"
import { createUploadLink } from "apollo-upload-client"
import { onError } from "@apollo/client/link/error"

// Import the functions you need from the SDKs you need
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { getAccessToken } from "../src/commons/libraries/getAccessToken"

interface IGlobalContext {
  accessToken?: string
  setAccessToken?: Dispatch<SetStateAction<string>>
  userInfo?: object
  setUserInfo?: Dispatch<SetStateAction<string | object>>
  getDebounce?: string
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<IGlobalContext>({})

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState("")
  const [userInfo, setUserInfo] = useState({})
  const [search, setSearch] = useState("")

  const value = {
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    search,
    setSearch,
  }

  useEffect(() => {
    getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken)
    })
  }, [])
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          getAccessToken().then((newAccessToken) => {
            setAccessToken(newAccessToken)
            operation.setContext({
              headers: {
                ...operation.getContext().headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            })
            return forward(operation)
          })
        }
      }
    }
  })

  const uploadLink = createUploadLink({
    uri: "https://backend05.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  })

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    // 다른 기능들을 연결하겠다.
    cache: new InMemoryCache(),

    connectToDevTools: true,
  })

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </GlobalContext.Provider>
  )
}

export default MyApp
