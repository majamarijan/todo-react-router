import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LogoutButton from "./Logout";
import { NavLink } from "react-router";
import Dropdown from "./Dropdown";

export default function DropdownMenu() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [logout, setLogout] = useState(false);

  if (isLoading) {
    return ;
  }

  return (
    isAuthenticated && (
      <div
        className="relative flex flex-col rounded-full w-10 h-10 bg-slate-800 items-center justify-center cursor-pointer order-2"
        onClick={() => setLogout((prev) => !prev)}
      >
        {user && user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-full"
            title={`${user.name} \n ${user.email}`}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
          <Dropdown toggle={logout}>
            <Profile />
          </Dropdown>
        
      </div>
    ) 
  );
};

export function Profile() {
  return (
    <div className="flex flex-col items-stretch justify-start gap-3 order-3">
       <div className="sm:hidden block w-full h-[2px] bg-slate-600"></div>
      <NavLink
              to={"/user/profile"}
              className={
                "profile-link flex flex-row items-center gap-2 rounded-md p-1 text-white transition-all ease-in-out duration-200"
              }
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>{" "}
              <span>Your Profile</span>
            </NavLink>
            <div className="w-full h-[1px] bg-slate-600"></div>
            <LogoutButton />
    </div>
  )
}

