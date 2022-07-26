
import { ApolloServer } from 'apollo-server';

import schema from './schema';

const server = new ApolloServer({ schema });

server.listen({ port: 3000 }).then(({ url }) => {
  console.log(`Server is running at ${url}`)
});

export default server;
