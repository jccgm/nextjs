import React, { useState, useEffect } from "react";
import IntlMessages from "@utils/IntlMessages";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/router";

const url = 'https://jsonplaceholder.typicode.com';


export function FormPost({ inModal, type = 'add', inEdit, saveEdit, saveCreate }) {
  const [state, setState] = useState({ users: [] });
  const [form] = Form.useForm();

  const router = useRouter();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    if (inModal) {
      saveEdit(values);
      return;
    }
    saveCreate(values);
    form.resetFields();
  };

  useEffect(() => {
    fieldFilling();
  }, [inEdit]);

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${url}/users`);
      const users = await response.json();

      setState({ ...state, users })
    } catch { }
  }

  const fieldFilling = () => {
    if (inModal) {
      form.setFieldsValue(({ ...inEdit, id: inEdit.key }));
    }
  }

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="gx-signin-form gx-form-row0"
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Este no es un id valido",
          },
        ]}
        name="userId"
      >
        <Select placeholder="Seleccione el usuario" >
          {state.users.length > 0
            ? state.users.map(({ id, name }) =>
              <Select.Option key={id} value={id}>{name}</Select.Option>)
            : ''
          }
        </Select>
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Por favor ingresa tu title",
          },
        ]}
        name="title"
      >
        <Input placeholder="Titulo" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Por favor ingresa el contenido",
          },
        ]}
        name="body"
      >
        <Input.TextArea placeholder="Contenido" />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button block type="primary" className="gx-mb-0" htmlType="submit">
          <IntlMessages id={`button.${type}`} />
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormPost;
