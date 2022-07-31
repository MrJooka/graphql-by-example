export async function getJobs() {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
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
      `,
    }),
  });

  const { data } = await response.json();
  return data;
}
