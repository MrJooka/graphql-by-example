import JobList from './JobList';
import { useJobs } from '../graphql/hooks';

function JobBoard() {
  const { jobs, error, loading } = useJobs();

  console.log({ jobs, error, loading });
  if (error) return <div>something is Wrong....</div>;
  if (loading) return <div>Loading..</div>;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
