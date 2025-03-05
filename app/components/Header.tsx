import DropdownMenu, { Profile } from "./DropdownMenu";
import LoginButton from "./Login";
import AddTodo from "./AddTodoButton";
import ThemeButton from "./ThemeButton";
import { NavLink } from "react-router";
import ToggleBars from "./ToggleBars";
import { useAuth } from "~/context/AuthProvider";

export default function Header() {
  return (
    <header
      className={`dark:bg-black bg-secondaryLight text-primary dark:text-primaryLight px-8 flex items-center justify-between row-[1] border-b border-b-slate-400`}
    >
      <NavLink to="/" className="font-mono text-xl">🗒️TX</NavLink>
			<div className="hidden sm:flex">
				<Navigation />
			</div>
			<ToggleBars />
    </header>
  );
}

export function Navigation({noDropdown}: {noDropdown?: boolean}) {
  const {isAuthenticated, user} = useAuth();
	return (
        <nav className="flex flex-col sm:flex-row sm:items-center gap-4">
        	{isAuthenticated && <AddTodo />}
						{ isAuthenticated ? noDropdown ? <Profile userId={user?.id} /> : <DropdownMenu /> : <LoginButton />}
          <ThemeButton />
        </nav>
	)
}