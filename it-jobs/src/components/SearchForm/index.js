import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import { getAllCity } from "../../services/cityServices"

export const SearchForm = () => {
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllCity();

      if (response) {
        const objAll = {
          key: '0',
          value: "All",
        };
        setCity([objAll, ...response]);
      }
    }
    fetchApi();
  }, []);

  const cityOptions = city.map((item) => ({
    value: item.value,
    label: item.value,
  }));

  const onFinish = values => {
    console.log('Success:', values);
    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    navigate(`/search?city=${city}&keyword=${values.keyword || ""}`);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <h1 className="mb-2">100+ IT Jobs For Developers</h1>
      {city && (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[12, 12]}>
            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="city">
                <Select options={cityOptions} placeholder="Select city" />
              </Form.Item>
            </Col>

            <Col xxl={15} xl={15} lg={15}>
              <Form.Item name="keyword">
                <Input placeholder="Enter keyword..." />
              </Form.Item>
            </Col>

            <Col xxl={3} xl={3} lg={3}>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}