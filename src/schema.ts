import { makeSchema } from 'nexus';
import path from 'path';

import * as types from './graphql';

const root = path.resolve(__dirname, '../');

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(root, 'schema.graphql'),
    typegen: path.join(root, 'nexus-typegen.ts')
  },
  contextType: {
    module: path.join(root, 'src/context.ts'),
    export: 'Context',
  },
});

export default schema;
