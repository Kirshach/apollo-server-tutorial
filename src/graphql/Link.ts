import { extendType, objectType, nonNull, stringArg, intArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

let links: NexusGenObjects["Link"][] = [
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
  }
});

export const QueryFeed = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve() {
        return links;
      }
    })
  }
});

export const QueryLink = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('link', {
      type: 'Link',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_root, { id }) {
        const link = links.find(item => item.id === id);
        return link;
      }
    })
  }
});

export const CreateLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('create', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(_root, { description, url }) {
        const id = links.length + 1;
        const link = { id, description, url };
        links.push(link);
        return link;
      }
    })
  },
});

export const EditLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('edit', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
        description: stringArg(),
        url: stringArg(),
      },
      resolve(_root, { id, description, url }) {
        const link = links.find(item => item.id === id);
        if (!link) {
          throw new Error('No link found');
        }
        if (description) link.description = description;
        if (url) link.url = url;
        return link;
      }
    })
  }
});

export const DeleteLink = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('delete', {
      type: 'Link',
      args: { id: nonNull(intArg()) },
      resolve(_root, { id }) {
        const linkIndex = links.findIndex(item => item.id === id);
        const link = links.splice(linkIndex, 1);
        return link;
      }
    })
  }
});
