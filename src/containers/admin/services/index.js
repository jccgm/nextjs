import React, { memo, useState, useEffect } from 'react';
import { Modal, Button, Breadcrumb, Row, Col, message, Spin } from 'antd';
import Link from '@components/AppLink';
import { useRouter } from 'next/router';

import FormPost from './components/FormPost';
import IntlMessages from "@utils/IntlMessages";
import PostsTable from './components/PostsTable';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { StatusCode } from 'react-stickynode';

const url = 'https://jsonplaceholder.typicode.com';

const initialState = {
  openModal: false,
  currentEdit: {},
  posts: [],
  loading: false
}

export function IndexPage() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleOpenModal = (post) => {
    setState({ ...state, openModal: true, currentEdit: post })
  }

  const handleDeleteModal = (id) => {
    Modal.confirm({
      title: 'Esta seguro de eliminar este post',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Si',
      cancelText: 'No',
      // delete post by id
      async onOk() {
        await fetch(`${url}/posts/${id}`, { method: 'DELETE' });

        setState({
          ...state,
          posts: state.posts.filter(({ id: idTarget }) => idTarget !== id)
        });

        message.success('Se Elimino exitosamente')
      }
    })
  }

  const editPost = async (values) => {
    try {
      const response = await fetch(`${url}/posts/${state.currentEdit.key}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      const editPost = await response.json();

      setState({
        ...state,
        posts: state.posts.map(item => {
          if (item.id === editPost.id) {
            return ({
              ...editPost
            });
          }
          return item;
        }),
        openModal: false
      });

      message.success('Se edito exitosamente')
    } catch { }
  }

  const getAllPosts = async () => {
    try {
      setState({ ...state, loading: true });

      const response = await fetch(`${url}/posts`);
      const posts = await response.json();

      setState({ ...state, posts, loading: false })
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
              Publicaciones
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={6} md={{ span: 4 }} >
          <Button
            block
            type="primary"
            className="gx-mb-0"
            htmlType="submit"
            onClick={() => router.push('/admin/videos/add')}
            icon={<i className="icon icon-add" style={{ marginRight: 5, verticalAlign: 'inherit' }}></i>}
          >
            <IntlMessages id="button.add" />
          </Button>
        </Col>
      </Row>
      <Spin spinning={state.loading} >
        <PostsTable
          onEdit={handleOpenModal}
          onDelete={handleDeleteModal}
          posts={state.posts}
        />
      </Spin>
      <Modal
        visible={state.openModal}
        title="Editar post"
        onCancel={() => setState({ ...state, openModal: false })}
        footer={''}
      >
        <FormPost
          saveEdit={editPost}
          type='modify'
          inModal
          inEdit={state.currentEdit}
        />
      </Modal>
    </>
  )
}

IndexPage.propTypes = {

}

export default memo(IndexPage)
