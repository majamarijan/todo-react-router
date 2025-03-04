import {
  getSession,
  destroySession,
} from "../sessions.server";
import type { Route } from "../+types/root";
import { Form, Link, redirect } from "react-router";

export async function action({
  request,
}: Route.ActionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  return redirect("/user/profile", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute() {
  return (
    <div className="bg-slate-800 text-slate-200 py-8 px-12 rounded-md flex flex-col gap-4 items-center">
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button className='bg-red-700 px-4 py-2 rounded'>Logout</button>
      </Form>
      <Link className="hover:text-yellow-500 hover:bg-transparent" to="/">Never mind</Link>
    </div>
  );
}
