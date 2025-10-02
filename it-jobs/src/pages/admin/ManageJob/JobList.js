import { Button, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getCookie } from '../../../helpers/cookie';
import { getListJobs } from '../../../services/jobsServices';
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DeleteJob } from './DeleteJob';
import { EditJob } from './EditJob';
import { Link } from 'react-router-dom';

export const JobList = (props) => {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const [jobs, setJobs] = useState([]);

  const fetchApi = async () => {
    const res = await getListJobs();
    if (res) {
      setJobs(res.reverse());
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            return (
              <Tag color="blue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Create at',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Update at',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        status ? (
          <Tag color="green">True</Tag>
        ) : (
          <Tag color="red">False</Tag>
        )
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Link to={`/admin/detail-job/${record.id}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
          <EditJob record={record} onReload={handleReload} />
          <DeleteJob record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  console.log(jobs);

  return (
    <>
      <Table columns={columns} dataSource={jobs} rowKey="id" />;
    </>
  );
};