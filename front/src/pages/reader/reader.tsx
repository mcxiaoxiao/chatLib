/* eslint-disable */

import React from 'react';
import { useState,useEffect,FC } from 'react'
import { Button } from 'antd';
import { Table, Card } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { Pagination , Space} from 'antd';
import { Outlet,useNavigate } from 'react-router-dom';


import {userID} from '../../recoil/store'
import { useRecoilState } from 'recoil';


import {gql, useQuery,useLazyQuery ,useMutation} from '@apollo/client';



const FIND = gql`
query FindReader($readerid: Int!) {
  findReaderById( readerid: $readerid) {
    readername
    readertype
    readersex
    email
    admin
    password
    role
  }
}
`;

const Reader:FC=()=>{

  const nav = useNavigate()

  function nav0(){
    nav('/');
}

const [uID, setID] = useRecoilState(userID);


  const {refetch:re, data, loading, error } = useQuery(FIND, {
    variables: { readerid: uID},
    onCompleted(data) {
      console.log(data);
      console.log("数据请求已发送");
    },
    onError(error) {
      console.error(error);
    },
  });



  const handleID = () => {
    setID(1);
  };

  const handleID2 = () => {
    setID(0);
  };

  const handleback = () => {
    nav0()
  };


  return (
<div style={{width:'100vw',marginLeft:'-1vw',marginTop:'-4vh',background:'#f5f5f5',height:'100vh'}}>

<Space direction="vertical" size={16}>
    <Card size="default" 
     style={{ width: 400 ,marginLeft:'27vw',marginTop:'-20vh'}}>
      <h2 style={{ marginTop:'-1vh',marginLeft:'8vw'}}>个人信息</h2>


      {(data)&&(<div>
        <p>姓名: {data.findReaderById.readername}</p>
        <p>身份: {data.findReaderById.readertype}</p>
      <p>性别: {data.findReaderById.readersex}</p>
      <p>邮箱: {data.findReaderById.email}</p>
      <p>账号: {data.findReaderById.admin}</p>
      <p>密码: {data.findReaderById.password}</p>
      </div>
      )}
              <Button type="default" htmlType="submit"style={{marginTop:'2vh',width: 350 }}>
          修改信息
        </Button>
        <Button type="primary" htmlType="submit"style={{marginTop:'3vh',width: 350 }} onClick={handleback}>
          切换账号
        </Button>

    </Card>
  </Space>

</div>

  );
}


export default Reader