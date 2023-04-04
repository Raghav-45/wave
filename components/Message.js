import { Box } from '@chakra-ui/react'
import React from 'react'

export const Message = ((props) => {
  const Message = props.Message
  const CreatedAt = props.CreatedAt
  const SentByMe = props.SentByMe
  return (
    <Box width={'100%'} height={'min'} my={0.5}>
      <Box background={'blue.400'} textColor={'white'} py={1} px={3} width={'max'} maxWidth={'77%'} rounded={'2xl'} style={SentByMe ? {marginLeft: 'auto', right: '0'} : {marginRight: 'auto', left: '0'}}>{Message}</Box>
    </Box>
  )
})