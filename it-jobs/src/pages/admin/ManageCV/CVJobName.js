import { useEffect, useState } from "react";
import { getDetailJob } from "../../../services/jobsServices";

export const CVJobName = ({ record }) => {
  const [jobName, setJobName] = useState("No name");

  useEffect(() => {
    const fetchJob = async () => {
      const res = await getDetailJob(record.idJob);
      if (res.name) {
        setJobName(res.name);
      }
    };
    fetchJob();
  }, []);

  return <>{jobName}</>;
};
