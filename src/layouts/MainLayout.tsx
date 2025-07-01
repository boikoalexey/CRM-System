import { Link, Outlet, useLocation } from 'react-router-dom'
import { LaptopOutlined, UserOutlined } from '@ant-design/icons'
import {
  Layout,
  Menu,
  theme,
  type MenuProps, Breadcrumb,
} from 'antd'

const { Content, Footer, Sider } = Layout

export function MainLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const location = useLocation()
  const current = location.pathname === '/' ? 'todo' : location.pathname.slice(1)

  const menuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
    { key: 'todo', icon: <LaptopOutlined />, label: <Link to="/todo">Todo List</Link> },
  ]

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              selectedKeys={[current]}
              style={{ height: '100%' }}
              items={menuItems}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </div>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}
