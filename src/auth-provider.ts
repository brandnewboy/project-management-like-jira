import { LoginFormProps } from 'types'
import Consts from './constants'

// const BASE_URL = Consts.APP_BASE_URL + '/user/login'

export const getToken = (): LoginFormProps => {
  const token = localStorage.getItem(Consts.localStorageKey)
  return token ? JSON.parse(token) : null
}

export const handleUserResponse = (user: LoginFormProps) => {
  localStorage.setItem(Consts.localStorageKey, JSON.stringify(user))
  return user
}
export const clearUserInfo = () => {
  localStorage.removeItem(Consts.localStorageKey)
}
export const login = (param: LoginFormProps) => {
  return new Promise<LoginFormProps>((resolve, reject) => {
    const userInfo: LoginFormProps = {
      username: 'lisi',
      password: '123456',
      token: '__auth__token__'
    }
    handleUserResponse(userInfo)
    resolve(userInfo)
  })
}

export const register = (param: LoginFormProps) => Promise.resolve(param)
export const logout = () => {
  clearUserInfo()
  return Promise.resolve()
}
