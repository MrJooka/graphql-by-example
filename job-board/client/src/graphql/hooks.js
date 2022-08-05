import { useQuery } from '@apollo/client';
import { JOBS_QUERY, JOB_QUERY } from './queries';

export const useJobs = () => {
  const { data, error, loading } = useQuery(JOBS_QUERY, {
    fetchPolicy: 'network-only',
  });

  return {
    jobs: data?.jobs,
    loading,
    error: Boolean(error),
  };
};

export const useJob = (id) => {
  const { data, error, loading } = useQuery(JOB_QUERY, {
    variables: { id },
  });

  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
};
