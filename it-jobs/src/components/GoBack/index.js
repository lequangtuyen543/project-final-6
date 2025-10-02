import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const GoBack = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="default"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate(-1)}
    >
      Quay lại
    </Button>
  );
};
