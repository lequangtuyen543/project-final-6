import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import { Col, Row } from 'antd'
import { JobItem } from "../JobItem";

export const SearchList = (props) => {
  const { data = [] } = props;
  const [dataFinal, setDataFinal] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const company = (await getAllCompany()) || [];

      const newData = data.map((item) => {
        const infoCompany = company.find(
          (itemCompany) => itemCompany.id == item.idCompany
        );
        return {
          ...item,
          infoCompany: infoCompany || null,
        };
      });
      setDataFinal(newData);
    };
    fetchApi();
  }, [data]);

  console.log(dataFinal);

  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {dataFinal.map((item) => (
              <Col span={8} key={item.id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="mt-20">No Result</div>
      )}
    </>
  );
};  