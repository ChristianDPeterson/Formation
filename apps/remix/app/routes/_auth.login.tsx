import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { createCaller } from "~/routes/trpc.server";
import {
  USER_SESSION_KEY,
  commitSession,
  // createUserSession,
  getSession,
} from "~/session.server";

type ValidationError = {
  email?: string;
  password?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const body = await request.formData();
  const email = String(body.get("email"));
  const password = String(body.get("password"));

  const errors: ValidationError = {};
  if (!email.includes("@")) {
    session.flash("error", "Invalid email address");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
  if (password.length < 8) {
    session.flash("error", "Password should be at least 8 characters");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const caller = createCaller({ user: null });

  let user;
  try {
    user = await caller.users.login({
      email,
      password,
    });
  } catch (error) {
    // if (error instanceof TRPCError) {
    session.flash("error", "TRPC error");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set(USER_SESSION_KEY, user.id);

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <Form action="/login" method="post">
      {error && <em>{error}</em>}
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </Form>
  );
}
