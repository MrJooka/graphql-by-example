import { Job, Company } from './db.js';

export const resolvers = {
  Query: {
    job: (root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
  },
  Job: {
    // client에서 filed 추가 안하면 resolve에서 실행 안함
    company: (job) => (console.log('실행됨'), Company.findById(job.companyId)),
  },
};
