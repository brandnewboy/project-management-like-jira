import { useHttp } from 'api'
import { useState } from 'react'
import { ProjectProps } from 'types'
import { useDebounce } from 'utils'
import { ParamProps } from 'views/project-list'
import { useQuery, useMutation, QueryKey } from 'react-query'
import {
  useAddQueryConfig,
  useDeleteQueryConfig,
  useEditQueryConfig
} from './use-optimistic-options'

export interface EditProjectProps {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin: boolean
}

/**
 * 获取项目列表
 * @param param 搜索条件
 * @returns
 */
export const useProjects = (param?: ParamProps) => {
  /**
   * 初始化参数状态，如果用户想获取所有数据而不需要搜索参数则不传递param
   * 但是由于useEffect中依赖相关，因此需要初始化一个state
   */
  const [initialParam] = useState({ name: '负责人', personId: 0 })
  const api = useHttp()
  const debouncedValue = useDebounce<ParamProps>(param || initialParam, 500)
  return useQuery<ProjectProps[]>(['projects', debouncedValue], () =>
    api<ProjectProps[], ParamProps>('/projects', {
      method: 'GET',
      data: param
    })
  )
}

/**
 * 根据项目id获取项目详情
 * @param id 项目id
 * @returns
 */
export const useProjectDetail = (id?: number) => {
  const api = useHttp()
  return useQuery(
    ['projects', { id }],
    () =>
      api<ProjectProps, number>(`/projects/${id}`, {
        method: 'GET'
      }),
    {
      enabled: !!id
    }
  )
}

/**
 * 编辑项目信息
 * @returns
 */
export const useEditProject = (queryKey: QueryKey) => {
  const api = useHttp()

  const mutateOptions = useMutation(
    (params: ProjectProps) =>
      api<Partial<ProjectProps>, ProjectProps>(`/projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditQueryConfig(queryKey)
  )
  return { ...mutateOptions }
}

/**
 * 新增项目
 * @returns
 */
export const useAddProject = (queryKey: QueryKey) => {
  const api = useHttp()

  const addOptions = useMutation(
    (project: ProjectProps) =>
      api<Partial<EditProjectProps>, EditProjectProps>('/projects', {
        method: 'POST',
        data: project
      }),
    useAddQueryConfig(queryKey)
  )

  return { ...addOptions }
}

/**
 * 删除项目
 * @param queryKey query缓存key
 * @returns
 */
export const useDeleteProject = (queryKey: QueryKey) => {
  const api = useHttp()

  const deleteOptions = useMutation(
    ({ id }: { id: number }) =>
      api(`/projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteQueryConfig(queryKey)
  )
  return { ...deleteOptions }
}
