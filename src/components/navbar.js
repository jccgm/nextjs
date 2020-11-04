import React from 'react'

import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

const  Navbar = () => {

  return ( 
     <>
        <Header style={{width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Link href="/" >
                  <a>
                  Home
                  </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/login" >
                  <a>
                  Login
                  </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/register" >
                  <a>
                  Register
                  </a>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
     </>
   );
}

export default Navbar;