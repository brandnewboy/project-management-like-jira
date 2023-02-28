import { useHttp } from 'api'
import { useQuery } from 'react-query'
import { TaskType } from 'types/task'

/**
 * 获取任务类型数据
 * @returns 任务类型
 *
 * 使用 useHttp Hook 返回的网络请求方法接收两个泛型参数
 * 第一个泛型是响应数据的类型
 * 第二个泛型是请求参数的类型（为确保类型系统的安全性若没有参数请使用 unknow 类型）
 */
export const useTaskTypes = () => {
  const api = useHttp()
  return useQuery<TaskType[]>(['taskTypes'], () =>
    api<TaskType[], unknown>('/taskTypes', {
      method: 'GET'
    })
  )
}
