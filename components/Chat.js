import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Center, Box, Input, Button, Stack, VStack, HStack, InputGroup, InputLeftElement, useToast, AspectRatio, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export const Chat = (props) => {
  const DisplayName = props.DisplayName
  const Username = props.Username
  const PhotoURL = props.PhotoURL
  const isCloseFriend = props.isCloseFriend
  const isNewMessage = props.isNewMessage
  const router = useRouter()
  return (
    <Flex onClick={() => router.push(`chat/${Username}`)} my={'22px'} height={'72px'} width={'auto'} rounded={'20px'} bgGradient='linear(to-tr, rgb(252 252 253 / 100%), rgb(252 252 253 / 80%))' boxShadow='0 0 64px 10px rgb(15 15 15 / 10%)'>
      <Box height={'48px'} width={'48px'} mx={'16px'} my={'12px'} rounded={'full'} overflow={'hidden'}>
        {/* <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'></img> */}
        <Image src={PhotoURL ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt='' objectFit='cover' />
      </Box>
      <Flex position={'relative'} height={'100%'} direction={'column'} justify={'space-between'} py={'18px'} flexGrow={1} flexShrink={1} flexBasis={'auto'}>
        <Text m={'0px'} fontSize={'16px'} lineHeight={'16px'} fontWeight={'semibold'}>{DisplayName ?? 'Display Name'}</Text>
        <Flex direction={'row'} justify={'space-between'}>
          {!isCloseFriend && <Box color='white' position={'absolute'} height={'17px'} width={'auto'} top={'-8.5px'} left={'0px'} px={'8px'} py={'4px'} background={'#0071FF'} boxShadow='0 4px 12px 5px rgb(30 71 255 / 20%)' rounded={'full'}>
            <Text fontSize={'9px'} lineHeight={'9px'} fontWeight={'semibold'}>CLOSE FRIEND</Text>
          </Box>}
          <Text fontSize={'14px'} lineHeight={'14px'} color={'#6B7280'}>@{Username ?? 'username'}</Text>
          <Flex mr={'16px'} order={9999}>
            <Text fontSize={'14px'} lineHeight={'14px'} color={'#6B7280'}>5s</Text>
            {!isNewMessage && <Box height={'8px'} width={'8px'} background={'#F7508C'} ml={'4px'} my={'auto'} mb={'2px'} rounded={'full'} boxShadow='0 0 12px 1px rgb(247 80 140 / 56%)' order={9999}></Box>}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}