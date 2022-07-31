import { Job, Company } from './db.js';

export const resolvers = {
  Query: {
    company: (root, { id }) => Company.findById(id),
    job: (root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }) => {
      console.log(_root);
      return Job.create(input);
    },
    deleteJob: async (_root, { id }) => {
      await Job.delete(id);
      return Job.findAll();
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
