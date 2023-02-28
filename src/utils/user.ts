import { useHttp } from 'api'
import { useCallback, useEffect } from 'react'
import { useAsync } from 'utils'
import { User } from 'views/project-list/search-panel'

const useUsers = (param?: Partial<User>) => {
  const { run, ...rest } = useAsync<User[]>()
  const api = useHttp()

  const fetchUsers = useCallback(
    () =>
      api<User[], unknown>('/users', {
        method: 'GET'
      }),
    [api]
  )

  useEffect(() => {
    run(fetchUsers())
  }, [run, param, fetchUsers])

  return { ...rest }
}

export default useUsers
