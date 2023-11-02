/* eslint-disable */
import React, { FC, useState } from 'react';
import { Button, Table, Modal, Select, Input,InputNumber,message } from 'antd';
import { gql, useQuery,useMutation } from '@apollo/client';

const { Option } = Select;
const { Search } = Input;

const Take: FC = () => {
  //对话框*2
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [selectedTake, setSelectedTake] = useState(null);

  const [datashow, setDatashow] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

//归还时输入的日期
  const [inputValue, setInputValue] = useState(0)

  const FIND = gql`
    query findTakeAll($pageNumber: Int!, $pageSize: Int!) {
      findTakeAll(pageNumber: $pageNumber, pageSize: $pageSize) {
        list {
          takeid
          bookid
          readerid
          borrowedtime
          borrowedddl
          borroweddate
          bookname
          isreturned
        }
        totalCount
      }
    }
  `;

const BACK = gql`
mutation back($takeid: Int!) {
  back(takeid: $takeid) {
      takeid
      bookid
      readerid
      borrowedtime
      borrowedddl
      borroweddate
      bookname
      isreturned
  }
}
`;

const RENEW = gql`
mutation renew($takeid: Int!,$borrowtime: Int!) {
  renew(takeid: $takeid,borrowtime:$borrowtime) {
      takeid
      bookid
      readerid
      borrowedtime
      borrowedddl
      borroweddate
      bookname
      isreturned
  }
}
`;

  const {refetch:re, data, loading, error } = useQuery(FIND, {
    variables: { pageNumber: 1, pageSize: 100000},
    onCompleted(data) {
      console.log(data);
      const filteredData = data.findTakeAll.list.filter(take => take.isreturned == false);
      setDatashow(filteredData);
      console.log("数据请求已发送");
    },
    onError(error) {
      console.error(error);
    },
  });

  const [back] = useMutation(BACK);
  const [renew] = useMutation(RENEW);


  const columns = [
    {
      title: '书名',
      dataIndex: 'bookname',
      key: 'bookname',
    },
    {
      title: '借出日期',
      dataIndex: 'borroweddate',
      key: 'borroweddate',
    },
    {
      title: '应归还日期',
      dataIndex: 'borrowedddl',
      key: 'borrowedddl',
    },
    {
      title: '可持有时长（天）',
      dataIndex: 'borrowedtime',
      key: 'borrowedtime',
    },

    {
      title: '归还',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (

        <div>
            <Button type='primary' onClick={() => handleBack(record)}>归还</Button>
        </div>
        
      ),
    },
    {
      title: '续期',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (

        <div>
            <Button type='primary' onClick={() => handleRenew(record)}>续期</Button>
        </div>
        
      ),
    },
  ];


  //归还modal的控制
  const handleBack = (record) => {
    setSelectedTake(record);
    setModalVisible1(true);
  };

  const handleBackCancel = () => {
    setModalVisible1(false);
  };

    const handleBackTrue = async () => {
      try {
        const { data } = await back({
          variables: { 
            takeid: selectedTake.takeid
          },
        });
        if (data) {
          setModalVisible1(false);
          messageApi.open({
            type: 'success',
            content: '归还成功',
          });
          console.log("归还成功")
          re();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("归还失败")
          messageApi.open({
            type: 'error',
            content: '归还失败',
          });
        }
      }
    };



      //续期modal的控制
  const handleRenew = (record) => {
    setSelectedTake(record);
    setModalVisible2(true);
  };

  const handleRenewCancel = () => {
    setModalVisible2(false);
  };

  const time = (value) => {
    setInputValue(value);
  };

    const handleRenewTrue = async () => {
      try {
        console.log(inputValue)
        const { data } = await renew({
          variables: { 
            takeid: selectedTake.takeid
            ,borrowtime:inputValue

          },
        });
        if (data) {
          setModalVisible2(false);
          messageApi.open({
            type: 'success',
            content: '续期成功',
          });
          console.log("续期成功")
          re();
        }


      } catch (error: unknown) {
        if (error instanceof Error) {
          messageApi.open({
            type: 'error',
            content: '续期失败',
          });
          console.log("续期失败")
        }
      }
    };

  return (
    <div>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={datashow}
        loading={loading}
        pagination={{
          total: datashow?.totalCount,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} 共 ${total} 条记录`,
          pageSize: 10,
          onChange: (pageNumber) => {
            // Fetch data for the selected page
            // You can make a new GQL query here with the updated pageNumber
          },
        }}
        scroll={{ x: 'max-content' }}
      />



      <Modal
        title="归还"
        visible={modalVisible1}
        onCancel={handleBackCancel}
        footer={[
          <Button key="cancel" onClick={handleBackCancel}>
            取消
          </Button>,
          <Button key="borrow" type="primary" onClick={handleBackTrue}>
            归还
          </Button>,
        ]}
      >
        {selectedTake && (
          <div>
            <p>图书名称：{selectedTake.bookname}</p>
          </div>
        )}
      </Modal>


      <Modal
        title="续期"
        visible={modalVisible2}
        onCancel={handleRenewCancel}
        footer={[
          <Button key="cancel" onClick={handleRenewCancel}>
            取消
          </Button>,
          <Button key="borrow" type="primary" onClick={handleRenewTrue}>
            续期
          </Button>,
        ]}
      >
        {selectedTake && (
          <div>
            <p>图书名称：{selectedTake.bookname}</p>
            <InputNumber
             placeholder="想要申请的日期(天)"
             onChange={time}
             controls={true}
             size='large'
             style={{ width: 200 }}
              />
          </div>
        )}
      </Modal>



    </div>
  );
};

export default Take;