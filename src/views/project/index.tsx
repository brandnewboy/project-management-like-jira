import styled from '@emotion/styled'
import { Menu } from 'antd'
import React from 'react'
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Epic } from 'views/epic'
import { Kanban } from 'views/kanban'

const useRouteType = () => {
  const { pathname } = useLocation()
  return pathname.split('/').at(-1) || ''
}

export const Project = () => {
  const routeType = useRouteType()

  return (
    <Container>
      <Aside>
        <Menu
          style={{ width: '100%' }}
          selectedKeys={[routeType]}
          items={[
            {
              key: 'kanban',
              label: <Link to={'kanban'}>看板</Link>
            },
            {
              key: 'epic',
              label: <Link to={'epic'}>任务组</Link>
            }
          ]}
        />
      </Aside>
      <Main>
        <Routes>
          <Route path={'kanban'} element={<Kanban />} />
          <Route path={'epic'} element={<Epic />} />
          <Route
            path={'/'}
            element={<Navigate to={'kanban'} replace={true} />}
          />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.div`
  background: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  overflow-x: hidden;
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
  /* padding: 0 2rem; */
`

const Container = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100%;
`
