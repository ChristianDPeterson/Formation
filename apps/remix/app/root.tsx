import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import "~/tailwind.css";
import Navbar from "./components/Navbar";
import { getUserId } from "./session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  const isLoggedIn = !!userId;

  return json({ isLoggedIn });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {JSON.stringify(error)}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isLoggedIn } = useLoaderData<typeof loader>();
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
}
