import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getListJobs } from "../../../services/jobsServices";
import { Card } from "antd";
import { getListCV } from "../../../services/cvService";
import { getDetailCompany } from "../../../services/companyService";

export const InfoCompany = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailCompany(idCompany);
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <Card title="Info Company">
        <p>Company Name: {data?.name}</p>
        <p>Company Email: {data?.email}</p>
        <p>Company Phone: {data?.phone}</p>
        {/* <p>Company Employee: {data?.total}</p> */}
      </Card>
    </>
  );
};