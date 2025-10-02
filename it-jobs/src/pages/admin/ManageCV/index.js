import { Button } from 'antd';
import { PlusOutlined } from "@ant-design/icons"
import { CVList, JobList } from "./CVList";
import { Link } from "react-router-dom";

function ManageCV() {

  return (
    <>
      <h1 >CV List</h1>
      
      <div className='mt-2'>
        <CVList />
      </div>
    </>
  );
};

export default ManageCV;