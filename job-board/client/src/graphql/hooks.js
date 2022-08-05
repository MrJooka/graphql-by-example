import { useMutation, useQuery } from '@apollo/client';
import { getAccessToken } from '../auth';
import {
  COMPANY_QUERY,
  CREATE_JOB_MUTATION,
  JOBS_QUERY,
  JOB_QUERY,
} from './queries';

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

export const useCompany = (id) => {
  const { data, error, loading } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });

  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
};

export const useCreateJob = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_JOB_MUTATION);

  return {
    createJob: async (input) => {
      const {
        data: { job },
      } = await mutate({
        variables: { input },
        context: {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
        update: (cache, { data: { job } }) => {
          console.log(job);
          cache.writeQuery({
            query: JOB_QUERY,
            variables: { id: job.id },
            data: { job },
          });
        },
      });

      return job;
    },
    loading,
    error: Boolean(error),
  };
};
