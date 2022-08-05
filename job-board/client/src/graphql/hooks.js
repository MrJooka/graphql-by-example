import { useQuery } from '@apollo/client';
import { JOBS_QUERY } from './queries';

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
