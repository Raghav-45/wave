import React from 'react'
import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function ChatPage () {
  const router = useRouter()
  const { connection } = router.query
  return (
    <Text width={'100%'} textAlign={'center'} pt={'15px'} fontSize={'14px'} lineHeight={'14px'} color={'#6B7280'}>Here You Will see your messages with @{connection}</Text>
  )
}