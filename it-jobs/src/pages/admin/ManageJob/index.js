import { Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons"
import { JobList } from "./JobList";
import { Link } from "react-router-dom";

function ManageJob() {

  return (
    <>
      <h1 >Job List</h1>
      <Link to="/admin/create-job" className='mb-4'>
        <Button icon={<PlusOutlined />}>Create Job</Button>
      </Link>
      <div className='mt-2'>
        <JobList />
      </div>
    </>
  );
};

export default ManageJob;