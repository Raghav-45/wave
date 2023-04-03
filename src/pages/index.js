import { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Spinner, Center, Box, Input, Button, Stack, VStack, HStack, InputGroup, InputLeftElement, useToast, AspectRatio, Image } from '@chakra-ui/react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'
import { Chat } from '../../components/Chat'
import { FiSearch } from 'react-icons/fi'

export default function Home() {
  const router = useRouter()
  const { currentUser } = useAuth()
  // const [currentUser, setCurrentUser] = useState()
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
        </Flex>

        <Flex height={'40px'} width={'40px'} borderWidth='1px' borderColor='#FCFCFD99' background={'#FCFCFD80'} rounded={'full'} overflow={'hidden'}>
          <Box m={'auto'} mx={'11px'} color={'#130F26'}>
            <FiSearch height={'18px'} width={'18px'} fontSize={'18px'} mr={'8px'} />
          </Box>
        </Flex>
        <Flex height={'40px'} width={'40px'} borderWidth='1px' borderColor='#FCFCFD99' rounded={'full'} overflow={'hidden'} ml={'8px'}>
          <Image src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt='' objectFit='cover' />
        </Flex>
      </Flex>

      {/* <Chat DisplayName={'Raghav'} Username={'raghav_aditya_45'} PhotoURL={'https://i.pinimg.com/564x/66/4e/7f/664e7ffc5187ce22defefce46e60788e.jpg'} isCloseFriend={true} /> */}
      {isUserListLoading ? <HStack justify={'center'} width={'100%'} pt={'15px'}><Text>Loading chats...</Text><Spinner height={'3'} width={'3'} color='#0071FF' /></HStack> : userList.map((elem) => elem.id != currentUser.id && <Chat DisplayName={elem?.username.charAt(0).toUpperCase() + elem?.username.slice(1)} Username={elem?.username} />)}
    </Box>
  )
}
