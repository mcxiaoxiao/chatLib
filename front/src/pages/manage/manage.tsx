/* eslint-disable */
import React, { FC, useState } from 'react';
import { Button, Table, Modal, Select, Input, message,Form,InputNumber } from 'antd';
import { gql, useQuery,useMutation } from '@apollo/client';
import { CodeSandboxOutlined } from '@ant-design/icons';

import {
  PlusCircleOutlined
 
  
} from '@ant-design/icons';

const { Option } = Select;

const{TextArea} = Input;

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

const Manage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);


  const [selectedBook, setSelectedBook] = useState(null);
  const [datashow, setDatashow] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [text, setText] = useState('');


  const FIND = gql`
    query FindBookAll($pageNumber: Int!, $pageSize: Int!) {
      findBookAll(pageNumber: $pageNumber, pageSize: $pageSize) {
        list {
          bookid
          author
          level
          type
          borrowed
          isbn
          content
          libid
          name
          price
          publisher
          libname
        }
        totalCount
      }
    }
  `;

const DELETE = gql`
mutation Delete($id: Int!) {
  deleteBook(id:id) {
      bookid
      author
      level
      type
      borrowed
      isbn
      content
      libid
      name
      price
      publisher
      libname
  }
}
`;

const ADD = gql`
mutation add($book: BookEntityInput!) {
  addBook(book:$book) {
    type
    name
    author
    bookid
    level
  }
}
`;

const [del] = useMutation(DELETE);
const [add] = useMutation(ADD);





  const { refetch, data, loading, error } = useQuery(FIND, {
    variables: { pageNumber: 1, pageSize: `100000`},
    onCompleted(data) {
      console.log(data);
      const filteredData = data.findBookAll.list.filter(book => book.borrowed === false);
      setDatashow(filteredData);
      console.log(filteredData);
    },
    onError(error) {
      console.error(error);
    },
  });


  const columns = [
    
    {
      title: '图书馆名称',
      dataIndex: 'libname',
      key: 'libname',
      filters: [
        { text: '西区', value: '西区' },
        { text: '南区', value: '南区' },
      ],
      onFilter: (value, record) => record.libname === value,
      render: (text) => <span>{text}</span>,
    },
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '修改',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button type='default' onClick={() => handleAdd(record)}>修改</Button>
      ),
    },
    {
      title: '删除',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button type='default' onClick={() => handleDelete(record)}>删除</Button>
      ),
    },
  ];


  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };


  const onFinish = async (values:any) => {
    try {
      console.log("提交者")
      const { data } = await add({
        variables: {
          "book": {
            bookid: selectedBook?selectedBook.bookid:99999,
            borrowed:false,


            name:values.name,
            author:values.author,
            publisher:values.publisher,
            isbn:values.isbn,

            
            content:values.content,

            type:values.type,
            libname:values.libname,

            price:values.price,
          },
        },
      });
      // 处理返回的数据
      console.log(data);
      if(data)
      {
        setModalVisible(false);
        messageApi.open({
          type: 'success',
          content: '操作成功',
        });
        console.log("操作成功")
        refetch();

      }
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };



  const handleDeleteTrue = async () => {
    try {
      const { data } = await del({
        variables: { 
          id: selectedBook.bookid
        },
      });
      if (data) {
        setModalVisible2(false);
        messageApi.open({
          type: 'success',
          content: '删除成功',
        });
        console.log("删除成功")
        refetch();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setModalVisible2(false);
        messageApi.open({
          type: 'error',
          content: '删除失败',
        });
        console.log("删除失败")
      }
    }
  };


  const handleAdd2 = () => {
    setSelectedBook(null);
    setModalVisible(true);
  };

  const handleAdd = (record) => {
    setSelectedBook(record);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    setSelectedBook(record);
    setModalVisible2(true);
  };


  const handleAddCancel = () => {
    setModalVisible(false);
  };
  const handleDeleteCancel = () => {
    setModalVisible2(false);
  };

  return (
    <div >
{contextHolder}
      <Button       style={{marginBottom:'1vw'}}
      size="large"
      type="primary"
      onClick={() => handleAdd2()}
      ><PlusCircleOutlined />新增图书</Button>

<Button       style={{marginBottom:'1vw',marginLeft:'1vw'}}
      size="large"
      type="default"
      ><PlusCircleOutlined />批量导入</Button>

      <Table
        columns={columns}
        dataSource={datashow}
        loading={loading}
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title=""
        visible={modalVisible}
        onCancel={handleAddCancel}
        footer={[
        ]}
      >
        { (
          <div>


    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{marginTop:'3vw', maxWidth: 600 }}
    >
       <div style={{marginTop:'-20px' }}>书名:</div>
      <Form.Item name="name">
        <Input />
      </Form.Item>
      <div style={{marginTop:'-20px' }}>作者:</div>
      <Form.Item name="author" >
        <Input />
      </Form.Item>
      <div style={{marginTop:'-20px' }}>出版社:</div>
      <Form.Item name="publisher">
        <Input />
      </Form.Item>
      <div style={{marginTop:'-20px' }}>ISBN号:</div>
      <Form.Item name="isbn" >
        <Input />
      </Form.Item>

      <div style={{marginTop:'-20px' }}>图书价格:</div>
      <Form.Item 
      name="price" 
>
          <InputNumber
                       size='small'
                       style={{ width: 474 ,height:30}}
          />
        </Form.Item>

        <div style={{marginTop:'-20px' }}>图书分区:</div>
      <Form.Item name="type">
        <Select
          placeholder="选择分区"
          // onChange={}
          allowClear
        >
          <Option value="科幻">科幻</Option>
          <Option value="人物传记">人物传记</Option>
          <Option value="计算机">计算机</Option>
          <Option value="政治">政治</Option>
          <Option value="农业">农业</Option>

        </Select>
      </Form.Item>
      <div style={{marginTop:'-20px' }}>所存图书馆:</div>
      <Form.Item name="libname" >
        <Select
          placeholder="选择新书将会运送到的图书馆"
          // onChange={}
          allowClear
        >
          <Option value="西区">西区图书馆</Option>
          <Option value="南区">南区图书馆</Option>

        </Select>
      </Form.Item>
      <div style={{marginTop:'-20px' }}>图书简介:</div>

      <Form.Item name="content">
      <TextArea rows={4} placeholder="填写相关图书简介[200字内]" maxLength={200} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit"style={{marginLeft:'260px'}}>
          提交
        </Button>
        <Button htmlType="button" onClick={onReset} style={{marginLeft:'10px'}}>
          重置
        </Button>
        <Button htmlType="button" onClick={handleAddCancel} style={{marginLeft:'10px'}}>
          取消
        </Button>

      </Form.Item>
    </Form>
          </div>
        )}
      </Modal>

      <Modal
        title="删除图书"
        visible={modalVisible2}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            取消
          </Button>,
          <Button key="borrow" type="primary" onClick={handleDeleteTrue}>
            删除
          </Button>,
        ]}
      >
        {/* Modal content here */}
        {selectedBook && (
          <div>
            <p>图书名称：{selectedBook.name}</p>
            <p>你确定要删除这本图书吗?</p>
            {/* Add more book details as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Manage;
