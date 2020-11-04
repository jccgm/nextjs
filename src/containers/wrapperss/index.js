import React from 'react'
import  Navbar  from '../../components/navbar';
import { Layout, Breadcrumb } from 'antd';
import Footerr from '../../components/footer';
const {  Content } = Layout;
const  Wrapper = ({children}) => {

  return (
    <>
    <Navbar/>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Login</Breadcrumb.Item>
        <Breadcrumb.Item>Register</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      {children}
      </div>
    </Content>
    <Footerr/>
    </>
   );
}

export default Wrapper;