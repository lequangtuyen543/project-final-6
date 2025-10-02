import { Button, Card, Col, Form, Input, notification, Row, Select, Tag, } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space, Typography } from 'antd';
import { getDetailJob } from "../../../services/jobsServices";
import { GoBack } from "../../../components/GoBack";

const { Text } = Typography;

export const DetailJobAdmin = () => {
  const params = useParams();
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getDetailJob(params.id);
      if (res) {
        setJob(res);
      }
    }
    fetchApi();
  }, []);

  console.log("job", job);

  return (
    <>
      <GoBack />
      {job && (
        <>
          <h1>Job Name: {job.name}</h1>

          <div className="mb-2">
            <span>Status: </span>
            {job.status ? (
              <Tag color="green">True</Tag>
            ) : (
              <Tag color="red">False</Tag>
            )}
          </div>

          <div className="mb-2">
            <span>Tags: </span>
            {job.tags.map((item, index) => (
              <Tag color="blue" className="mb-1" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-2">
            <span>Salary: </span>
            <Text strong>{job.salary}</Text>
          </div>

          <div className="mb-2">
            <span>Create at: </span>
            <Text strong>{job.createAt}</Text>
          </div>

          <div className="mb-2">
            <span>Create at: </span>
            <Text strong>{job.updateAt}</Text>
          </div>

          <div className="mb-2">
            <span>City: </span>
            {job.city && job.city.map((item, index) => (
              <Tag color="orange" className="mb-1" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-2">
            <span>Job Description: </span>
            <Text strong>{job.description}</Text>
          </div>
        </>
      )}
    </>
  );
};