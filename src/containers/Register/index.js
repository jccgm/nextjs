import React, { useState, useEffect }from 'react'
import { Form, Input, InputNumber, Button, PageHeader, notification } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const  Register = () => {
  const onFinish = values => {
    console.log(values);
  };

  const openNotification = () => {
    notification.open({
      message: 'Correct Registration',
      description:
        'the data was entered correctly',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const [mostrar, setMostrar] = useState(false);

  // useEffect( () => {
  //   
  // });
  return ( 
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{width: '500px', background: '#D8D8D8', margin: 'auto', paddingRight: '100px', marginTop: '20px'}}>

      <PageHeader  
        className="site-page-header"
        title="Register"
      />
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'apellido']} label="Apellido" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit" onClick={openNotification} >
          Register
        </Button>
      </Form.Item>
    </Form>
   );
}

export default Register;