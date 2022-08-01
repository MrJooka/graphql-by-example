import { Job, Company } from "./db.js";

export const resolvers = {
  Query: {
    company: (root, { id }) => Company.findById(id),
    job: (root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },

  Mutation: {
    createJob: (_root, { input }, { user }) => {
      console.log("[createJob] user:]", user);
      if (!user) {
        throw new Error("Unauthorized");
      }
      return Job.create({
        ...input,
        companyId: user.companyId,
      });
    },
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
