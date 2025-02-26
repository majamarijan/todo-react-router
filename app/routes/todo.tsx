import { NavLink, Outlet, useLoaderData, useLocation } from "react-router";
import type { Route } from "../+types/root";
import { getTodo, type TodoRecord } from "~/db";

export async function loader({params}:Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
 return todo;
}

export default function Todo({loaderData}:Route.ComponentProps) {
  const todo = loaderData as TodoRecord | undefined;
  const location = useLocation();
  return (
    <div>
      {
       todo && (
          <div className="flex flex-col gap-4">
            {location.pathname.includes('edit') || location.pathname.includes('delete') ? <Outlet /> : (
              <>
              <span className={`w-fit px-2  rounded-full ${todo.priority === 'low' ? 'bg-green-800/60' : todo.priority === 'medium' ? 'bg-yellow/40' : 'bg-red-500/60'}`}>📌{todo.priority}</span>
          <p className="text-xl md:text-2xl max-w-md">{todo.todo}</p>
          
          <div className="flex gap-4">
            <NavLink to={`edit`} className="px-4 py-2 rounded bg-darkGreen text-primaryLight">Edit</NavLink>
            <NavLink to={`delete`} className="px-4 py-2 rounded bg-red hover:bg-red/80 text-primaryLight">Delete</NavLink>
            </div>
              </>
            )}
        </div>

      )}
    </div>
  )
}
