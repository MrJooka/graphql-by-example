import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { jobs } from '../fake-data';
import { getJobs } from '../graphql/queries';

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState({
    title: '',
    company: { name: '' },
    description: '',
  });

  useEffect(() => {
    getJobs().then((data) => setJob(data.jobs.find((job) => job.id === jobId)));
  }, [jobId]);
  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
}

export default JobDetail;
