import type { Route } from "../+types/root";
import { commitSession, getSession } from "~/sessions.server";
import { data, redirect } from "react-router";

export async function loader({
  request,
}: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return {isAuthenticated: true};
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

export default function User({loaderData}: Route.ComponentProps) {
   const { isAuthenticated, user } = loaderData as any;
   console.log(isAuthenticated, user);
  return (
    <div>
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
     
      {!isAuthenticated && <p>You're not logged in!</p>}
    </div>
  );
}