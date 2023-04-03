import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({
  currentUser: null,
  // signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      session != undefined ? setCurrentUser((current) => (current?.id == session?.user.id) ? current : session.user) : setCurrentUser(null)
      console.log('Session Change', session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  // useEffect(() => {
  //   // const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
  //   //   setCurrentUser(session?.user)
  //   //   console.log(session?.user)
  //   // })
  //   // return () => {
  //   //   listener?.subscription.unsubscribe()
  //   // }

  //   const setData = async () => {
  //     const { data: { session }, error } = await supabase.auth.getSession();
  //     if (error) throw error;
  //     setSession(session)
  //     setCurrentUser(session?.user)
  //     setLoading(false);
  //   };

  //   const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //     setCurrentUser(session?.user)
  //     setLoading(false)
  //   });

  //   setData();

  //   return () => {
  //     listener?.subscription.unsubscribe();
  //   };
  // }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function login(email, password) {
    return supabase.auth.signInWithPassword({ email: email, password: password })
  }

  function register(username, email, password) {
    return supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username
        },
      },
    })
  }

  async function forgotPassword(email) {
    return await supabase.auth.resetPasswordForEmail(email)
  }

  function resetPassword(oobCode, newPassword) {
    // return confirmPasswordReset(auth, oobCode, newPassword)
    return 'test'
  }

  async function logout() {
    return await supabase.auth.signOut()
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const value = {
    currentUser,
    // signInWithGoogle,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}