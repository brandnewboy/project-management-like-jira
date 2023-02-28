import styled from '@emotion/styled'
import { Button, Divider, List, Popover } from 'antd'
import React, { ReactNode, FC } from 'react'
import { useProjectModal } from 'utils'
import { useProjects } from 'utils/projects'

interface ProjectsPopoverProps {
  children: ReactNode
}

export const ProjectsPopOver: FC<ProjectsPopoverProps> = ({ children }) => {
  const { data: list } = useProjects()
  const pinedProjects = list?.filter(project => !!project.pin)
  const { open } = useProjectModal()

  const content = (
    <div style={{ minWidth: '30rem' }}>
      <List>
        {pinedProjects?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <NoPaddingButton type={'link'} onClick={open}>
        创建项目
      </NoPaddingButton>
    </div>
  )

  return <Popover content={content} children={children} title={'项目列表'} />
}

export const NoPaddingButton = styled(Button)`
  padding: 0;
`
