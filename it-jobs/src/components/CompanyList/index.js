import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import { Button, Card, Col, Row, Tag } from "antd";
import { Typography } from 'antd';
import { Link } from "react-router-dom";

const { Text } = Typography;

export const CompanyList = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllCompany();
      if (res) {
        setCompany(res);
      }
    }
    fetchApi();
  }, []);

  console.log(company);
  return (
    <>
      <h2>Company List</h2>
      <Row gutter={[20, 20]} className="mb-4">
        {company.map((item) => (
          <Col span={8}>
            <Card
              title={<Link to={`/company/${item.id}`}>{item.name}</Link>}
              size="small"
              style={{ height: '100%' }}
            >
              <div className="mb-2">
                <span>Address: </span>
                <Text strong color="blue">{item.address}</Text>
              </div>

              <div className="mb-2">
                <span>Email: </span>
                <Text strong color="blue">{item.email}</Text>
              </div>

              <div className="mb-2">
                <span>Phone: </span>
                <Text strong color="blue">{item.phone}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Link to="/company">
        <Button type="primary">
          View More</Button>
      </Link>

    </>
  )
}