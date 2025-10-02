import { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getListJobs } from "../../../services/jobsServices";
import { Card } from "antd";
import { getListCV } from "../../../services/cvService";

export const CVStatistic = () => {
  const idCompany = getCookie("id");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListCV(idCompany);
      if (res) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        obj.total = res.length;
        res.forEach((item) => {
          item.statusRead ? obj.statusTrue++ : obj.statusFalse++
        })
        setData(obj);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <>
      <Card title="CV">
        <p>CV Total: {data?.total}</p>
        <p>CV Status True: {data?.statusTrue}</p>
        <p>CV Status False: {data?.statusFalse}</p>
      </Card>
    </>
  );
};