import { Button, Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { Pin } from 'components/lib'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteProject, useEditProject } from 'utils/projects'
import Utils, { useProjectModal, useProjectsQueryKey } from '../../utils'

export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  created: number
  pin: boolean
}

interface User {
  id: number
  name: string
}

interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
}

export const List: FC<ListProps> = ({ users, ...props }) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const pinProject = (project: Project) => {
    return (pin: boolean) => {
      mutate({ ...project, pin })
    }
  }

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render: (value, project) => {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project)}
              />
            )
          }
        },
        {
          title: '名称',
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render: (value, project) => {
            return (
              users.find(user => user.id === project.personId)?.name || '未知'
            )
          }
        },
        {
          title: '创建时间',
          render: (value, project) => {
            return Utils.Day.format(project.created)('YYYY-MM-DD')
          }
        },
        {
          render: (value, project) => {
            return <ListMoreDroupDown project={project} />
          }
        }
      ]}
      {...props}
      rowKey={project => project.id}
    />
  )
}

/**
 * 列表最后一栏 编辑栏内容
 * @returns FC
 */
const ListMoreDroupDown: FC<{ project: Project }> = ({ project }) => {
  const { startEdit } = useProjectModal()
  const { mutateAsync } = useDeleteProject(useProjectsQueryKey())

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: '是否确认删除该项目?',
      content: '点击确认删除',
      okText: '确认',
      cancelText: '取消',
      onOk: () => mutateAsync({ id })
    })
  }

  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: 'edit',
              label: (
                <Button onClick={() => startEdit(project.id)} type={'link'}>
                  编辑
                </Button>
              )
            },
            {
              key: 'delete',
              label: (
                <Button onClick={() => confirmDelete(project.id)} type={'link'}>
                  删除
                </Button>
              )
            }
          ]}
        ></Menu>
      }
    >
      <Button type={'link'}>. . .</Button>
    </Dropdown>
  )
}
