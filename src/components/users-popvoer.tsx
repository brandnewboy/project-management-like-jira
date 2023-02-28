import styled from '@emotion/styled'
import { Button, List, Popover } from 'antd'
import React, { ReactNode, FC } from 'react'
import useUsers from 'utils/user'

interface UsersPopoverProps {
  children: ReactNode
}

export const UsersPopOver: FC<UsersPopoverProps> = ({ children }) => {
  const { data: users } = useUsers()

  const content = (
    <div style={{ minWidth: '30rem' }}>
      <List>
        {users?.map(user => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
    </div>
  )

  return <Popover content={content} children={children} title={'组员列表'} />
}

export const NoPaddingButton = styled(Button)`
  padding: 0;
`
