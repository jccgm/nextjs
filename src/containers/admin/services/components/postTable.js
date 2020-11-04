import React, { useState, useEffect } from "react";
import IntlMessages from "@utils/IntlMessages";
import { Table, Space } from "antd";

export function PostsTable({ onEdit, onDelete, posts }) {
  const [columns, setColumns] = useState([]);

  const setTableColumns = () => {
    const columns = [
      {
        title: 'Autor',
        dataIndex: 'userId',
        key: 'userId',
        align: 'center',
        width: '10%'
      },
      {
        title: 'Titulo',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
        width: '30%'
      },
      {
        title: 'Contenido',
        dataIndex: 'body',
        key: 'body',
        width: '50%',
        ellipsis: true
      },
      {
        title: 'Acciones',
        key: 'action',
        align: 'right',
        width: '10%',
        render: (text, post) => (
          <Space size="middle">
            <i
              className="icon icon-edit"
              title="Editar"
              style={{ fontSize: 20, cursor: 'pointer' }}
              onClick={onEdit.bind(this, post)}
            ></i>
            <i
              className="icon icon-close-circle"
              title="Eliminar"
              style={{ fontSize: 20, cursor: 'pointer' }}
              onClick={onDelete.bind(this, post.key)}
            ></i>
          </Space>
        )
      },
    ]

    return columns;
  }

  useEffect(() => {
    const columns = setTableColumns();
    setColumns(columns);
  }, [posts]);


  if (posts.length > 0) {
    return (
      <Table
        title={() => <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Tabla de Publicaciones</h1>}
        pagination={{ position: ["bottomCenter"] }}
        columns={columns}
        dataSource={posts.map(({ id: key, ...item }) => ({ key, ...item }))}
      />
    )
  }
  return <></>
}

export default PostsTable;
