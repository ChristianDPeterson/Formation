import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { getUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Formation" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  const isLoggedIn = !!userId;

  // TODO: redirect logged in user to /home

  return json({ isLoggedIn });
}

function LandingPage() {
  return <h1 className="text-xl">Formation</h1>;
}

function HomePage() {
  return <h1>Welcome </h1>;
}

export default function Index() {
  const { isLoggedIn } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      {isLoggedIn ? <HomePage /> : <LandingPage />}
    </div>
  );
}
