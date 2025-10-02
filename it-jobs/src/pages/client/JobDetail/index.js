import { Button, Card, Col, Form, Input, notification, Row, Select, Tag, } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../services/jobsServices";
import { getDetailCompany } from "../../../services/companyService";
import { GoBack } from "../../../components/GoBack";
import { Space, Typography } from 'antd';
import './JobDetail.css'
import getTimeCurrent from "../../../helpers/time";
import { createCV } from "../../../services/cvService";

const { Text } = Typography;

export const JobDetail = () => {
  const params = useParams();
  const [job, setJob] = useState();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const rules = [{ required: true, message: 'Please input your information!' }]

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailJob(params.id);
      const infoCompany = await getDetailCompany(params.id);
      const dataFinal = {
        ...response,
        infoCompany: infoCompany,
      }
      setJob(dataFinal);
    }
    fetchApi();
  }, []);

  const onFinish = async values => {
    console.log('Success:', values);
    values.idJob = job.id;
    values.idCompany = job.infoCompany.id;
    values.createAt = getTimeCurrent();

    const response = await createCV(values);
    
    if (response) {
      form.resetFields();
      api['success']({
        message: 'Success',
        description: 'Create CV successfully',
      });
    } else {
      api['error']({
        message: 'Error',
        description: 'Create CV failed',
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  console.log("job", job);

  return (
    <>
      {contextHolder}
      <GoBack />
      {job && (
        <>
          <h1>{job.name}</h1>

          <Button
            href="#formApply"
            type="primary"
            size="large"
            className="mb-4"
          >
            APPLY NOW
          </Button>

          <div className="mb-2">
            <span>Tags: </span>
            {job.tags.map((item, index) => (
              <Tag color="blue" className="mb-1" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-2">
            <span>City: </span>
            {job.city.map((item, index) => (
              <Tag color="orange" className="mb-1" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-2">
            <span>Salary: </span>
            <Text strong>{job.salary}</Text>
          </div>

          <div className="mb-2">
            <span>Company: </span>
            <Text strong>{job?.infoCompany?.name}</Text>
          </div>

          <div className="mb-2">
            <span>Address: </span>
            <Text strong>{job?.infoCompany?.address}</Text>
          </div>

          <div className="mb-2">
            <span>Create at: </span>
            <Text strong>{job.createAt}</Text>
          </div>

          <div className="mb-2">
            <span>Job Description: </span>
            <Text strong>{job.description}</Text>
          </div>

          <div className="mb-2">
            <span>Company Description: </span>
            <Text strong>{job?.infoCompany?.description}</Text>
          </div>

          <Card title="APPLY NOW" id="formApply">
            <Form
              name="form_apply"
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Row gutter={[20, 20]}>
                <Col span={6}>
                  <Form.Item label="Name" name="name" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Phone" name="phone" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="City" name="city" rules={rules}>
                    <Select
                      placeholder="Select city"
                      options={job.city.map((item, index) => ({
                        value: item,
                        label: item,
                        key: index,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Self description"
                    name="description"
                    rules={rules}
                  >
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Link project"
                    name="linkProject"
                    rules={rules}
                  >
                    <Input.TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Send Request
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
};