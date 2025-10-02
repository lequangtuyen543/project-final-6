import { useNavigate } from "react-router-dom";
import { checkExist } from "../../../services/companyService";
import generateToken from "../../../helpers/generateToken";
import React from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { createCompany } from "../../../services/companyService";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    values.token = generateToken();

    const checkExistEmail = await checkExist("email", values.email);
    const checkExistPhone = await checkExist("phone", values.phone);

    if (checkExistEmail.length > 0) {
      messageApi["error"]("email da ton tai");
    } else if (checkExistPhone.length > 0) {
      messageApi["error"]("phone da ton tai");
    } else {
      const response = await createCompany(values);

      if (response) {
        navigate("/login");
        messageApi["success"]("dang ky thanh cong!");
      } else {
        messageApi["error"]("dang ky that bai!");
      }
    }
  }

  return (
    <>
      {contextHolder}

      <Card title="Register" style={{ width: 300, margin: "auto" }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name={"name"}
            label="Company Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email.",
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Register;