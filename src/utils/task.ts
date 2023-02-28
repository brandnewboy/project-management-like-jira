import { useHttp } from 'api'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import {
  useAddQueryConfig,
  useDeleteQueryConfig,
  useEditQueryConfig
} from './use-optimistic-options'

export const useTasks = (param?: Partial<Task>) => {
  const api = useHttp()
  return useQuery<Task[]>(['tasks', param], () =>
    api<Task[], Partial<Task>>('/tasks', {
      method: 'GET',
      data: param
    })
  )
}

export const useTaskDetail = (id?: number) => {
  const api = useHttp()
  return useQuery(
    ['tasks', { id }],
    () =>
      api<Task, number>(`/tasks/${id}`, {
        method: 'GET'
      }),
    {
      enabled: !!id
    }
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const api = useHttp()

  const addOptions = useMutation(
    (taskInfo: Partial<Task>) =>
      api<unknown, Partial<Task>>('/tasks', {
        method: 'POST',
        data: taskInfo
      }),
    useAddQueryConfig(queryKey)
  )

  return { ...addOptions }
}

export const useEditTask = (queryKey: QueryKey) => {
  const api = useHttp()

  const mutateOptions = useMutation(
    (params: Partial<Task>) =>
      api<Partial<Task>, Partial<Task>>(`/tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditQueryConfig(queryKey)
  )
  return { ...mutateOptions }
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const api = useHttp()

  const deleteOptions = useMutation(
    ({ id }: { id: number }) =>
      api(`/tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteQueryConfig(queryKey)
  )
  return { ...deleteOptions }
}
