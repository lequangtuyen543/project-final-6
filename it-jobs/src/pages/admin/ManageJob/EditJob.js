import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getListTags } from "../../../services/tagsServices";
import { getListCity } from "../../../services/cityServices";
import getTimeCurrent from "../../../helpers/time";
import { updateJob } from "../../../services/jobsServices";
import {
  Button,
  Modal,
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

export const EditJob = (props) => {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListTags();
      if (res) {
        setTags(res);
      }
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListCity();
      if (res) {
        setCity(res);
      }
    }
    fetchApi();
  }, []);

  const handleOk = async (values) => {
    values.updateAt = getTimeCurrent();
    const res = await updateJob(record.id, values);
    if (res) {
      setIsModalOpen(false);
      onReload();
      messageApi.open({
        type: 'success',
        content: 'Edit job success',
        duration: 5
      });
    } else {
      messageApi.open({
        type: 'error',
        content: 'Edit job error',
        duration: 3
      })
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   if (isModalOpen) {
  //     form.setFieldsValue(record);
  //   }
  // }, [record, isModalOpen]);  

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

  console.log("record", record);

  return (
    <>
      {contextHolder}
      <Button variant='outlined' color='blue' icon={<EditOutlined />} onClick={showModal} />

      <Modal
        title="Edit Job"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Form
          form={form}
          onFinish={handleOk}
          layout="vertical"
          initialValues={record}
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
      </Modal>
    </>
  )
}