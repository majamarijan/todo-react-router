import { useAuth0 } from "@auth0/auth0-react";

export default function User() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div>
      {isAuthenticated && user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      {!isAuthenticated && (
        <div>
          <p>Not logged in. Please, log in.</p>
        </div>
      )}
    </div>
  );
}