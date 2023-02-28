import React from 'react'
import { Button, Input } from 'antd'
import { Row, UserSelect } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { useSetUrlSearchParam } from 'utils'
import { useTaskSearchParams } from './utils'

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      name: undefined,
      processorId: undefined,
      typeId: undefined,
      tagId: undefined
    })
  }

  return (
    <Row marginBottom={1} gap={1}>
      <Input
        style={{ width: '20rem' }}
        placeholder={'任务名'}
        value={searchParams.name}
        onChange={e => setSearchParams({ name: e.target.value })}
      />

      <UserSelect
        defaultOptionName={'经办人'}
        value={searchParams.processorId}
        onChange={value => setSearchParams({ processorId: value })}
      />

      <TaskTypeSelect
        defaultOptionName={'类型'}
        value={searchParams.typeId}
        onChange={value => setSearchParams({ typeId: value })}
      />

      <Button onClick={reset}>重置筛选器</Button>
    </Row>
  )
}
