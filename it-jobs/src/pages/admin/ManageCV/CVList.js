import { Button, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getCookie } from '../../../helpers/cookie';
import { getListJobs } from '../../../services/jobsServices';
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteJob } from './DeleteJob';
import { Link } from 'react-router-dom';
import { getListCV } from '../../../services/cvService';
import { CVJobName } from './CVJobName';

export const CVList = (props) => {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const [cv, setCV] = useState([]);  
  const [job, setJob] = useState();

  const fetchApi = async () => {
    const res = await getListCV();
    if (res) {
      setCV(res.reverse());
    }
  }

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  }

  const columns = [
    {
      title: 'Job',
      dataIndex: 'idJob',
      key: 'idJob',
      render: (text, record) => <CVJobName record={record} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    // },
    {
      title: 'Create at',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Status read',
      dataIndex: 'statusRead',
      key: 'statusRead',
      render: (statusRead) => (
        statusRead ? (
          <Tag color="green">Read</Tag>
        ) : (
          <Tag color="red">Unread</Tag>
        )
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Link to={`/admin/detail-cv/${record.id}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
          <DeleteJob record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  console.log("cv", cv);

  return (
    <>
      <Table columns={columns} dataSource={cv} rowKey="id" />;
    </>
  );
};