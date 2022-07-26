import { makeSchema } from 'nexus';
import path from 'path';

const root = path.resolve(__dirname, '../');

const schema = makeSchema({
  types: [],
  outputs: {
    schema: path.join(root, "schema.graphql"),
    typegen: path.join(root, "nexus-typegen.ts")
  },
});

export default schema;

