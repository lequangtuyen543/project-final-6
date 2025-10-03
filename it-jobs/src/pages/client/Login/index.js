import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginCompany } from "../../../services/companyService";
import React, { useState } from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { setCookie } from "../../../helpers/cookie";
import { checkAuthen } from "../../../actions/auth";
import { checkLogin } from "../../../actions/login";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadings, setLoadings] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoadings(true);
      const data = await loginCompany(values.email, values.password);

      console.log(data);

      if (data.length > 0) {
        const time = 1;

        setCookie("id", data[0].id, time);
        setCookie("companyName", data[0].companyName, time);
        setCookie("email", data[0].email, time);
        setCookie("token", data[0].token, time);

        dispatch(checkLogin(true));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        messageApi["error"]("tk hoac mk khong dung");
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Có lỗi xảy ra. Vui lòng thử lại!',
      });
      console.error(error);
    } finally {
      setLoadings(false);
    }

  }

  return (
    <>
      {contextHolder}

      <Card title="Login" style={{ width: 300, margin: "auto" }}>
        <Form layout="vertical" onFinish={onFinish}>

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
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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