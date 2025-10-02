import { Card, Tag } from "antd";
import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd';

const { Text } = Typography;

export const JobItem = (props) => {
  const { item } = props;

  console.log(item);
  return (
    <>
      <Card
        title={<Link to={`/job/${item.id}`}>{item.name}</Link>}
        size="small"
        style={{height: '100%'}}
      >
        <div className="mb-2">
          <span>Tags: </span>
          {item.tags.map((item, index) => (
            <Tag color="blue" className="mb-1" key={index}>{item}</Tag>
          ))}
        </div>

        <div className="mb-2">
          <span>City: </span>
          {item.city && item.city.map((item, index) => (
            <Tag color="orange" className="mb-1" key={index}>{item}</Tag>
          ))}
        </div>

        <div className="mb-2">
          <span>Salary: </span>
          <Text strong>{item.salary}</Text>
        </div>

        <div className="mb-2">
          <span>Company: </span>
          <Text strong>{item?.infoCompany?.name}</Text>
        </div>

        <div className="mb-2">
          <span>Create at: </span>
          <Text strong>{item.createAt}</Text>
        </div>
      </Card>
    </>
  );
};