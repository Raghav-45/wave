import React, { useEffect, useState } from 'react'
import { chakra, Heading, Container, Text, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../contexts/AuthContext'
import { Message } from '../../../components/Message'

export default function ChatPage () {
  const router = useRouter()
  const { connection_id } = router.query
  const { currentUser } = useAuth()
  
  const [myInput, setMyInput] = useState('')
  const handleClick = async () => {
    const { data, error } = await supabase.from('messages').insert({ content: myInput, sender: currentUser.id, receiver: currentUser.id, connection_id: connection.id }).select()
  }

  const [userData, setUserData] = useState()
  const [chats, setChats] = useState()
  const [connection, setConnection] = useState()

  const getUserDetails = async () => {
    const { error, data } = await supabase.from('profiles').select().eq('username', connection_id).maybeSingle()
    return data
  }

  const getConnection = async () => {
    const { error, data } = await supabase.from('connections').select().eq('member_2', userData.id).maybeSingle()
    return data
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
    // userData && console.log('userData', userData)
  }, [userData])

  useEffect(() => {
    connection && getChats().then((e) => setChats(e))
    // connection && console.log('Connection', connection)
  }, [connection])

  return (<>
    <Text width={'100%'} textAlign={'center'} pt={'15px'} fontSize={'14px'} lineHeight={'14px'} color={'#6B7280'}>Here You Will see your messages with @{connection_id}</Text>
    
    <Heading>Current User</Heading>
    <Container maxW='container.lg' overflowX='auto' py={4}>
      <chakra.pre p={4}>
        {currentUser && <pre>{JSON.stringify(currentUser, null, 2)}</pre>}
      </chakra.pre>
    </Container>
    
    <Heading>This Details</Heading>
    <Container maxW='container.lg' overflowX='auto' py={4}>
      <chakra.pre p={4}>
        {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
      </chakra.pre>
    </Container>

    <Heading>Connection</Heading>
    <Container maxW='container.lg' overflowX='auto' py={4}>
      <chakra.pre p={4}>
        {connection && <pre>{JSON.stringify(connection, null, 2)}</pre>}
      </chakra.pre>
    </Container>

    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type='text'
        placeholder='Enter password'
        value={myInput}
        onChange={(e) => setMyInput(e.target.value)}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          Send
        </Button>
      </InputRightElement>
    </InputGroup>

    <Heading>Chats</Heading>
    <Container maxW='container.lg' overflowX='auto' py={4}>
      {/* <chakra.pre p={4}>
        {chats && <pre>{JSON.stringify(chats, null, 2)}</pre>}
      </chakra.pre> */}
      {chats && chats.map((elem) => <Message Message={elem.content} SentByMe={elem.sender == currentUser.id} />)}
    </Container>
  </>)
}