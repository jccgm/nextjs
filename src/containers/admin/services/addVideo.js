import React, { memo } from 'react';
import { message, Breadcrumb, Row, Col } from 'antd';

import Link from '@components/AppLink';
import FormPost from './components/FormPost';
import PropTypes from 'prop-types';


const url = 'https://jsonplaceholder.typicode.com';

export function AddVideos() {

  const createPost = async (values) => {
    try {
      const response = await fetch(`${url}/posts`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      const createPost = await response.json();
      console.log(createPost);
      message.success('Se creo el Post exitosamente');
    } catch { }
  }


  return (
    <>
      <Row align="middle" justify="space-between" style={{ marginBottom: 15 }}>
        <Col span={8}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/admin">
                Inicio
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/admin/videos">
                Publicaciones
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Agregar
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row justify='center'>
        <Col span={16}>
          <h1 style={{ margin: '25px 0', textAlign: "center" }}>Agregar una nueva Publicacion</h1>
          <FormPost saveCreate={createPost} />
        </Col>
      </Row>
    </>
  )
}

AddVideos.propTypes = {

}

export default memo(AddVideos)
