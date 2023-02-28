import React from 'react'
import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LoginFormProps } from 'types'
import { SubmitButton } from 'unauthenticated-app'

export default function Login() {
  const { login } = useAuth()

  const handleSubmit = (form: LoginFormProps) => {
    login(form)
  }

  return (
    <div>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name={'username'}
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            placeholder="用户名"
            autoComplete="off"
            type="text"
            name="username"
          />
        </Form.Item>
        <Form.Item
          name={'password'}
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            placeholder="密码"
            autoComplete="off"
            type="password"
            name="password"
          />
        </Form.Item>
        <Form.Item>
          <SubmitButton type="primary" htmlType={'submit'}>
            注册
          </SubmitButton>
        </Form.Item>
      </Form>
    </div>
  )
}
