import { QueryKey, useQueryClient } from 'react-query'

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, curData?: any[]) => any[]
) => {
  const queryClient = useQueryClient()

  return {
    // 请求成功回调
    onSuccess: () => queryClient.invalidateQueries('projects'),

    // 提交请求时的回调
    onMutate: (target: any) => {
      const previousData = queryClient.getQueryData<any[]>(queryKey)
      queryClient.setQueryData(queryKey, (curData?: any[]) =>
        callback(target, curData)
      )
      return {
        previousData
      }
    },

    // 请求失败时的回调
    onError: (error: any, target: any, context: any) => {
      queryClient.setQueryData(queryKey, () => context?.previousData)
    }
  }
}

/**
 * 获取编辑queryConfig
 * @param queryKey
 * @returns
 */
export const useEditQueryConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, curData) =>
      curData?.map(item =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  )

/**
 * 获取添加queryConfig
 * @param queryKey
 * @returns
 */
export const useAddQueryConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, curData) =>
    curData ? [...curData, target] : []
  )

/**
 * 获取删除queryConfig
 * @param queryKey
 * @returns
 */
export const useDeleteQueryConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, curData) => curData?.filter(item => item.id !== target.id) || []
  )
