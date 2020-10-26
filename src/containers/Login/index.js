import React, { useState, useEffect } from 'react'

import { Form, Input, Button, Checkbox, PageHeader,notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
const  Login = () => {


  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const openNotification = () => {
    notification.open({
      message: 'sign in ',
      description:
        'login successfully.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const [mostrar, setMostrar] = useState({
    username: ' ',
    password: ' ',
  });
 
  useEffect( () => {
   console.log(mostrar)
  });
  

  return ( 
    <>
         <Form style={{ background: '#D8D8D8', width: '500px', margin: 'auto ', padding: '10px', marginTop: '10px'} }
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              >
              <PageHeader  
              className="site-page-header"
              title="Login"
              />
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username o Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item  style={{ display: 'flex'} } >
                <Button type="primary" htmlType="submit" style={{width: '50%'}} onClick={openNotification}>
                  Log in
                </Button>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: '100px'} }>
                <Link href="/register" >
                    <a>
                    register now
                    </a>
                </Link>
                
                </Button> 
              </Form.Item>
          </Form>
    </>
   );
}

export default Login;