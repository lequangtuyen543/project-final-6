import { Button, Card, Col, Form, Input, notification, Row, Select, Tag, } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobsByCompanyId } from "../../../services/jobsServices";
import { getDetailCompany } from "../../../services/companyService";
import { Typography } from 'antd';
import './CompanyDetail.css'
import { JobItem } from "../../../components/JobItem";
import { GoBack } from "../../../components/GoBack";

const { Text } = Typography;

export const CompanyDetail = () => {
  const params = useParams();
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const jobs = await getJobsByCompanyId(params.id);
      const infoCompany = await getDetailCompany(params.id);
      setJobs(jobs);
      setCompany(infoCompany);
    }
    fetchApi();
  }, []);

  console.log("jobs", jobs);
  console.log("company", company);

  return (
    <>
      <GoBack />

      {company && (
        <>
          <h1>{company.name}</h1>

          <div className="mb-2">
            <span>Address: </span>
            <Text strong>{company.address}</Text>
          </div>

          <div className="mb-2">
            <span>Description: </span>
            <Text>{company.description}</Text>
          </div>

          <div className="mb-2">
            <span>Email: </span>
            <Text strong>{company.email}</Text>
          </div>

          <div className="mb-2">
            <span>Phone: </span>
            <Text strong>{company.phone}</Text>
          </div>

          <div className="mb-2">
            <span>Website: </span>
            <Text type="secondary">{company.website}</Text>
          </div>
        </>
      )}

      <h4>Job List</h4>
      <Row gutter={[20, 20]}>
        {jobs && jobs.map((item, index) => (
          <Col span={8} key={index}>
            <JobItem item={item} />
          </Col>
        ))}
      </Row>

    </>
  );
};