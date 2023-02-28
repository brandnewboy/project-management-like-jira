import React, { FC } from 'react'
import { Form, Input } from 'antd'
import { UserSelect } from 'components/lib'
import { Project } from './list'

export interface User {
  id: number
  name: string
}

export interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel: FC<SearchPanelProps> = ({
  param,
  setParam,
  users
}) => {
  return (
    <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={e =>
            setParam({
              ...param,
              name: e.target.value
            })
          }
        />
      </Form.Item>

      {/* 
          此处因为Select接收的value类型是string,而在options中的value（也就是id）是number类型
          当我们选择某一项的时候拿到该选项的value为number，在渲染时Select组件根据一个string去展示选项类型冲突，导致无法显示
          真正想展示的选项

          所以此处采用自定义的组件来解决该问题
      */}

      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName={'负责人'}
          onChange={value =>
            setParam({
              ...param,
              personId: value
            })
          }
        />
      </Form.Item>
    </Form>
  )
}
