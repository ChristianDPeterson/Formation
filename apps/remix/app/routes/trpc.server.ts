import prisma from "@formation/database";
import type { inferAsyncReturnType } from "@trpc/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { compare, hash } from "bcrypt";
import { z } from "zod";

import { getUser } from "~/session.server";

async function createContext(request: Request, _response: Response) {
  const user = await getUser(request);
  return { user };
}

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();
const { createCallerFactory, router } = t;
const publicProcedure = t.procedure;

export const appRouter = router({
  users: t.router({
    create: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Already logged in",
          });
        }
        const hashedPassword = await hash(input.password, 10);
        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            username: input.email,
          },
        });
        return user;
      }),
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user)
          throw new TRPCError({
            code: "CONFLICT",
            message: "Already logged in",
          });
        const user = await prisma.user.findUnique({
          where: { email: input.email },
        });
        if (!user) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
          });
        }

        const passwordMatch = await compare(
          input.password,
          user.password ?? "",
        );

        if (!passwordMatch) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid password",
          });
        }
        return user;
      }),
  }),
  // user: t.router({
  //   list: publicProcedure.query(() => {
  //     return prisma.user.findMany();
  //   }),
  //   create: publicProcedure
  //     .input(z.object({ name: z.string(), email: z.string() }))
  //     .mutation(async (opts) => {
  //       const { name, email } = opts.input;
  //       return prisma.user.create({ data: { name, email } });
  //     }),
  //   get: publicProcedure
  //     .input(z.object({ id: z.string().cuid() }))
  //     .query(async (opts) => {
  //       const { id } = opts.input;
  //       return prisma.user.findFirst({ where: { id } });
  //     }),
  // }),
  //   todos: t.router({
  //     list: t.procedure
  //       .input(
  //         z
  //           .object({
  //             count: z.number().optional(),
  //             skip: z.number().optional(),
  //           })
  //           .optional(),
  //       )
  //       .query(async ({ ctx, input }) => {
  //         if (!ctx.user) {
  //           throw redirect("/login");
  //         }
  //         if (input) {
  //           await new Promise((resolve) => setTimeout(resolve, 2_000));
  //         }
  //         return db.todo.findMany({
  //           where: { userId: ctx.user.id },
  //           orderBy: {
  //             createdAt: "desc",
  //           },
  //           take: input?.count,
  //           skip: input?.skip,
  //         });
  //       }),
  //     getById: t.procedure.input(z.string()).query(({ ctx, input }) => {
  //       if (!ctx.user) {
  //         throw redirect("/login");
  //       }
  //       return db.todo.findUnique({ where: { id: input } });
  //     }),
  //     complete: t.procedure
  //       .input(
  //         z.object({
  //           id: z.string(),
  //           complete: z.boolean(),
  //         }),
  //       )
  //       .mutation(async ({ ctx, input }) => {
  //         if (!ctx.user) {
  //           throw redirect("/login");
  //         }
  //         return db.todo.update({
  //           where: { id: input.id },
  //           data: { complete: input.complete },
  //         });
  //       }),
  //     create: t.procedure
  //       .input(z.object({ label: z.string().min(5) }))
  //       .mutation(async ({ ctx, input }) => {
  //         if (!ctx.user) {
  //           throw redirect("/login");
  //         }
  //         return db.todo.create({
  //           data: {
  //             title: input.label,
  //             user: {
  //               connect: {
  //                 id: ctx.user.id,
  //               },
  //             },
  //           },
  //         });
  //       }),
  //   }),
});

export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
