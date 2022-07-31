import JobList from './JobList';
// import { jobs } from '../fake-data';
import { getJobs } from '../graphql/queries';
import { useEffect, useState } from 'react';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs().then((data) => {
      console.log(data.jobs);
      setJobs(data.jobs);
    });
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      {jobs.length > 0 && <JobList jobs={jobs} />}
    </div>
  );
}

export default JobBoard;
