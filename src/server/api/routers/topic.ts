import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: {
          equals: ctx.session.user.id,
        },
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input: { title } }) => {
      return ctx.prisma.topic.create({
        data: { title, userId: ctx.session.user.id },
      });
    }),
});
