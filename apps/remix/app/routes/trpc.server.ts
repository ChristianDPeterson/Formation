import prisma from "@formation/database";
import type { inferAsyncReturnType } from "@trpc/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { compare, hash } from "bcrypt";
import { z } from "zod";
import { getUserId } from "~/session.server";

async function createContext(request: Request, _response: Response) {
  const userId = await getUserId(request);
  return { userId };
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
        if (ctx.userId) {
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
        if (ctx.userId)
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
  tables: t.router({
    listByUserId: publicProcedure
      .input(z.object({ userId: z.string().cuid() }))
      .query(async (opts) => {
        const { userId } = opts.input;
        return prisma.table.findMany({ where: { userId } });
      }),
    create: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { name } = input;

        // check if table name already exists

        // create Table record
        const table = await prisma.table.create({
          data: { name, user: { connect: { id: userId } } },
        });

        // create database table
        prisma.$kysely.schema
          .createTable(table.db_table_name)
          .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
          .execute();

        return table;
      }),
    delete: publicProcedure
      .input(z.object({ id: z.string().cuid() }))
      .mutation(async ({ input }) => {
        const { id } = input;

        const table = await prisma.table.delete({ where: { id } });

        prisma.$kysely.schema.dropTable(table.db_table_name).execute();

        return table;
      }),
  }),
});

export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
