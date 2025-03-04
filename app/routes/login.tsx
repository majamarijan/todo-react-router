import { data, Form, redirect, type SessionData } from "react-router";
import type { Route } from "../+types/root";
import { getUserId } from "../db";

import {
  getSession,
  commitSession,
  type SessionFlashData,
} from "../sessions.server";

export async function loader({
  request,
}: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.has("userId")) {
    // Redirect to the profile page if they are already signed in.
    return redirect("/user/profile");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}


export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  const form = await request.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;
  const data:SessionData = await getUserId({
    username,
    password
  });

  if (data == null) {
    session.flash("error", "Invalid username/password");
    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", data.userId);
  // Login succeeded, send them to the profile page.
  return redirect("/user/profile", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login({
  loaderData,
}: Route.ComponentProps) {
  const { error } = loaderData as unknown as SessionFlashData;

  return (
    <div>
      {error ? <div className="error">{error}</div> : null}
      <Form method="POST" className="flex flex-col gap-4 max-w-md">
        <div>
          <p>Please sign in <span className="font-mono bg-orange-600 rounded-md test-slate-100 px-2 py-4">(username: test, password: test)</span></p>
        </div>
        <label className="flex flex-col sm:flex-row bg-slate-800 rounded p-4 gap-2">
          Username: <input type="text" name="username" className="text-black bg-slate-700 rounded-md" />
        </label>
        <label className="flex flex-col sm:flex-row bg-slate-800 rounded p-4 gap-2">
          Password:{" "}
          <input type="password" name="password" className="text-black bg-slate-700 rounded-md" />
        </label>
        <button type="submit" className="px-4 py-2 rounded text-slate-200 bg-green-700">Submit</button>
      </Form>
    </div>
  );
}
