import React, { FC, useEffect } from 'react'
import styled from '@emotion/styled'
import { Drawer, Button, Form, Input } from 'antd'
import { useProjectModal, useProjectsQueryKey } from 'utils'
import { UserSelect } from './lib'
import { Project } from 'views/project-list/list'
import { useAddProject, useEditProject } from 'utils/projects'

export const ProjectModal: FC = () => {
  const { isOpen, close, editProjectData } = useProjectModal()

  const queryKey = useProjectsQueryKey()
  const [form] = Form.useForm()
  const useMutateProject = Boolean(editProjectData)
    ? useEditProject
    : useAddProject
  const { mutateAsync, isLoading } = useMutateProject(queryKey)

  const onSubmit = (formValues: Project) => {
    formValues.created = Date.now()
    formValues.id = !!editProjectData
      ? editProjectData.id
      : Math.random() * 10 + Math.random()
    formValues.pin = false

    mutateAsync({ ...editProjectData, ...formValues }).then(() => {
      closeModal()
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editProjectData)
  }, [editProjectData, form])

  return (
    <Drawer
      forceRender={true}
      title={!!editProjectData ? '编辑项目' : '添加项目'}
      placement={'right'}
      open={isOpen}
      onClose={closeModal}
      width={'30vw'}
    >
      <h1 style={{ textAlign: 'center' }}>
        {!!editProjectData ? '编辑项目' : '添加项目'}
      </h1>
      <Container>
        <Form
          style={{ width: '35rem' }}
          layout={'horizontal'}
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            label={'项目名'}
            name={'name'}
            rules={[{ required: true, message: '请输入项目名' }]}
          >
            <Input placeholder={'请输入项目名'} />
          </Form.Item>
          <Form.Item
            label={'部门名'}
            name={'organization'}
            rules={[{ required: true, message: '请输入部门名' }]}
          >
            <Input placeholder={'请输入部门'} />
          </Form.Item>
          <Form.Item
            label={'负责人'}
            name={'personId'}
            rules={[{ required: true, message: '请选择负责人' }]}
          >
            <UserSelect defaultOptionName={'负责人'} />
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'} loading={isLoading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
