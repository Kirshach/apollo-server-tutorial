import { makeSchema } from 'nexus';
import path from 'path';

import { Link, LinkQuery } from './graphql';

const root = path.resolve(__dirname, '../');

const schema = makeSchema({
  types: [Link, LinkQuery],
  outputs: {
    schema: path.join(root, "schema.graphql"),
    typegen: path.join(root, "nexus-typegen.ts")
  },
});

export default schema;
