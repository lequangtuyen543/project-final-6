import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopicList } from "../../../services/topicService";
import { Col, Row } from "antd";
import { CVStatistic } from "./CVStatistic";
import { JobStatistic } from "./JobStatistic";
import { InfoCompany } from "./InfoCompany";

function Dashboard() {
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      const result = await getTopicList(`topic`);
      setTopic(result);
    }
    fetchTopic();
  }, []);

  return (
    <>
      <h1>Page Dashboard</h1>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <JobStatistic />
        </Col>
        <Col span={8}>
          <CVStatistic />
        </Col>
        <Col span={8}>
          <InfoCompany />
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;