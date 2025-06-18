import React, { createContext, useContext, useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setUser(user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      const user = await Auth.signIn(email, password)
      setUser(user)
      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signUp = async (email, password, attributes = {}) => {
    try {
      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          ...attributes
        }
      })
      return { success: true, result }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const confirmSignUp = async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
      setUser(null)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    confirmSignUp,
    signOut,
    checkAuthState
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}