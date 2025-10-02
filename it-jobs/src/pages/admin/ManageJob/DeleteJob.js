import { Button, message, Popconfirm, Tooltip } from "antd"
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteJob } from "../../../services/jobsServices";

export const DeleteJob = (props) => {
  const { record, onReload } = props;

  const confirm = async () => {
    const res = await deleteJob(record.id);
    if (res) {
      onReload();
    }
  };

  const cancel = e => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />}></Button>
      </Popconfirm>
    </>
  )
}