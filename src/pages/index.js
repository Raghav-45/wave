import { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Center, Box, Input, Button, Stack, VStack, HStack, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/AuthContext'

export default function Home() {

const relatedApps = await navigator.getInstalledRelatedApps();
const PWAisInstalled = relatedApps.length > 0;

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

  // const getCurrentUser = async () => {
  //   const { data: { user } } = await supabase.auth.getUser()
  //   return user
  // }

  useEffect(() => {
    currentUser && getUsersList().then((e) => {setUserList(e); setIsUserListLoading(false); console.log(e)})
  }, [currentUser])

  return (<>
PWAisInstalled && <Button>pwa</Button>
    <VStack px={5} pt={48} pb={14} spacing={2}>
      <Button onClick={() => router.push('/login')} width={'full'} colorScheme='blue' variant='solid'>Login</Button>
      <Button onClick={() => router.push('/register')} width={'full'} colorScheme='blue' variant='outline'>Register</Button>
      {currentUser && <Button onClick={async () => await supabase.auth.signOut()} width={'full'} colorScheme='blue' variant='outline'>Logout</Button>}
    </VStack>
    <VStack px={5} spacing={2}>
      {isUserListLoading ? <p>loading...</p> : userList.map((elem) => elem.id != currentUser.id && <Button onClick={() => router.push('/register')} width={'full'} colorScheme='black' variant='outline'>{elem?.username}</Button>)}
    </VStack>
  </>)
}
