import { useEffect, useState, useRef } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Spinner, Center, Box, Input, Button, Stack, VStack, HStack, InputGroup, InputLeftElement, useToast, AspectRatio, Image } from '@chakra-ui/react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import { Chat } from '../../components/Chat'
import { FiSearch } from 'react-icons/fi'

export default function Home() {
  const router = useRouter()
  const { currentUser, logout } = useAuth()
  const inputRef = useRef(null)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [SearchQuery, setSearchQuery] = useState('')
  const [userList, setUserList] = useState()
  const [isUserListLoading, setIsUserListLoading] = useState(true)

  const getUsersList = async () => {
    // const { error, data } = await supabase.from('connections').select().eq('member_1', currentUser.id)
    const { error, data } = await supabase.from('profiles').select()
    return data
  }

  useEffect(() => {
    currentUser && getUsersList().then((e) => {setUserList(e); setIsUserListLoading(false); console.log(e)})
  }, [currentUser])

  return (
    <Box height={'100vh'} width={'100%'} px={'20px'} pt={'24px'} bgGradient='linear(to-tr, rgb(38 41 47 / 03%), rgb(53 61 76 / 06%))'>
      <Flex justifyItems={'end'}>
        <Flex verticalAlign={'bottom'} width={'auto'} my={'auto'} mr={'8px'} flexGrow={1} flexShrink={1} flexBasis={'auto'}>
          <Text fontSize={'28px'} fontWeight={'semibold'}>Chat</Text>
          {/* <Text fontSize={'28px'} fontWeight={'semibold'}> - {currentUser?.user_metadata?.username}</Text> */}
        </Flex>

        <Flex onMouseEnter={(e) => setShowSearchBox(true)} onMouseLeave={(e) => setShowSearchBox(false)} height={'40px'} width={'40px'} borderWidth='1px' borderColor='#FCFCFD99' background={'#FCFCFD80'} rounded={'full'} overflow={'hidden'} style={{width: showSearchBox && '100%', flexGrow: showSearchBox && '1', transitionDuration: '0.2s', transitionTimingFunction: "cubic-bezier(.4,0,.2,1)"}}>
          <Flex m={'auto'} mx={'11px'} color={'#130F26'}>
            <FiSearch onClick={() => {inputRef.current.focus()}} height={'18px'} width={'18px'} fontSize={'18px'} />
            <Input ref={inputRef} value={SearchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='@username' width={0} height={'18px'} p={0} pl={'8px'} focusBorderColor='#0000' errorBorderColor='#0000' style={{transitionDuration: '0.5s', transitionTimingFunction: "cubic-bezier(.4,0,.2,1)"}} borderWidth={0} flexGrow={1} flexShrink={1} flexBasis={'auto'}/>
          </Flex>
        </Flex>
        <Flex onClick={() => logout()} height={'40px'} width={'40px'} borderWidth='1px' borderColor='#FCFCFD99' rounded={'full'} overflow={'hidden'} ml={'8px'} flexGrow={0} flexShrink={0} flexBasis={'auto'}>
          <Image src={currentUser?.user_metadata?.photo_url ?? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt='' objectFit='cover' />
        </Flex>
      </Flex>

      {/* <Chat DisplayName={'Raghav'} Username={'raghav_aditya_45'} PhotoURL={'https://i.pinimg.com/564x/66/4e/7f/664e7ffc5187ce22defefce46e60788e.jpg'} isCloseFriend={true} /> */}
      {isUserListLoading ? <HStack justify={'center'} width={'100%'} pt={'15px'}><Text>Loading chats...</Text><Spinner height={'3'} width={'3'} color='#0071FF' /></HStack> : currentUser && userList.map((elem) => elem.id != currentUser?.id && <Chat key={elem.id} DisplayName={elem?.username.charAt(0).toUpperCase() + elem?.username.slice(1)} Username={elem?.username} />)}
    </Box>
  )
}
