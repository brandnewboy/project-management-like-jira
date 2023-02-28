import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import Day from './day'
import { useProjectDetail } from './projects'

interface ParamProps {
  [x: string]: any
}

interface UseArrayResProps<T> {
  value: T[]
  add: (value: T) => void
  clear: () => void
  removeByIndex: (index: number) => void
}

export default class Utils {
  static Day = Day

  static processParam = (param: ParamProps) => {
    const newParam = { ...param }
    return Object.keys(newParam).reduce<ParamProps>((res, key) => {
      const value = newParam[key]
      if (value && value !== 0) {
        res[key] = value
      }
      return res
    }, {})
  }

  static processQuery = (paramObj: ParamProps) => {
    const keysArr = Object.keys(paramObj)
    return keysArr.reduce((res, key, index) => {
      const value = paramObj[key]
      res += `${key}=${value}`
      if (index !== keysArr.length - 1) res += '&'
      return res
    }, '')
  }

  static qsStringify = (param: ParamProps) => {
    return this.processQuery(this.processParam(param))
  }

  static toNumber = (value: unknown) => {
    return isNaN(Number(value)) ? 0 : Number(value)
  }

  static isError = (value: any): value is Error => {
    return !!value?.message || false
  }
}

/**
 * 以下模块为自定义hook
 * custom hooks
 */

/**
 * useMount 触发挂载时的一些事件
 * @param callback 回调函数
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * 返回组件状态，如果组件还没有挂在或者已经卸载则返回false，否则返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}

/**
 * useDebounce 用于使用防抖的场景
 * @param value 防抖的值
 * @param delay 防抖时间
 * @returns
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebounceValue] = useState<T>(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)

    return () => clearTimeout(timeout)
  }, [value, delay])
  return debouncedValue
}

/**
 * useArray 一些数组常用方法封装
 * @param array 目标数组
 * @returns
 */
export const useArray = <T>(array: T[]): UseArrayResProps<T> => {
  const [value, setValue] = useState<T[]>(array)

  const add = (item: T) => setValue([item, ...value])

  const clear = () => setValue([])

  const removeByIndex = (index: number) => {
    const newArr = value.filter((item, curindex) => index !== curindex)
    setValue([...newArr])
  }

  return {
    value,
    add,
    clear,
    removeByIndex
  }
}

interface StateProps<D> {
  error: Error | null
  data: D | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: StateProps<null> = {
  data: null,
  status: 'idle',
  error: null
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  )
}

/**
 * useAsync 用于使用异步操作时管理异步状态和异步数据
 * @param initialState 初始化状态
 * @returns
 */
export const useAsync = <D>(initialState?: StateProps<D>) => {
  const [state, dispatch] = useReducer(
    (state: StateProps<D>, action: Partial<StateProps<D>>) => ({
      ...state,
      ...action
    }),
    {
      ...defaultInitialState,
      ...initialState
    }
  )

  const safeDispatch = useSafeDispatch(dispatch)

  // 惰性初始state
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        status: 'success',
        error: null
      }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        status: 'error'
      }),
    [safeDispatch]
  )

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('please provide a paramter of type Promise')
      }

      /**
       * 存放前一次异步状态，生成一个二次执行的函数retry存入状态
       */
      setRetry(() => () => {
        if (runConfig) run(runConfig.retry(), runConfig)
      })
      safeDispatch({
        status: 'loading'
      })
      return promise
        .then(data => {
          setData(data)
          return data
        })
        .catch(err => {
          setError(err)
          return err
        })
    },
    [safeDispatch, setData, setError]
  )

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    /**
     * retry 被调用一次时重新跑一次run，让state刷新一遍
     */
    retry,
    setData,
    setError,
    run,
    ...state
  }
}

/**
 * useDocumentTitle 用于控制页面头部标题
 * @param title 文档标题
 * @param keepOnUnmount 是否在页面组件卸载时保持当前标题
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  let oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}
// 重置路由，回到页面根路径
export const resetRoute = () => (window.location.href = window.location.origin)

/**
 * useURLQueryParam 用于控制一些和当前URL相关的搜索参数
 * @param keys 目标参数的key
 * @returns
 */
export const useURLQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()

  const setSearchParams = useSetUrlSearchParam()

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [k in K]: string }),
      [searchParams, keys]
    ),

    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params)
    }
  ] as const
}

/**
 * 控制项目列表搜索参数
 * @returns
 */
export const useProjectsParams = () => {
  const [keys] = useState<['name', 'personId']>(['name', 'personId'])
  const [param, setParam] = useURLQueryParam(keys)
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) }
    }, [param]),
    setParam
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = Utils.processParam({
      ...Object.fromEntries(searchParams),
      ...params
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}

/**
 * 根据URL的搜索参数控制创建项目的模态框
 * @returns
 */
export const useProjectModal = () => {
  const [{ projectCreate, editingProjectId }, setParam] = useURLQueryParam([
    'projectCreate',
    'editingProjectId'
  ])

  const { data: editProjectData, isLoading } = useProjectDetail(
    Number(editingProjectId)
  )

  const open = () => setParam({ projectCreate: true, editingProjectId: '' })
  const close = () => {
    setParam({ projectCreate: '', editingProjectId: '' })
  }
  const startEdit = (id: number) =>
    setParam({ projectCreate: '', editingProjectId: id })

  return {
    isOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editProjectData,
    isLoading
  }
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectsParams()
  return ['projects', params]
}
