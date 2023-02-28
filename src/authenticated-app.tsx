import React from 'react'
import { useAuth } from 'context/auth-context'
import { ProjectList } from 'views/project-list'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { Row } from 'components/lib'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { Route, Routes } from 'react-router'
import { Project } from 'views/project'
import { Navigate } from 'react-router-dom'
import { resetRoute } from 'utils'
import { ProjectModal } from 'components/project-modal'
import { ProjectsPopOver } from 'components/projects-popvoer'
import { UsersPopOver } from 'components/users-popvoer'

export default function AuthenticatedApp() {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={'/projects'} element={<ProjectList />}></Route>
          <Route path={'/projects/:projectId/*'} element={<Project />}></Route>
          <Route path={'/'} element={<Navigate to={'/projects'} />}></Route>
        </Routes>
      </Main>
      <ProjectModal />
    </Container>
  )
}

/**
 * grid 和 flex
 * 1. 要考虑是 一维度布局 还是 二维布局
 *    一般来说，一维布局用flex，二维布局用grid
 *
 * 2. 要考虑是从内容出发还是从布局出发
 *    从内容出发：你先由一组内容不固定，希望把他们均匀排列在容器中，由内容自己的大小决定
 *    用flex
 *
 *    从布局出发：先规划网格，再往里面填充内容
 *    用grid
 */

const PageHeader = () => {
  const { user, logout } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={3}>
        <Button type={'link'} onClick={() => resetRoute()}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </Button>
        <ProjectsPopOver>
          <h2>项目</h2>
        </ProjectsPopOver>
        <UsersPopOver>
          <h2>用户</h2>
        </UsersPopOver>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type={'link'} onClick={logout}>
                  退出登录
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={'link'} onClick={e => e.preventDefault()}>
            {`Hi ${user?.username}`}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    'header header header'
    'main main main'
    'main main main';
  height: 100vh;
  /* grid-gap: 1rem; */
`

const Header = styled(Row)`
  grid-area: header;
  padding: 0 3.2rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 94, 0, 0.1) 0 0 0.5rem;
`
const HeaderLeft = styled(Row)`
  > * {
    cursor: pointer;
  }
`
const HeaderRight = styled(Row)``

// const Nav = styled.nav`
//   grid-area: nav;
// `
const Main = styled.main`
  grid-area: main;
`
// const Aside = styled.aside`
//   grid-area: aside;
// `
// const Footer = styled.footer`
//   grid-area: footer;
// `
