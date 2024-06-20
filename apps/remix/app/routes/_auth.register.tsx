import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  json,
  redirect,
  useRouteError,
} from "@remix-run/react";
import { TRPCError } from "@trpc/server";
import { createCaller } from "~/routes/trpc.server";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const caller = createCaller({ user: null });

  try {
    caller.users.create({
      email: body.get("email")?.toString() ?? "",
      password: body.get("password")?.toString() ?? "",
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      throw json(error);
    }
  }

  return redirect(`/login`);
}

export default function Register() {
  const error = useRouteError();

  return (
    <Form action="/register" method="post">
      <input name="email" type="email" />
      <input name="password" type="password" />
      {isRouteErrorResponse(error) && error.status}
      <button type="submit">Register</button>
    </Form>
  );
}
