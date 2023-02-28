import React, { FC, useState } from 'react'
import { useAddKanban } from 'utils/kanban'
import { useCreateKanban, useKanbansQueryKey, useProjectIdInURL } from './utils'
import { Button, Input } from 'antd'
import styled from '@emotion/styled'

export const CreateKanban: FC = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInURL()
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())
  const { createkanban, close } = useCreateKanban()

  const submit = async () => {
    await addKanban({ id: Math.random() * 10, name, projectId })
    setName('')
    close()
  }

  const onClose = () => {
    setName('')
    close()
  }

  return (
    <Container style={{ minWidth: `${createkanban ? 27 : 0}rem` }}>
      <Input
        style={{ width: '26rem', margin: '0.7rem 0.7rem 0.7rem 0.7rem' }}
        size={'large'}
        placeholder={'新建看板名称'}
        value={name}
        onChange={e => setName(e.target.value)}
        onPressEnter={submit}
        addonAfter={
          <Button size={'small'} type={'text'} onClick={onClose}>
            取消
          </Button>
        }
      />
    </Container>
  )
}

const Container = styled.div`
  width: 0rem;
  height: 100%;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: rgb(244, 245, 247);
  flex-direction: column;
  text-align: center;
  margin-right: 1.5rem;
  transition: all 0.5s;
  overflow: hidden;

  :hover {
    box-shadow: 0.5rem 0.5rem 0.8rem 0.1rem rgba(10, 0, 0, 0.1),
      -0.2rem -0.2rem 0.8rem 0.1rem rgba(10, 0, 0, 0.1);
  }
`
