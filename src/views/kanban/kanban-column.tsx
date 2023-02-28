import React, { FC } from 'react'
import { Kanban } from 'types/kanban'
import { TaskTypeIcon } from 'components/TaskTypeIcon'
import styled from '@emotion/styled'
import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import { CreateTask } from './create-task'
import { Task } from 'types/task'
import { Mark } from 'components/mark'
import { useDeleteKanban } from 'utils/kanban'
import { Row } from 'components/lib'
import { useTasks } from 'utils/task'
import {
  useEditTaskModal,
  useKanbansQueryKey,
  useTaskSearchParams
} from './utils'

const TaskCard: FC<{
  task: Task
}> = ({ task }) => {
  const { startEdit } = useEditTaskModal()
  const { name: keyword } = useTaskSearchParams()

  return (
    <Card
      onClick={() => startEdit(task.id)}
      key={task.id}
      style={{ marginBottom: '1rem', cursor: 'pointer' }}
    >
      <div>
        <Mark text={task.name} keyword={keyword} />
      </div>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

const KanbanColumnMore: FC<{
  id: number
}> = ({ id }) => {
  const { mutate } = useDeleteKanban(useKanbansQueryKey())

  const onClickDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗?',
      onOk: () => {
        mutate({ id })
      }
    })
  }

  const overlay = (
    <Menu
      items={[
        {
          key: 'delete',
          label: '删除',
          onClick: onClickDelete
        }
      ]}
    />
  )

  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>. . .</Button>
    </Dropdown>
  )
}

export const KanbanColumn: FC<{
  kanban: Kanban
}> = ({ kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <KanbanColumnMore id={kanban.id} />
      </Row>
      <TaskContainer>
        {tasks?.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  )
}

export const Container = styled.div`
  min-width: 27rem;
  height: 100%;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  transition: all 0.5s;
  overflow: hidden;

  :hover {
    box-shadow: 0.5rem 0.5rem 0.8rem 0.1rem rgba(10, 0, 0, 0.1),
      -0.2rem -0.2rem 0.8rem 0.1rem rgba(10, 0, 0, 0.1);
  }
`

const TaskContainer = styled.div`
  overflow-y: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    height: 0.6rem;
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10rem;
    background-color: rgba(220, 220, 220, 0.7);
  }
`
