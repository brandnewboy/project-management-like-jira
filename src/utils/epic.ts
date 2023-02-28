import { useHttp } from 'api'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Epic } from 'types/epic'

import {
  useAddQueryConfig,
  useDeleteQueryConfig
} from './use-optimistic-options'

export const useEpics = (param?: Partial<Epic>) => {
  const api = useHttp()
  return useQuery<Epic[]>(['epics', param], () =>
    api<Epic[], Partial<Epic>>('/epics', {
      method: 'GET',
      data: param
    })
  )
}

export const useAddEpics = (queryKey: QueryKey) => {
  const api = useHttp()

  const addOptions = useMutation(
    (taskInfo: Partial<Epic>) =>
      api<unknown, Partial<Epic>>('/epics', {
        method: 'POST',
        data: taskInfo
      }),
    useAddQueryConfig(queryKey)
  )

  return { ...addOptions }
}

export const useDeleteEpic = (queryKey: QueryKey) => {
  const api = useHttp()

  const deleteOptions = useMutation(
    ({ id }: { id: number }) =>
      api(`/epics/${id}`, {
        method: 'DELETE'
      }),
    useDeleteQueryConfig(queryKey)
  )
  return { ...deleteOptions }
}
