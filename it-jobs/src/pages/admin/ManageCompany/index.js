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
  Row,
  Segmented,
  Select,
  TreeSelect,
} from 'antd';
import { editCompany, getDetailCompany } from "../../../services/companyService";
import TextArea from "antd/es/input/TextArea";

function ManageCompany() {
  const idCompany = getCookie("id");
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const res = await getDetailCompany(idCompany);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Cập nhật lại form khi data thay đổi
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    console.log(values);
    const res = await editCompany(idCompany, values);
    if (res) {
      alert("Edit company success");
      fetchData();
      setIsEdit(false);
    }
  };

  const handleEdit = async (values) => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.setFieldsValue(data); // quay lại dữ liệu cũ
  };

  console.log(data);

  return (
    <>
      <Card
        title="Info Company"
        extra={
          !isEdit ? (
            <Button type="primary" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
          )
        }
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          // initialValues={data}
          disabled={!isEdit}
        >
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Quantity People" name="quantityPeople">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Working Time" name="workingTime">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Website" name="website">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Short Description" name="description">
                <TextArea rows={4} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Detail Description" name="detailDescription">
                <TextArea rows={8} />
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

export default ManageCompany;