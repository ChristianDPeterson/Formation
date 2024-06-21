import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Role = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export type Table = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  userId: string;
  name: string;
};
export type User = {
  id: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
  name: string | null;
  username: string | null;
  email: string;
  emailVerified: Timestamp | null;
  password: string;
  role: Generated<Role>;
};
export type DB = {
  Table: Table;
  User: User;
};
