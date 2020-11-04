import React from "react";
import { Form, Input, InputNumber, Button, PageHeader, notification } from 'antd';
import Link from 'next/link';

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
const RecordarContrasena = () => {

  const onFinish = values => {
    console.log(values);
  };
    return ( 
       <>
       <div {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{background: '#d0d0d0', padding: '20px', width: '50%', margin: 'auto', marginTop: '10px'}}>
          <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item  style={{ display: 'flex'} } >
            <Button type="primary" htmlType="submit" style={{width: '50%'}}>
            <Link href="" >
                <a>
                Submit
                </a>
            </Link>
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginLeft: '100px'} }>
            <Link href="" >
                <a>
                To Return
                </a>
            </Link>
            </Button> 
          </Form.Item>
       </div>
       </>
    )

}


export default RecordarContrasena;