import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from '../../contexts/AuthContext'
import theme from '../../theme'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
