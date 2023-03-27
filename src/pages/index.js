import { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Text, Center, Box, Input, Button, Stack, VStack, HStack, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  return (
    <VStack px={5} pt={48} spacing={2}>
      <Button onClick={() => router.push('/login')} width={'full'} colorScheme='blue' variant='solid'>Login</Button>
      <Button onClick={() => router.push('/register')} width={'full'} colorScheme='blue' variant='outline'>Register</Button>
    </VStack>
  )
}