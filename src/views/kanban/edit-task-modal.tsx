import React, { useEffect } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { useEditTaskModal, useTaskQueryKey } from './utils'
import { UserSelect } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { useDeleteTask, useEditTask } from 'utils/task'

export const EditTaskModal = () => {
  const { mutate: deleteTask } = useDeleteTask(useTaskQueryKey())
  const { editingTaskId, close, editingTaskData } = useEditTaskModal()
  const { mutateAsync: editTask, isLoading: editingLoading } = useEditTask(
    useTaskQueryKey()
  )
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(editingTaskData)
  }, [editingTaskData, form])

  const onClose = () => {
    form.resetFields()
    close()
  }

  const onOk = async () => {
    await editTask({
      ...editingTaskData,
      ...form.getFieldsValue()
    })
    close()
  }

  const onDeleteTask = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗?',
      onOk: () => {
        deleteTask({ id: Number(editingTaskId) })
        close()
      }
    })
  }

  return (
    <Modal
      forceRender={true}
      title={'编辑任务'}
      cancelText={'取消'}
      okText={'确定'}
      open={!!editingTaskId}
      onCancel={onClose}
      onOk={onOk}
      confirmLoading={editingLoading}
    >
      <Form
        form={form}
        initialValues={editingTaskData}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label={'任务名'}
          name={'name'}
          rules={[
            {
              required: true,
              message: '请输入任务名'
            }
          ]}
        >
          <Input placeholder={'任务名'} />
        </Form.Item>

        <Form.Item label={'经办人'} name={'processorId'}>
          <UserSelect defaultOptionName={'经办人'} />
        </Form.Item>

        <Form.Item label={'类型'} name={'typeId'}>
          <TaskTypeSelect />
        </Form.Item>

        <Form.Item label={'操作'}>
          <Button size={'small'} onClick={onDeleteTask} type={'ghost'}>
            删除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
