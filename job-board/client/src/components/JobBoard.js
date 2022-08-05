import JobList from './JobList';
import { JOBS_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function JobBoard() {
  const { data, error, loading } = useQuery(JOBS_QUERY, {
    fetchPolicy: 'network-only',
  });

  console.log({ data, error, loading });
  if (error) return <div>something is Wrong....</div>;
  if (loading) return <div>Loading..</div>;

  const { jobs } = data;
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
