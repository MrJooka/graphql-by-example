import { gql, ApolloServer } from 'apollo-server';

const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => 'Hello World!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await server.listen({ port: 9000 });

console.log(`Sever running at ${url}`);
