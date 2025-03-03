import { data, redirect } from "react-router";
import type { Route } from "../+types/root";
import { getUser as validateCredentials } from "../db";

import {
  getSession,
  commitSession,
} from "../sessions.server";

export async function loader({
  request,
}: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
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
  const username = form.get("username");
  const password = form.get("password");

  const user = await validateCredentials({
    username,
    password
  });
  console.log(user)

  if (user?.user_id == null) {
    session.flash("error", "Invalid username/password");

    // Redirect back to the login page with errors.
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", String(user?.user_id));

  // Login succeeded, send them to the home page.
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login({
  loaderData,
}: Route.ComponentProps) {
  const { error }: any = loaderData;

  return (
    <div>
      {error ? <div className="error">{error}</div> : null}
      <form method="POST" className="flex flex-col gap-4 max-w-md">
        <div>
          <p>Please sign in</p>
        </div>
        <label className="flex flex-col sm:flex-row bg-slate-800 rounded p-4 gap-2">
          Username: <input type="text" name="username" className="text-black bg-slate-700 rounded-md" />
        </label>
        <label className="flex flex-col sm:flex-row bg-slate-800 rounded p-4 gap-2">
          Password:{" "}
          <input type="password" name="password" className="text-black bg-slate-700 rounded-md" />
        </label>
        <button type="submit" className="px-4 py-2 rounded text-slate-200 bg-green-700">Submit</button>
      </form>
    </div>
  );
}
