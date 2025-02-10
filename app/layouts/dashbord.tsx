import { Form, NavLink, Outlet } from "react-router";
import type { Route } from "../+types/root";
import { getAllTodos, type TodoRecord } from "~/db";

export async function loader({}: Route.LoaderArgs) {
	const data = await getAllTodos();
	return {todos: data}
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		// weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export default function Dashboard({loaderData}: Route.ComponentProps) {
	const data = loaderData as {todos:TodoRecord[]} | undefined;
  return (
    <div className="grid grid-rows-[100px_1fr] px-4 sm:px-8 md:grid-rows-1 row-[2] grid-cols-1 md:grid-cols-[auto_2fr] bg-slate-700">
      <div className="px-4 sm:px-0 pt-8 md:row-[1]">
        <Form className="flex flex-row items-center relative" method="get">
          <button className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 absolute left-2 z-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <input
            type="search"
            name="q"
            placeholder="Search"
            aria-label="Search todos"
            className="border-none rounded-full px-1 py-2 outline-1 pl-12"
          />
        </Form>
        <div className="todos pt-8">
          {data?.todos.map((todo: TodoRecord) => {
						return (
							<NavLink
								to={`/todo/${todo.id}`}
								className='flex text-center text-md py-6 border-b border-b-slate-400/40 hover:bg-slate-300/50 cursor-pointer backdrop-blur-2xl'
								key={todo.id}
							>
								{formatDate(todo.createdAt!)}
							</NavLink>
						);
					})}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
