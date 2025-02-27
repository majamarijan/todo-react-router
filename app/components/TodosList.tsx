import { NavLink } from "react-router";
import type { TodoRecord } from "~/db";
import { formatDate } from "~/utils/utils";

export default function TodoList({todos, search}: {todos?: TodoRecord[], search?: React.RefObject<HTMLInputElement>}) {
  const list = search?.current?.value && todos?.filter((todo) => todo.createdAt.includes(search?.current?.value) || todo.updatedAt?.includes(search?.current?.value)) as TodoRecord[];
  const filteredListAfterUpdate = list && list?.filter((todo) =>!todo.updatedAt) as TodoRecord[];
  const displayList = list && search?.current?.value ? filteredListAfterUpdate!.length < list.length ? filteredListAfterUpdate : list : todos as TodoRecord[];
  return (
    <div className={`todos pt-8 max-w-lg flex flex-col gap-2 ${search?.current?.value ? 'block' : 'hidden md:block'}`}>
      {displayList && displayList.length > 0 && displayList?.map((todo: TodoRecord) => {
        //if updated show latest year in the url
        const year = Number(new Date(todo.updatedAt!).getFullYear()) > Number(new Date(todo.createdAt).getFullYear()) ? (new Date(todo.updatedAt!).getFullYear()).toString() : (new Date(todo.createdAt).getFullYear()).toString();
        return (
          
                <NavLink
                to={`/todo/${year}/${todo.id}`}
                     viewTransition
                     className={({ isActive }) => `${isActive ? "dark:bg-blue bg-blue/50 pointer-events-none" : ""} block p-2 rounded w-fit`}
                     key={todo.id}
                     >
                   {todo.updatedAt ? formatDate(todo.updatedAt) : formatDate(todo.createdAt!)}
                   </NavLink> 
              )})}
    </div>
  )
}
