import styled from '@emotion/styled'
import { Button, List, Modal, Tag } from 'antd'
import { Row } from 'components/lib'
import { useNavigate } from 'react-router'
import Utils from 'utils'
import { useDeleteEpic, useEpics } from 'utils/epic'
import { useProjectDetail } from 'utils/projects'
import { useTasks } from 'utils/task'
import { useProjectIdInURL, useTaskSearchParams } from 'views/kanban/utils'
import { CreateEpic } from './create-epic'
import { useCreateEpicModal, useEpicQueryKey, useEpicSearchParam } from './util'

export const Epic = () => {
  const { data: epics } = useEpics(useEpicSearchParam())
  const { data: tasks } = useTasks(useTaskSearchParams())
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey())
  const { open } = useCreateEpicModal()
  const { data: projectInfo } = useProjectDetail(useProjectIdInURL())
  const navigate = useNavigate()

  const go = (id: number) => {
    navigate(`/projects/${projectInfo?.id}/kanban?editingTaskId=${id}`)
  }

  const onDeleteClick = (id: number) => {
    Modal.confirm({
      title: '确定删除任务组吗?',
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        deleteEpic({ id })
      }
    })
  }

  return (
    <EpicContainer>
      <Row between={true}>
        <h2>{projectInfo?.name}任务组</h2>
        <Button onClick={() => open()} type={'link'}>
          创建任务组
        </Button>
      </Row>
      <List
        dataSource={epics}
        renderItem={epic => (
          <List.Item key={epic.id}>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <h3>{epic.name}</h3>
                  <Button onClick={() => onDeleteClick(epic.id)} type={'link'}>
                    删除任务组
                  </Button>
                </Row>
              }
              description={
                <DescriptionContainer>
                  <div>
                    <section>
                      开始时间: {Utils.Day.format(epic.start)('YYYY-MM-DD')}
                    </section>
                    <section>
                      结束时间: {Utils.Day.format(epic.end)('YYYY-MM-DD')}
                    </section>
                  </div>

                  <ItemsContainer>
                    {tasks?.map(task => (
                      <Tag
                        onClick={() => go(task.id)}
                        style={{ fontSize: '1.4rem', cursor: 'pointer' }}
                        color={task.typeId === 1 ? 'volcano' : 'purple'}
                        key={task.id}
                      >
                        {task.name}
                      </Tag>
                    ))}
                  </ItemsContainer>
                </DescriptionContainer>
              }
            />
          </List.Item>
        )}
      />
      <CreateEpic />
    </EpicContainer>
  )
}

const EpicContainer = styled.div`
  padding: 0 1rem;
  overflow-y: scroll;
`

const DescriptionContainer = styled.div`
  display: flex;
`

const ItemsContainer = styled.section`
  padding: 0 1.5rem;
  height: 4.4rem;
`
