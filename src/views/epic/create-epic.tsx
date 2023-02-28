import React, { useState } from 'react'
import { Input, Modal } from 'antd'
import { useCreateEpicModal, useEpicQueryKey } from './util'
import { useAddEpics } from 'utils/epic'
import { usePersonId, useRandomId } from 'utils/mock-help'
import { useProjectIdInURL } from 'views/kanban/utils'

export const CreateEpic = () => {
  const { isOpen, close } = useCreateEpicModal()
  const { mutate, isLoading } = useAddEpics(useEpicQueryKey())
  const [, generate] = usePersonId()
  const id = useRandomId()
  const [name, setName] = useState('')
  const currentProjectId = useProjectIdInURL()

  const onOk = () => {
    generate()
    mutate({
      id,
      name,
      projectId: currentProjectId,
      start: Date.now(),
      end: Date.now()
    })
    onClose()
  }

  const onClose = () => {
    setName('')
    close()
  }

  return (
    <Modal
      open={isOpen}
      title={'添加任务组'}
      okText="确定"
      cancelText="取消"
      confirmLoading={isLoading}
      onOk={onOk}
      onCancel={onClose}
    >
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder={'任务组名'}
      />
    </Modal>
  )
}
