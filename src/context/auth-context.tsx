import React, { ReactNode, useState } from 'react'
import { AuthContextProps, LoginFormProps } from 'types'
import * as auth from '../auth-provider'

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginFormProps | null>(auth.getToken())

  const login = (form: LoginFormProps) => auth.login(form).then(setUser)
  const register = (form: LoginFormProps) => auth.register(form)
  const logout = () => auth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be use in AuthProvider!')
  return context
}
