import { PrismaClient } from "@prisma/client";
import {
  Kysely,
  MysqlAdapter,
  MysqlIntrospector,
  MysqlQueryCompiler,
} from "kysely";
import kyselyExtension from "prisma-extension-kysely";
import type { DB } from "../prisma/generated/types";

const prismaClientSingleton = () => {
  return new PrismaClient()
    .$extends(
      kyselyExtension({
        kysely: (driver) =>
          new Kysely<DB>({
            dialect: {
              // This is where the magic happens!
              createDriver: () => driver,
              // Don't forget to customize these to match your database!
              createAdapter: () => new MysqlAdapter(),
              createIntrospector: (db) => new MysqlIntrospector(db),
              createQueryCompiler: () => new MysqlQueryCompiler(),
            },
            plugins: [
              // Add your favorite plugins here!
            ],
          }),
      }),
    )
    .$extends({
      result: {
        table: {
          db_table_name: {
            needs: { id: true, userId: true },
            compute(table) {
              return `${table.userId}_${table.id}`;
            },
          },
        },
      },
    });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
