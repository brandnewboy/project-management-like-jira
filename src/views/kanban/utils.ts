import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router'
import { useURLQueryParam } from 'utils'
import { useTaskDetail } from 'utils/task'

export const useProjectIdInURL = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInURL() })

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
  const [param] = useURLQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInURL()

  return useMemo(
    () => ({
      projectId,
      name: param.name,
      typeId: Number(param.typeId),
      processorId: Number(param.processorId),
      tagId: Number(param.processorId)
    }),
    [projectId, param]
  )
}

export const useTaskQueryKey = () => ['tasks', useTaskSearchParams()]

export const useEditTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useURLQueryParam([
    'editingTaskId'
  ])

  const { data: editingTaskData, isLoading } = useTaskDetail(
    Number(editingTaskId)
  )

  const startEdit = useCallback(
    (editingTaskId: number) => setEditingTaskId({ editingTaskId }),
    [setEditingTaskId]
  )

  const close = () => setEditingTaskId({ editingTaskId: undefined })

  return {
    close,
    startEdit,
    editingTaskId,
    editingTaskData,
    isLoading
  }
}

export const useCreateKanban = () => {
  const [{ createkanban }, setCreateKanban] = useURLQueryParam(['createkanban'])

  const open = () => setCreateKanban({ createkanban: true })

  const close = () => setCreateKanban({ createkanban: undefined })

  return {
    open,
    close,
    createkanban: Boolean(createkanban)
  }
}
