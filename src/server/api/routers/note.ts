import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input: { topicId } }) => {
      return ctx.prisma.note.findMany({
        where: { topicId },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input: { id } }) => {
      return ctx.prisma.note.delete({
        where: { id },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({ title: z.string(), content: z.string(), topicId: z.string() })
    )
    .mutation(async ({ ctx, input: { title, topicId, content } }) => {
      return ctx.prisma.note.create({
        data: { title, topicId, content },
      });
    }),
});
