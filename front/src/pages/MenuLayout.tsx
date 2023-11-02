import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { RecoilRoot } from 'recoil';


const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };



  },
);

const MenuLayout: React.FC = () => {


  const nav = useNavigate()
  function nav1(){nav('/')}
  function nav4(){nav('/widget3')}
  function nav5(){nav('/widget4')}
  
  const items1: MenuProps['items'] = ['1','4','5'].map((key) => {
  
    if(key=='1')
    {
      return{
        key:key,
        label: `首页`,
        onClick:nav1,
      }
    }

    else if(key=='4')
    {
      return{
        key:key,
        label: `表格`,
        onClick:nav4,
      }
    }
    else if(key=='5')
    {
      return{
        key:key,
        label: `表单`,
        onClick:nav5,
      }
    }

    else
    {    return{
      key:key,
      label: `nav ${key}`,
    }
  
    }
  
  
  });




  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minWidth: 927,minHeight: 330,}}><Outlet></Outlet></Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default MenuLayout;