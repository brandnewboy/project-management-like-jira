import { Button, Card, Input } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { usePersonId, useRandomId, useTaskTypeId } from 'utils/mock-help'
import { useAddTask } from 'utils/task'
import { useProjectIdInURL, useTaskQueryKey } from './utils'

export const CreateTask: FC<{
  kanbanId: number
}> = ({ kanbanId }) => {
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey())
  const [inputMode, setInputMode] = useState(false)
  const [name, setName] = useState('')
  const [processorId, gengrateRandomId] = usePersonId()
  const projectId = useProjectIdInURL()
  const typeId = useTaskTypeId()
  const id = useRandomId()

  const toggle = () => setInputMode(mode => !mode)

  const submit = async () => {
    gengrateRandomId()
    await addTask({
      id,
      name,
      kanbanId,
      projectId,
      typeId,
      processorId
    })
    setName('')
    setInputMode(false)
  }

  useEffect(() => {
    if (!inputMode) setName('')
  }, [inputMode])

  if (!inputMode) {
    return (
      <div>
        <Button type={'link'} onClick={toggle}>
          +创建事务
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        autoFocus={true}
        placeholder={'做点什么'}
        value={name}
        onChange={e => setName(e.target.value)}
        onPressEnter={submit}
      />
    </Card>
  )
}
