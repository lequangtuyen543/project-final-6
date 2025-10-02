import { Button, Card, Col, Form, Input, notification, Row, Select, Tag, } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Space, Typography } from 'antd';
import { getDetailJob } from "../../../services/jobsServices";
import { GoBack } from "../../../components/GoBack";
import { changeStatusCV, getDetailCV } from "../../../services/cvService";

const { Text } = Typography;

export const DetailCVAdmin = () => {
  const params = useParams();
  const [cv, setCV] = useState();
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getDetailCV(params.id);
      if (res) {
        const resJob = await getDetailJob(res.idJob);
        if (resJob) {
          setJob(resJob);
        }
        setCV(res);
      }
      changeStatusCV(params.id, {statusRead: true});
    }
    fetchApi();
  }, []);

  console.log("cv", cv);
  console.log("job", job);

  return (
    <>
      <GoBack />
      {cv && (
        <>
          <h3>Candidate Name: {cv.name}</h3>

          <div className="mb-2">
            <span>Create at: </span>
            <Text strong>{cv.createAt}</Text>
          </div>

          <div className="mb-2">
            <span>Phone: </span>
            <Text strong>{cv.phone}</Text>
          </div>

          <div className="mb-2">
            <span>Email: </span>
            <Text strong>{cv.email}</Text>
          </div>

          <div className="mb-2">
            <span>City: </span>            
              <Tag color="orange" className="mb-1">
                {cv.city}
              </Tag>
          </div>

          <div className="mb-2">
            <span>Self Description: </span>
            <Text strong>{cv.description}</Text>
          </div>

          <div className="mb-2">
            <span>Link project: </span>
            <Text strong>{cv.linkProject}</Text>
          </div>
        </>
      )}

      {job && (
        <>
          <h3>Job Name: {job.name}</h3>

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