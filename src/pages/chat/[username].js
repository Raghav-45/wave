import React, { useEffect, useState, useRef } from 'react'
import { chakra, Heading, Container, Text, Input, InputGroup, InputRightElement, Button, Box, Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { supabase } from '../../../lib/supabaseClient'
import { useAuth } from '../../../contexts/AuthContext'
import { Message } from '../../../components/Message'
import { IoSend } from 'react-icons/io5'

export default function ChatPage () {
  const router = useRouter()
  const { username } = router.query
  const { currentUser } = useAuth()
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {messagesEndRef.current?.scrollIntoView({behavior: "smooth"})}
  
  const [message, setMessage] = useState('')
  const handleClick = async () => {
    const msg = message
    // const checkedConnection = isNewConversation ? generateNewConversation().then((e) => setConnection(e)) : connection
    // isNewConversation && generateNewConversation().then((e) => setConnection(e))
    // const newConnection = isNewConversation ? generateNewConversation().then((e) => setConnection(e)) : null
    const checkedConnection = isNewConversation ? await generateNewConversation() : connection
    isNewConversation && setConnection(checkedConnection)
    setIsNewConversation(false)
    setMessage('')
    const { data, error } = await supabase.from('messages').insert({ content: msg, connection_id: await checkedConnection.id })
    // if (isNewConversation) {
    //   const { data, error } = await supabase.from('messages').insert({ content: msg, connection_id: newConnection.id })
    // } else {
    //   const { data, error } = await supabase.from('messages').insert({ content: msg, connection_id: connection.id })
    // }
    // setIsNewConversation(false)
    // setMessage('')
    // const { data, error } = await supabase.from('messages').insert({ content: msg, connection_id: checkedConnection.id })
    // getChats().then((e) => setChats(e))
  }

  const generateNewConversation = async () => {
    const { data, error } = await supabase.from('connections').insert({ member_1: currentUser.id, member_2: userData.id }).select().maybeSingle()
    console.log(data)
    return data
  }

  function SortByTime(a) {
    // a.sort(function(a, b){return a.created_at - b.created_at})
    // a.sort(function(a, b){return (new Date(a.created_at)).getTime() - (new Date(b.created_at)).getTime()})
    a.sort(function(a, b){return Date.parse(a.created_at) - Date.parse(b.created_at)})
    return a
  }

  const [userData, setUserData] = useState()
  const [chats, setChats] = useState([])
  const [connection, setConnection] = useState()
  const [isNewConversation, setIsNewConversation] = useState(false)
  const [watchForRealtimeChanges, setWatchForRealtimeChanges] = useState(false)

  const getUserDetails = async () => {
    const { error, data } = await supabase.from('profiles').select().eq('username', username.toLowerCase()).maybeSingle()
    return data
  }

  const getConnection = async () => {
    //TODO: i Will Change this Method to Something Optimized, coz it takes Time to get connection_id
    const Primary_data = async () => {
      const { error, data } = await supabase.from('connections').select().eq('member_1', userData.id).eq('member_2', currentUser.id).maybeSingle()
      console.log('pri', {data, error})
      return data
    }
    const Secondary_data = async () => {
      const { error, data } = await supabase.from('connections').select().eq('member_2', userData.id).eq('member_1', currentUser.id).maybeSingle()
      console.log('sec', {data, error})
      return data
    }
    // const { error, data } = await supabase.from('connections').select().eq('member_1', userData.id).eq('member_2', currentUser.id).maybeSingle()
    // const { error, data } = await supabase.from('connections').select().eq('member_2', userData.id).eq('member_1', currentUser.id).maybeSingle()
    // return Primary_data()
    // console.log(await Primary_data())

    const pri = await Primary_data()
    const sec = await Secondary_data()

    if (pri != null) {
      return pri
    } else if (sec != null) {
      return sec
    } else {
      setIsNewConversation(true)
    }
    // return (await Primary_data()) != null ? (await Primary_data()) : (await Secondary_data()) == null && setIsNewConversation(true)
  }

  const getChats = async () => {
    const { error, data } = await supabase.from('messages').select()
      .eq('connection_id', connection.id)
    return data
  }

  useEffect(() => {
    currentUser && username && getUserDetails().then((e) => setUserData(e))
  }, [currentUser, username])

  useEffect(() => {
    userData && getConnection().then((e) => setConnection(e))
    userData && console.log('userData', userData)
  }, [userData])

  useEffect(() => {
    connection && !isNewConversation && getChats().then((e) => {setChats(e); setWatchForRealtimeChanges(true);})
    connection && console.log('Connection', connection)
  }, [connection, isNewConversation])

  useEffect(() => {
    isNewConversation && console.log('this is newConvo')
  }, [isNewConversation])
  

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  useEffect(() => {
    const sub = supabase.channel('any')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        console.log('Change received!', payload)
        // chats.includes(payload.new) && console.log('i already have', payload.new)
        // console.log(chats)
        // setChats((current) => [...current, payload.new])
        watchForRealtimeChanges && setChats((current) => current.includes(payload.new) ? current : [...current, payload.new])
      }).subscribe()
    return () => {
      supabase.removeChannel(sub)
    }
  }, [watchForRealtimeChanges])
  

  // function reloadChats() {
  //   connection && getChats().then((e) => setChats(e))
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => reloadChats(), 1000);
  //   return () => {clearInterval(interval)}
  // }, [])

  return (<>
    {/* <Text width={'100%'} textAlign={'center'} pt={'15px'} fontSize={'14px'} lineHeight={'14px'} color={'#6B7280'}>Here You Will see your messages with @{connection_id}</Text> */}

    <Container maxW='container.lg' position={'fixed'} height={'100%'} px={2} pb={'64px'}>
      <Flex height={'100%'} direction={'column'} overflowY={'scroll'}>
        <Spacer />
        {chats && SortByTime(chats).map((elem) => <Message key={elem.id} Message={elem.content} SentByMe={elem.sender == currentUser.id} />)}
        <div ref={messagesEndRef} />
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