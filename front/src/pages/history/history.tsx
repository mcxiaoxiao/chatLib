/*elsint-disable*/
import React, { FC, useState } from 'react';
import { Button, Table, Modal, Select, Input } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { CodeSandboxOutlined } from '@ant-design/icons';

const { Option } = Select;

const gradientBackground = {
  background: 'linear-gradient(to right, #8a4dff, #ff6bfe)',
  borderRadius: '20px',
  width: '97%',
  height: '120px',
  margin: '20px',
  marginTop: '10px',
  marginBottom: '30px',
  border: '1px solid #e3d4ff',
  backgroundImage: 'linear-gradient(to bottom right, #8a4dff, #ff6bfe)',
  transition: 'border-color 0.3s ease-in-out',
};

const inputStyle = {
  borderRadius: '20px',
  width: '70%',
  left:'5%',
  height: 50,
  background:'white',
  top:30,
  marginRight: '10px',
};

const buttonStyle = {
  borderRadius: '50%',
  width: 60,
  top:30,
  height: 60,
};

const History: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [datashow, setDatashow] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [text, setText] = useState('');


  const FIND = gql`
    query FindHistoryAll($pageNumber: Int!, $pageSize: Int!) {
      findHistoryAll(pageNumber: $pageNumber, pageSize: $pageSize) {
        list {
          type
          bookname
          readername
          time
        }
        totalCount
      }
    }
  `;

  const { data, loading, error } = useQuery(FIND, {
    variables: { pageNumber: 1, pageSize: `100000`},
    onCompleted(data) {
      console.log(data);
      const filteredData = data.findHistoryAll.list;
      setDatashow(filteredData);
      console.log(filteredData);
    },
    onError(error) {
      console.error(error);
    },
  });


  const columns = [
    {
      title: '书名',
      dataIndex: 'bookname',
      key: 'bookname',
    },
    {
      title: '操作名称',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作人',
      dataIndex: 'readername',
      key: 'readername',
    },
    {
      title: '操作日期',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button type='primary' >撤销操作</Button>
      ),
    },
  ];


  return (
    <div >
      <Table
        columns={columns}
        dataSource={datashow}
        loading={loading}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default History;