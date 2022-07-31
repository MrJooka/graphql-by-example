import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        title
        company {
          id
          name
          description
        }
        description
      }
    }
  `;

  const data = await request(GRAPHQL_URL, query);
  return data;
}
