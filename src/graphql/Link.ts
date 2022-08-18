import { extendType, objectType, nonNull, stringArg, intArg } from 'nexus';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
    t.field('postedBy', {
      type: 'User',
      resolve(parent, _args, context) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      }
    });
  }
});

export const QueryFeed = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(_root, _args, { prisma }) {
        return prisma.link.findMany();
      }
    })
  }
});

export const QueryLink = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('link', {
      type: 'Link',
      args: { id: nonNull(intArg()) },
      resolve(_root, { id }, { prisma }) {
        return prisma.link.findUnique({ where: { id } });
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
      resolve(_root, { description, url }, { prisma, userId }) {
        if (!userId) throw new Error('Need to be logged to create a link');
        return prisma.link.create({
          data: {
            description,
            url,
            postedBy: { connect: { id: userId } }
          }
        });
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
      resolve(_root, { id, description, url }, { prisma }) {
        return prisma.link.update({
          where: { id },
          data: Object.entries({ description, url })
            // only add those fields that are present in the args
            .reduce((acc, [key, prop]) => prop ? { ...acc, [key]: prop } : acc, {})
        });
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
      resolve(_root, { id }, { prisma }) {
        return prisma.link.delete({ where: { id } });
      }
    })
  }
});
