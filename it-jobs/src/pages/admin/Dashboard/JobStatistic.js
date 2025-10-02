import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getListJobs } from "../../../services/jobsServices";
import { Card } from "antd";

export const JobStatistic = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListJobs(idCompany);
      if (res) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        obj.total = res.length;
        res.forEach((item) => {
          item.status ? obj.statusTrue++ : obj.statusFalse++
        })
        setData(obj);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <Card title="Job">
        <p>Job Total: {data?.total}</p>
        <p>Job Status True: {data?.statusTrue}</p>
        <p>Job Status False: {data?.statusFalse}</p>
      </Card>
    </>
  );
};