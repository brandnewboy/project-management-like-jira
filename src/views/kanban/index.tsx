import React from 'react'
import styled from '@emotion/styled'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useProjectDetail } from 'utils/projects'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { CreateKanban } from './create-kanban'
import { EditTaskModal } from './edit-task-modal'
import { Row } from 'components/lib'
import { Button } from 'antd'
import {
  useCreateKanban,
  useKanbanSearchParams,
  useProjectIdInURL
} from './utils'

export const Kanban = () => {
  useDocumentTitle('看板列表')
  const projectId = useProjectIdInURL()
  const { data: currentProject } = useProjectDetail(projectId)
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { open } = useCreateKanban()

  return (
    <KanbanContainer>
      <h2>{currentProject?.name}任务看板</h2>
      <Row marginBottom={1}>
        <SearchPanel />
        <Button onClick={() => open()}>+新建看板</Button>
      </Row>
      <ColumnContainer>
        <CreateKanban />
        {kanbans?.map(kanban => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
        <EditTaskModal />
      </ColumnContainer>
    </KanbanContainer>
  )
}

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 2rem;
`

const ColumnContainer = styled.div`
  flex: 0.9;
  display: flex;
  /* overflow: hidden; */
  overflow-x: scroll;
  padding: 0.3rem 0;

  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    height: 0.8rem;
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10rem;
    background-color: rgba(220, 220, 220, 0.9);
  }
`
