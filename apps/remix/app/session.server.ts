import prisma from "@formation/database";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

export const USER_SESSION_KEY = "userId";

if (!process.env.SESSION_PASSWORD) {
  throw new Error("Please set the SESSION_PASSWORD environment variable");
}

export async function requireUserSession(request: Request) {
  const session = await getSession(request.headers.get("cookie"));
  if (!session) {
    // You can throw our helpers like `redirect` and `json` because they
    // return `Response` objects. A `redirect` response will redirect to
    // another URL, while other  responses will trigger the UI rendered
    // in the `ErrorBoundary`.
    throw redirect("/login", 302);
  }

  const userId = session.get(USER_SESSION_KEY);

  if (!userId) {
    throw redirect("/login", 302);
  }

  return userId;
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__session",

      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 60_000,
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_PASSWORD],
      secure: true,
    },
  });

export async function getUserId(request: Request): Promise<string | undefined> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get(USER_SESSION_KEY);
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
}

export { commitSession, destroySession, getSession };
