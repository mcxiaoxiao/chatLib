import React from 'react';
import {
  BookOutlined,
  ReadOutlined,
  LaptopOutlined,
  CalendarOutlined,
  NotificationOutlined,
  UserOutlined 
  
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { RecoilRoot } from 'recoil';
import {useState,FC} from 'react';

import {userID} from '../../recoil/store'
import { useRecoilState } from 'recoil';


const MenuLayout: React.FC = () => {
  const [ID, setID] = useRecoilState(userID);
  const nav = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);

  function nav0(){nav('/');
  setCurrentPage(0);
}
  function nav1(){nav('/book');
  setCurrentPage(1);}
  function nav2(){nav('/takes') 
  setCurrentPage(2);
}
  function nav3(){nav('/history')
  setCurrentPage(3);
}
  function nav4(){nav('/manage')
  setCurrentPage(4);
}
  function nav5(){nav('/reader')
  setCurrentPage(5);
}

  const { Header, Content, Footer, Sider } = Layout;
  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick:Function,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      onClick,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('书籍一览', '1', <ReadOutlined />,nav1),
    getItem('借阅情况', '2', <CalendarOutlined />,nav2),
    getItem('历史记录', '3', <LaptopOutlined />,nav3),
    getItem('图书管理', '4', <BookOutlined />,nav4),
    getItem('个人信息', '5', <UserOutlined />,nav5),
  ];

  const items2: MenuItem[] = [
    getItem('书籍一览', '1', <ReadOutlined />,nav1),
    getItem('借阅情况', '2', <CalendarOutlined />,nav2),
    getItem('历史记录', '3', <LaptopOutlined />,nav3),
    getItem('个人信息', '5', <UserOutlined />,nav5),
  ];


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{width:'100vw',marginLeft:'-1vw',marginTop:'-1vh',background:'#f5f5f5',height:'140vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center',fontSize:20,color:'white' }}>
      <BookOutlined /> 
      <span style={{marginLeft:'1vw'}}>
      睿心图书管理系统
      </span>

      {(ID===10010)&&(<span style={{marginLeft:'70vw'}} >你好，郭子铭</span>)}
      {(ID===10086)&&(<span style={{marginLeft:'70vw'}} >你好，王光耀</span>)}
      </Header>

      <Content style={{ padding: '0 25px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>图书管理系统</Breadcrumb.Item>
          <Breadcrumb.Item>{((currentPage==1) && "书籍一览")||
                            ((currentPage==2) && "借阅情况")||
                            ((currentPage==3) && "历史记录")||
                            ((currentPage==4) && "图书管理")||
                            ((currentPage==5) && "个人信息")||
                            ((currentPage==0) && "首页")
                            }</Breadcrumb.Item>
        </Breadcrumb>


        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>

            {(ID===10086)&&(            <Menu
              mode="inline"
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['0']}
              style={{ height: '100%' }}
              items={items}
            />)}

{(ID===10010)&&(            <Menu
              mode="inline"
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['0']}
              style={{ height: '100%' }}
              items={items2}
            />)}


          </Sider>


          <Content style={{ padding: '0 24px', minWidth: 927,minHeight: 200,}}>
            <Outlet></Outlet>
            </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: 'center' }}>©2023 Created by王光耀 & 郭子铭 & 谢鑫</Footer>
    </Layout>
  );
};

export default MenuLayout;