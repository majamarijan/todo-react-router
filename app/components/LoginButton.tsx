import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="order-3 sm:order-2 px-4 py-2 rounded text-slate-200 bg-slate-600" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;