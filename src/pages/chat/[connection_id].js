import React, { useEffect, useState } from 'react'
import { chakra, Heading, Container, Text, Input, InputGroup, InputRightElement, Button, Box, Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../contexts/AuthContext'
import { Message } from '../../../components/Message'
import { IoSend } from 'react-icons/io5'

export default function ChatPage () {
  const router = useRouter()
  const { connection_id } = router.query
  const { currentUser } = useAuth()
  
  const [message, setMessage] = useState('')
  const handleClick = async () => {
    const msg = message
    setMessage('')
    const { data, error } = await supabase.from('messages').insert({ content: msg, connection_id: connection.id })
    // getChats().then((e) => setChats(e))
  }

  function SortByTime(a) {
    // a.sort(function(a, b){return a.created_at - b.created_at})
    // a.sort(function(a, b){return (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime()})
    a.sort(function(a, b){return Date.parse(a.created_at) - Date.parse(b.created_at)})
    return a
  }

  const [userData, setUserData] = useState()
  const [chats, setChats] = useState()
  const [connection, setConnection] = useState()

  const getUserDetails = async () => {
    const { error, data } = await supabase.from('profiles').select().eq('username', connection_id).maybeSingle()
    return data
  }

  const getConnection = async () => {
    const Primary_data = async () => {
      const { error, data } = await supabase.from('connections').select().eq('member_1', userData.id).eq('member_2', currentUser.id).maybeSingle()
      return data
    }
    const Secondary_data = async () => {
      const { error, data } = await supabase.from('connections').select().eq('member_2', userData.id).eq('member_1', currentUser.id).maybeSingle()
      return data
    }
    // const { error, data } = await supabase.from('connections').select().eq('member_1', userData.id).eq('member_2', currentUser.id).maybeSingle()
    // const { error, data } = await supabase.from('connections').select().eq('member_2', userData.id).eq('member_1', currentUser.id).maybeSingle()
    // return Primary_data()
    // console.log(await Primary_data())
    return (await Primary_data()) != null ? (await Primary_data()) : (await Secondary_data())
  }

  const getChats = async () => {
    const { error, data } = await supabase.from('messages').select()
      .eq('connection_id', connection.id)
    return data
  }

  useEffect(() => {
    currentUser && connection_id && getUserDetails().then((e) => setUserData(e))
  }, [currentUser, connection_id])

  useEffect(() => {
    userData && getConnection().then((e) => setConnection(e))
    userData && console.log('userData', userData)
  }, [userData])

  useEffect(() => {
    connection && getChats().then((e) => setChats(e))
    connection && console.log('Connection', connection)
  }, [connection])

  function reloadChats() {
    connection && getChats().then((e) => setChats(e))
  }

  useEffect(() => {
    const interval = setInterval(() => reloadChats(), 1000);
    return () => {clearInterval(interval)}
  }, [])

  return (<>
    {/* <Text width={'100%'} textAlign={'center'} pt={'15px'} fontSize={'14px'} lineHeight={'14px'} color={'#6B7280'}>Here You Will see your messages with @{connection_id}</Text> */}

    <Container maxW='container.lg' position={'fixed'} height={'100%'} px={2} pt={'10'} pb={'64px'}>
      <Flex height={'100%'} direction={'column'} overflowY={'scroll'}>
        <Spacer />
        {chats && SortByTime(chats).map((elem) => <Message Message={elem.content} SentByMe={elem.sender == currentUser.id} />)}
      </Flex>
    </Container>

    <Box width={'100%'} position={'fixed'} bottom={0} px={'12px'} my={'12px'}>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type='text'
          placeholder='Say Something...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  </>)
}