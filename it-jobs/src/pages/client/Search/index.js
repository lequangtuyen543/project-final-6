import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListJobs } from "../../../services/jobsServices";
import { Tag } from "antd";
import { SearchList } from "../../../components/SearchList";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState([]);
  const citySearch = searchParams.get('city') || "";
  const keywordSearch = searchParams.get('keyword') || "";

  useEffect(() => {
    const fetchData = async () => {
      const response = await getListJobs();

      if (response) {
        const newData = response.filter((item) => {
          const city = citySearch ? item.city?.includes(citySearch) : true;
          // const keyword = keywordSearch
          //   ? item.tags?.includes(keywordSearch)
          //   : true;
          const keyword = keywordSearch
            ? item.tags?.some(tag => tag.toLowerCase().includes(keywordSearch.toLowerCase()))
            : true;

          const status = item.status; //item.status == 'true';
          return city && keyword && status;
        });
        setData(newData.reverse());
      }
    };
    fetchData();
  }, [])
  return (
    <>
      <div>
        <strong>Search Results: </strong>
        {citySearch && <Tag>{citySearch}</Tag>}
        {keywordSearch && <Tag>{keywordSearch}</Tag>}
      </div>
      {data && <SearchList data={data} />}
    </>
  );
};