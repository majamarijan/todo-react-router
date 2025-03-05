import type { Route } from "../+types/root";
import { commitSession, getSession } from "~/sessions.server";
import { data } from "react-router";
import { getUser, type User } from "~/db";
import { useAuth, type AuthState } from "~/context/AuthProvider";
import { useEffect } from "react";

export async function loader({
  request,
}: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  if(!session.has('userId')) return {isAuthenticated: false};
  if (session.has("userId")) {
    const id:string | undefined = session.get("userId");
    const user:User = await getUser(id!);
    return {isAuthenticated: true, user:user};
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
  const {isAuthenticated, user} = loaderData as unknown as AuthState;
  const {handleAuth} = useAuth();
  useEffect(()=> {
    handleAuth({isAuthenticated, user});
  },[isAuthenticated,user]);
  
  return (
    <div>
      {!isAuthenticated ? <p>You are not logged in. Please, log in.</p> :
      <div>
        <img src={user?.image} alt={user?.username} />
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>
      }
    </div>
  );
}