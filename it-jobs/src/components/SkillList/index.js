import { useEffect, useState } from "react"
import { getListTags } from "../../services/tagsServices";
import { Tag } from "antd";
import { Link } from "react-router-dom";

export const SkillList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListTags();
      if (res) {
        setTags(res);
      }
    }
    fetchApi();
  }, []);

  console.log(tags);

  return (
    <>
      <div className="mb-5">
        {tags.map((item) => (
          <Link to={`/search?keyword=${item.name || ""}`} key={item.id}>
            <Tag color="blue" className="mb-1">
              {item.name}
            </Tag>
          </Link>
        ))}
      </div>
    </>
  );
}