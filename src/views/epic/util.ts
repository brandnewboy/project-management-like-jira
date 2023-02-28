import { useURLQueryParam } from 'utils'
import { useProjectIdInURL } from 'views/kanban/utils'

export const useEpicSearchParam = () => ({ projectId: useProjectIdInURL() })
export const useEpicQueryKey = () => ['epics', useEpicSearchParam()]

export const useCreateEpicModal = () => {
  const [{ createepic }, setCreateEpic] = useURLQueryParam(['createepic'])

  const open = () => setCreateEpic({ createepic: true })
  const close = () => setCreateEpic({ createepic: undefined })

  return {
    open,
    close,
    isOpen: Boolean(createepic)
  }
}
