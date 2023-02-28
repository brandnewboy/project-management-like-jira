import React, { FC } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import {
  useDocumentTitle,
  useProjectModal,
  useProjectsParams
} from '../../utils'
import { Button } from 'antd'
import useUsers from 'utils/user'
import { useProjects } from 'utils/projects'
import { ErrorBox, Row } from 'components/lib'
import styled from '@emotion/styled'

export interface ParamProps {
  name: string
  personId: number
}

export const ProjectList: FC = () => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsParams()
  const { data: users } = useUsers()
  const { isLoading, error, data: list } = useProjects(param)
  const { open: setProjectModalOpen } = useProjectModal()

  return (
    <Container>
      <Row between={true} marginBottom={1}>
        <h2>项目列表</h2>
        <Button onClick={setProjectModalOpen} type={'primary'}>
          创建项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
`
