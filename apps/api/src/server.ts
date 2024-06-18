import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from "cors";

import prisma from "@formation/database"

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== 'secret') {
      return null;
    }
    return {
      name: 'alex',
    };
  };

  return {
    req,
    res,
    user: getUser(),
  };
};
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

// --------- create procedures etc

const appRouter = router({
  // Queries are the best place to fetch data
  hello: publicProcedure.query(() => {
    return {
      message: 'hello world',
    };
  }),

  users: publicProcedure.query(() => {
    return prisma.user.findMany();
  }),
 
  // Mutations are the best place to do things like updating a database
  goodbye: publicProcedure.mutation(async (opts) => {
    // await opts.ctx.signGuestBook();
 
    return {
      message: 'goodbye!',
    };
  }),
});

export type AppRouter = typeof appRouter;

async function main() {
  // express implementation
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}

void main();