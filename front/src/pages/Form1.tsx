/* eslint-disable */

import React from 'react';
import { Button, Form, Input,InputNumber, Select } from 'antd';
import { gql, useMutation } from '@apollo/client';
const { Option } = Select;



//增加一条记录的变更字段
const CREATE_USER = gql`
mutation CreateUser($input: UserInput) {
  createuser(input: $input) {
    id
    name
    email
    city
    country
  }
}
`;


//样式
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const lout = {
  labelCol: { span: -1 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};


const App: React.FC = () => {



  //useForm的使用
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({id: 5, name: "王光耀" ,email:"23333@163.com",city:"枣庄",country:"中国"});
  };




  const [createUser] = useMutation(CREATE_USER);


  const onFinish = async (values:any) => {
    try {
      const { data } = await createUser({
        variables: {
          input: {
            id:values.id,
            name:values.name,
            email:values.email,
            city:values.city,
            country:values.country,
          },
        },
      });
      // 处理返回的数据
      console.log(data);
    } catch (error) {
      // 处理错误
      console.error(error);
    }
  };




  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >

      {/* 输入ID */}
      <Form.Item 
      label="ID" 
      name="id" 
      rules={[{required:true,message:'缺少必填项'},{pattern:new RegExp(/^[1-9]\d*$/, "g"),message:'只能填写正数'}]}>
          
          <InputNumber
                {...lout}  />
        </Form.Item>


      <Form.Item name="name" label="姓名" rules={[{ required: true ,message:'缺少必填项'}]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="邮箱" rules={[{ required: true,message:'缺少必填项' }]}>
        <Input />
      </Form.Item>


      <Form.Item name="city" label="城市" rules={[{ required: true,message:'缺少必填项' }]}>
        <Select
          placeholder="填写你的所在城市"
          // onChange={}
          allowClear
        >
          <Option value="枣庄">枣庄</Option>
          <Option value="杭州">杭州</Option>
          <Option value="重庆">重庆</Option>
          <Option value="宁波">宁波</Option>
          <Option value="哈尔滨">哈尔滨</Option>
        </Select>
      </Form.Item>


      <Form.Item name="country" label="国家" rules={[{ required: true ,message:'缺少必填项'}]}>
        <Select
          placeholder="填写你的所在国籍"
          // onChange={}
          allowClear
        >
          <Option value="中国">中国</Option>
          <Option value="美国">美国</Option>

        </Select>
      </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          脸滚键盘
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;