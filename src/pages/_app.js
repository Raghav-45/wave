import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from '../../contexts/AuthContext'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  )
}
