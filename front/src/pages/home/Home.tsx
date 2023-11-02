/* eslint-disable */
import './login.scss';
import React from 'react';
import { useState,useEffect,FC } from 'react'
import { Button ,Card ,Form,Input,InputNumber, message} from 'antd';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { Pagination , Space} from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';
import{bac }from '../../assets/bac.png'
import {userID} from '../../recoil/store'
import { useRecoilState } from 'recoil';



import {gql, useQuery,useLazyQuery ,useMutation} from '@apollo/client';


const Home:FC=()=>{
  const [ID, setID] = useRecoilState(userID);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const nav = useNavigate()

  function nav0(){nav('/book');
}



  const onFinish = async (values:any) => {

console.log(values.admin)
console.log(values.password)

    if((values.admin==="admin" ) && (values.password==="123456"))
    {
      messageApi.open({
        type: 'success',
        content: '登录成功',
      });
      setID(10086);
      nav0();
    }
    else if((values.admin==="user" ) && (values.password==="123456"))
    {
      messageApi.open({
        type: 'success',
        content: '登录成功',
      });
      setID(10010);
      nav0();
    }
    else
    {
      messageApi.open({
        type: 'error',
        content: '登录失败',
      });
      
    }
  };


  const imageStyle = {  
    backgroundImage: `url(../../assets/bac.png)`,  
    // 如果你想设置图片的位置，你可以使用 'background-position' 属性  
    // backgroundPosition: 'center', // 或者 '50% 50%'  
  };  


  return (
<div
className="login-container"
>
{contextHolder}
<Space direction="vertical" size={16}>
    <Card size="default" 
     style={{ width: 350 ,marginLeft:'60vw',marginTop:'-20vh'}}>

      
      <h2 style={{ marginTop:'-1vh',marginLeft:'4vw'}}>睿心图书管理系统</h2>
      <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{marginTop:'3vw', maxWidth: 600 }}
    >
       <div style={{marginTop:'-15px',marginBottom:'5px', }}>账号</div>
      <Form.Item name="admin">
        <Input />
      </Form.Item>
      <div style={{marginTop:'-15px' ,marginBottom:'5px', }}>密码</div>
      <Form.Item name="password" >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit"style={{width: 302 }}>
          登录
        </Button>

      </Form.Item>
    </Form>
    </Card>
  </Space>

  <div>
  <p style={{ marginTop:'60vh',marginLeft:'-55vw',color:'white'}}>©2023 Created by 哈尔滨埋土大学  </p>
  </div>

</div>

  );
}


export default Home