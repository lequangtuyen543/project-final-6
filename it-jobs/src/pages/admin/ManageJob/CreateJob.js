import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import {
  Button,
  Card,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  message,
  Row,
  Segmented,
  Select,
  Space,
  Switch,
  TreeSelect,
} from 'antd';
import TextArea from "antd/es/input/TextArea";
import { getAllCity, getAllTags } from "../../../services/cityServices";
import getTimeCurrent from "../../../helpers/time";
import { createJob } from "../../../services/jobsServices";
import { getListTags } from "../../../services/tagsServices";

function CreateJob() {
  const idCompany = getCookie("id");
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListTags();
      if (res) {
        setTags(res);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCity();
      if (res) {
        setCity(res);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    values.idCompany = idCompany;
    values.createAt = getTimeCurrent();
    const res = await createJob(values);
    if (res) {
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Create job success',
        duration: 5
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Create job error',
        duration: 3
      })
    }
  };

  const tagsOptions = tags.map((tag) => {
    return {
      label: tag.name,
      value: tag.name,
    };
  });

  const cityOptions = city.map((item) => {
    return {
      label: item.value,
      value: item.key,
    };
  });

  console.log(city);

  return (
    <>
      {contextHolder}
      <Card title="Create Job">
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={{
            status: true, // mặc định bật (true)
          }}
        >
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Job Name"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item
                label="Tags"
                name="tags"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select options={tagsOptions} mode="multiple" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Salary" name="salary">
                <Input addonAfter="$"
                  type="number"
                  placeholder="0.00" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="City" name="city">
                <Select options={cityOptions} mode="multiple" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description" name="description">
                <TextArea rows={8} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default CreateJob;