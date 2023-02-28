import { useHttp } from 'api'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import {
  useAddQueryConfig,
  useDeleteQueryConfig
} from './use-optimistic-options'

export const useKanbans = (param?: Partial<Kanban>) => {
  const api = useHttp()
  return useQuery<Kanban[]>(['kanbans', param], () =>
    api<Kanban[], Partial<Kanban>>('/kanbans', {
      method: 'GET',
      data: param
    })
  )
}

export const useAddKanban = (queryKey: QueryKey) => {
  const api = useHttp()

  const addOptions = useMutation(
    (kanbanInfo: Kanban) =>
      api<Kanban, Kanban>('/kanbans', {
        method: 'POST',
        data: kanbanInfo
      }),
    useAddQueryConfig(queryKey)
  )

  return { ...addOptions }
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const api = useHttp()

  const deleteOptions = useMutation(
    ({ id }: { id: number }) =>
      api(`/kanbans/${id}`, {
        method: 'DELETE'
      }),
    useDeleteQueryConfig(queryKey)
  )
  return { ...deleteOptions }
}
