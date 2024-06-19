import prisma from "@formation/database";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  list: publicProcedure.query(() => {
    return prisma.user.findMany();
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async (opts) => {
      const { name, email } = opts.input;
      return prisma.user.create({ data: { name, email } });
    }),
  get: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async (opts) => {
      const { id } = opts.input;
      return prisma.user.findFirst({ where: { id } });
    }),
});
