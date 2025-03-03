import { NavLink } from "react-router";

const LoginButton = () => {
  return <NavLink to={'/login'} className="login order-3 sm:order-2 px-4 py-2 rounded text-slate-200 bg-slate-600">Log In</NavLink>;
};

export default LoginButton;