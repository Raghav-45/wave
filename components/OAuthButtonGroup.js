import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons'
// import { useAuth } from '../contexts/AuthContext'

const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon boxSize="5" />,
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon boxSize="5" />,
  },
  {
    name: 'GitHub',
    icon: <GitHubIcon boxSize="5" />,
  },
]


export const OAuthButtonGroup = () => {
  // const { signInWithGoogle, register } = useAuth()
  return (
  <ButtonGroup variant="outline" spacing="4" width="full">
    <Button key={'Google'} width="full">
      <VisuallyHidden>Sign in with Google</VisuallyHidden>
      <GoogleIcon boxSize="5" />
    </Button>

    <Button key={'Twitter'} width="full">
      <VisuallyHidden>Sign in with Twitter</VisuallyHidden>
      <TwitterIcon boxSize="5" />
    </Button>

    <Button key={'GitHub'} width="full">
      <VisuallyHidden>Sign in with GitHub</VisuallyHidden>
      <GitHubIcon boxSize="5" />
    </Button>
  </ButtonGroup>
)}