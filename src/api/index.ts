import { RequestOptionProps } from 'types/request'
import Consts from '../constants'
import Utils from 'utils'
import { logout } from 'auth-provider'
import { useAuth } from 'context/auth-context'
import { useCallback } from 'react'

const BASE_URL = Consts.API_URL

export const http = async <T, R>(
  path: string,
  option: RequestOptionProps<R>
) => {
  let param: string = ''
  if (option.data && (option.method === 'GET' || option.method === 'get')) {
    param = Utils.qsStringify(option.data)
    !!param && (path += `?${param}`)
  }

  const config: RequestInit = {
    method: option.method,
    headers: {
      Authotization: option.token ? `Bearer ${option.token}` : '',
      'Content-Type': 'application/json',
      ...option.headers
    },
    body: JSON.stringify(option.data || {})
  }

  if (option.method === 'GET' || option.method === 'get') {
    delete config['body']
  }

  return new Promise<T>((resolve, reject) => {
    fetch(`${BASE_URL}${path}`, config)
      .then(async res => {
        if (res.status === 401) {
          logout()
          reject({ msg: '请登录!' })
        }

        if (res.ok) {
          const data = await res.json()
          resolve(data)
        } else {
          reject(new Error('请求失败!请检查网络或后台设置'))
        }
      })
      .catch(() => {
        reject(new Error('请求失败!请检查网络或后台设置'))
      })
  })
}

export const useHttp = () => {
  const { user } = useAuth()

  return useCallback(
    <T, R>(path: string, option: RequestOptionProps<R>) => {
      return http<T, R>(path, {
        ...option,
        token: user?.token ? user.token : ''
      })
    },

    [user]
  )
}
