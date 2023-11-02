/* eslint-disable */
import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Select,
  Input,
  Progress,
  message,
  Tag,
} from "antd";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FileSearchOutlined } from "@ant-design/icons";

const { Option } = Select;
const BORROW_BOOK_MUTATION = gql`
  mutation BorrowBook($bookid: Int!, $readerid: Int!, $borrowtime: Int!) {
    borrow(bookid: $bookid, readerid: $readerid, borrowtime: $borrowtime) {
      borrowedddl
      borrowedtime
      bookid
    }
  }
`;

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

const Book: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [datashow, setDatashow] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [dataall, setDataAll] = useState([]);
  const [text, setText] = useState("");
  const [proval, setProval] = useState(-50);
  const [inputWidth, setInputWidth] = useState("30%");
  const [loading, setLoading] = useState(false);
  const [borrowBook, { data: databo }] = useMutation(BORROW_BOOK_MUTATION);
  const {
    data,
    loading: queryLoading,
    error,
    refetch,
  } = useQuery(FIND, {
    variables: { pageNumber: 1, pageSize: 100000 },
    onCompleted(data) {
      console.log(data);
      const filteredData = data.findBookAll.list.filter(
        (book) => book.borrowed === false
      );
      setDataAll(filteredData);
      setDatashow(filteredData);
      console.log(filteredData);
    },
    onError(error) {
      console.error(error);
    },
  });

  const gradientBackground = {
    background: "#f5f5fd",
    borderRadius: "20px",
    width: "97%",
    height: "120px",
    margin: "20px",
    marginTop: "10px",
    marginBottom: "30px",
    backgroundImage: "#f5f5fd",
    transition: "border-color 0.3s ease-in-out",
  };

  const inputStyle = {
    borderRadius: "20px",
    width: inputWidth,
    left: "5%",
    height: 50,
    background: "white",
    top: 33,
    marginRight: "10px",
  };

  const buttonStyle = {
    borderRadius: "50%",
    width: 50,
    marginLeft: "60px",
    top: 33,
    height: 50,
  };

  useEffect(() => {
    if (proval < 50) {
      function increaseProval() {
        setProval(proval + 2);
      }
      const timer = setInterval(increaseProval, 10);
      // 清除定时器
      return () => clearInterval(timer);
    }
    if (proval < 40) {
      function increaseProval() {
        setProval(proval + 1);
      }
      const timer = setInterval(increaseProval, 100);
      // 清除定时器
      return () => clearInterval(timer);
    }
    if (proval < 99) {
      function increaseProval() {
        setProval(proval + 1);
      }
      const timer = setInterval(increaseProval, 700);
      // 清除定时器
      return () => clearInterval(timer);
    }
  }, [proval]);

  const handleAsk = async () => {
    if (text == "") {
      setDatashow(dataall);
    } else {
      setProval(0);
      setLoading(true);
      setInputWidth("30%");

      const response1 = await fetch("http://129.211.220.168:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const response2 = await fetch("http://129.211.220.168:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response1.ok) {
        setProval(100);
        setLoading(false);
        messageApi.open({
          type: "error",
          content: "服务器出错",
        });
        throw new Error("Network response was not ok");
      } else {
        messageApi.open({
          type: "success",
          content: "查询成功✌",
        });
        setProval(100);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      }
      const data1 = await response1.json();
      const data2 = await response2.json();
      console.log("LLM");
      var newData1 = [];
      for (var i = 0; i < data1.LLM.length; i++) {
        var item = data1.LLM[i];
        var newItem = {
          author: item.metadata.author,
          bookid: item.metadata.bookid,
          borrowed: false,
          content: item.page_content,
          isbn: item.metadata.ISBN,
          libname: item.metadata.libname,
          name: item.metadata.name,
          publisher: item.metadata.publisher,
          type: item.metadata.type,
        };
        newData1.push(newItem);
      }
      console.log(newData1);

      console.log("MMR");
      var newData2 = [];
      for (var i = 0; i < data2.MMR.length; i++) {
        var item = data2.MMR[i];
        var newItem = {
          author: item.metadata.author,
          bookid: item.metadata.bookid,
          borrowed: false,
          content: item.page_content,
          isbn: item.metadata.ISBN,
          libname: item.metadata.libname,
          name: item.metadata.name,
          publisher: item.metadata.publisher,
          type: item.metadata.type,
        };
        newData2.push(newItem);
      }
      console.log(newData2);

      var mergedData = [...newData1, ...newData2];
      var uniqueData = mergedData.reduce((acc, item) => {
        if (!acc.find((el) => el.bookid === item.bookid)) {
          acc.push(item);
        }
        return acc;
      }, []);

      // 在 newData1 的数据前面添加 ai 字段
      var finalData = uniqueData.map((item) => {
        if (newData1.find((el) => el.bookid === item.bookid)) {
          item.ai = true;
        }
        return item;
      });

      console.log(finalData);
      setDatashow(finalData);
    }
  };

  const handleInputChange = (e) => {
    setInputWidth(e.target.value ? "60%" : "30%");
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleSetBorrow = async () => {
    console.log(selectedBook.bookid);
    try {
      const response = await borrowBook({
        variables: {
          bookid: selectedBook.bookid,
          readerid: 10086,
          borrowtime: 30,
        },
      });
      
      setModalVisible(false);
      message.success("借阅成功🥰 归还期限：" + response.data.borrow.borrowedddl);
      // 在这里处理返回的数据
      refetch();
      console.log(response);
    } catch (error) {
      // 在这里处理错误
      console.error(error);
    }
    
  };

  const columns = [
    {
      title: "书名",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span>
          {record.ai && (
            <Tag color="cyan" style={{ marginRight: 10 }}>
              {" "}
              AI推荐
            </Tag>
          )}
          {text}
        </span>
      ),
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "出版社",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "图书馆名称",
      dataIndex: "libname",
      key: "libname",
      filters: [
        { text: "西区", value: "西区" },
        { text: "南区", value: "南区" },
      ],
      onFilter: (value, record) => record.libname === value,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "操作",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Button type="primary" onClick={() => handleBorrow(record)}>
          借阅
        </Button>
      ),
    },
  ];

  const handleBorrow = (record) => {
    setSelectedBook(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {contextHolder}
      <div style={gradientBackground}>
        <Input
          onChange={handleInputChange}
          style={inputStyle}
          placeholder="😄 告诉我你想要的书 📕"
          disabled={loading}
        />
        <Button
          style={buttonStyle}
          type="primary"
          shape="circle"
          icon={<FileSearchOutlined />}
          loading={loading}
          disabled={loading}
          onClick={handleAsk}
        />
        {loading && (
          <Progress
            percent={proval}
            size={[400, 15]}
            style={{ position: "relative", left: 42, width: "40vw", top: 32 }}
          />
        )}
      </div>

      <Table
        columns={columns}
        dataSource={datashow}
        loading={queryLoading}
        scroll={{ x: "max-content" }}
      />

      <Modal
        title="借阅图书"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            取消
          </Button>,
          <Button key="borrow" type="primary" onClick={handleSetBorrow}>
            借阅
          </Button>,
        ]}
      >
        {/* Modal content here */}
        {selectedBook && (
          <div>
            <p>图书ID：{selectedBook.bookid}</p>
            <p>图书名称：{selectedBook.name}</p>
            <p>图书作者：{selectedBook.author}</p>
            <p>图书介绍：{selectedBook.content}</p>
            <p>馆藏位置：{selectedBook.libname}</p>
            <p>ISBN：{selectedBook.isbn}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Book;
