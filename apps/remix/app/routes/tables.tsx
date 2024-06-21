import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getUser, requireUserSession } from "~/session.server";
import { createCaller } from "./trpc.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);

  const caller = createCaller({ userId });
  const tables = await caller.tables.listByUserId({ userId });

  return json({ tables });
}

export async function action({ context, params, request }: ActionFunctionArgs) {
  const user = await getUser(request);
  if (!user) {
    throw redirect("/login", 302);
  }
  const caller = createCaller({ userId: user.id });

  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "create": {
      // do your update
      return await caller.tables.create({ name: String(formData.get("name")) });
    }
    case "delete": {
      // do your delete
      console.log(formData.get("tableId"));
      return await caller.tables.delete({
        id: String(formData.get("tableId")),
      });
    }
    default: {
      throw new Error("Unexpected action");
    }
  }
}

export default function Tables() {
  const { tables } = useLoaderData<typeof loader>();

  return (
    <>
      <Form action="/tables" method="POST">
        <Input name="name" type="text" placeholder="Name" />
        <Button name="intent" value="create" type="submit">
          Add a new table
        </Button>
      </Form>
      <div>
        {tables.map((table) => {
          return (
            <div key={table.id}>
              <div>Name: {table.name}</div>
              <div>{JSON.stringify(table)}</div>

              <Form method="post">
                <input type="hidden" name="tableId" value={table.id} />
                <Button type="submit" name="intent" value="delete">
                  Delete
                </Button>
              </Form>
            </div>
          );
        })}
      </div>
    </>
  );
}
