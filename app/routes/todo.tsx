import { NavLink, Outlet, useLoaderData, useLocation, useNavigation } from "react-router";
import Content from "~/components/Content";
import type { Route } from "../+types/root";
import { getTodo, type TodoRecord } from "~/db";

export async function loader({params, request}:Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
  return todo;
}

export default function Todo({loaderData}:Route.ComponentProps) {
  const todo = loaderData as TodoRecord | undefined;
  const navigation = useNavigation();
  const location = useLocation();

  return (
    <Content cn="">
      {navigation.state === 'loading' ? <div className="loader"></div> :
       todo && (
          <div className="flex flex-col gap-4">
          
            {location.pathname.includes('edit') ? <Outlet /> : (
              <>
              <span className={`w-fit px-2  rounded-full ${todo.priority === 'low' ? 'bg-green-800' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>📌{todo.priority}</span>
          <p className="text-xl md:text-2xl">{todo.todo}</p>
          
          <div className="flex gap-4">
            <NavLink to={`edit`} className="px-4 py-2 rounded bg-yellow-300 text-slate-500">Edit</NavLink>
            <NavLink to={`delete`} className="px-4 py-2 rounded text-slate-200 bg-red-700">Delete</NavLink>
            </div>
              </>
            )}
        </div>

      )} 
    </Content>
  )
}