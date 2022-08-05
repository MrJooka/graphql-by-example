import { Job, Company } from './db.js';

const rejectIf = (condition) => {
  if (condition) {
    throw new Error('Unauthorized');
  }
};

const delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

export const resolvers = {
  Query: {
    company: (root, { id }) => Company.findById(id),
    job: (root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: async (_root, { input }, { user }) => {
      console.log('[createJob] user:]', user);
      rejectIf(!user);
      await delay(3000);
      return Job.create({
        ...input,
        companyId: user.companyId,
      });
    },
    deleteJob: async (_root, { id }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(id);
      rejectIf(user.companyId !== job.companyId);

      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      const job = await Job.findById(input.id);
      rejectIf(user.companyId !== job.companyId);

      return Job.update({
        ...input,
        companyId: user.companyId,
      });
    },
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
