import React from 'react';
import {gql, useQuery,useLazyQuery ,useMutation} from '@apollo/client';
import { useState,useEffect } from 'react'
import './App.css'
import { Button } from 'antd';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { Pagination , Space} from 'antd';


const GET_DATA2 = gql`
query GetUserData($skip: Int!, $take: Int!) {
  getdata(skip: $skip, take: $take) {
    id
    name
    email
    city
    country
  }
}
`;

const DEL_DATA = gql`
mutation Deleteuser($id: Int!) {
  deleteuser(id: $id) {
    name
  }
}
`;


interface DataType {
  key: React.Key;
  id:number;
  name: string;
  email:string;
  city: string;
  country:string;
}


function Table1 () {
    //页码
    const [state, setstate] = useState({

      current:1,
      datasource:[]
    });
    const pageSize = 5;
      //数据请求

  //useLazyQuery
  const [getUsers, { loading, error, data }] = useLazyQuery(
    GET_DATA2,
    {
      variables: {
        skip: (state.current - 1) * pageSize,
        take: pageSize,
      },
      
      onCompleted: () => {
        // 查询完成后更新组件的数据
        const newArray = data?.getdata.map((item: any, index: any) => 
        {
            return item;
        })      
        setstate(
          {
            current:state.current,
            datasource:newArray
          })
      }
    }
  );

    useEffect(() => {
      getUsers();
    }, [data]);

  const [deleteUser] = useMutation(DEL_DATA);

  useEffect(() => {
    getUsers();
  }, []);
  //删除函数
  const onDelete = async (id:number) => {
    try {
      const { data } = await deleteUser({
        variables: {
            id:id,
        },
        onCompleted: refreshList,
      });
      // 处理返回的数据
      console.log(data);
      await getUsers();
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  
  };



  const columns: ColumnsType<DataType> = [

    {
      title: '序号',
      dataIndex: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend'],
    },
  
    {
      title: '姓名',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
  
  
    {
      title: '邮箱',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend'],
    },
  
    {
      title: '城市',
      dataIndex: 'city',
      filters: [
        {
          text: '重庆',
          value: '重庆',
        },
        {
          text: '杭州',
          value: '杭州',
        },
        {
          text: '广州',
          value: '广州',
        }
      ],
      onFilter: (value: string, record) => record.city.indexOf(value) === 0,
    },
    {
      title: '国家',
      dataIndex: 'country',
      filters: [
        {
          text: '621',
          value: '621',
        },
        {
          text: '610',
          value: '610',
        },
      ],
      onFilter: (value: string, record) => record.country.indexOf(value) === 0,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>修改</Button>
          <Button onClick={() => onDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];




  const onChange: PaginationProps['onChange'] = (page) => {

    setstate(
      {
        current:page,
        datasource:state.datasource
      }
    );

    getUsers();
  };


    console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>错误: {error.message}</p>;

  //数据解析
  const newArray = data?.getdata.map((item: any, index: any) => 
  {
      return item;
  })      

 
  
  return(
    <div>
        <Table columns={columns} dataSource={newArray} pagination={true}/>

        <Pagination
         current={state.current} 
         onChange={onChange} 
         total={50}
         defaultPageSize={10}
         responsive={false}
          />
    </div>
  );
}

export default Table1

