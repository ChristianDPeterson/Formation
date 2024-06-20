import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

import { appRouter } from "./routers/_app";
import { createContext } from "./trpc";

export type AppRouter = typeof appRouter;

async function main() {
  // express implementation
  const app = express();

  // allow local CORS from frontend
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    }),
  );

  app.use((req, _res, next) => {
    // request logger
    console.log("⬅️ ", req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
}

void main();
