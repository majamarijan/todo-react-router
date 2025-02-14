import { Form, NavLink, Outlet, redirect, useNavigation, useSubmit } from "react-router";
import type { Route } from "../+types/root";
import { createTodo, getAllTodos, getTodo, type TodoRecord } from "~/db";
import Content from "~/components/Content";
import React, { useRef } from "react";



export async function loader({params, request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const data = await getAllTodos(q || '');
	return {todos: data, query: q};
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
	const data = loaderData as {todos:TodoRecord[], query?:string} | undefined;
  const navigation = useNavigation();
  const year = new Date().getFullYear();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const searchRef = useRef(document.querySelector('input[name="q"]')) as React.RefObject<HTMLInputElement>;
  
  return (
    <div className={`grid px-4 sm:px-8 row-[2] grid-cols-1 md:grid-cols-[auto_1fr] w-full lg:w-5xl  mx-auto pt-12 pb-20 gap-8 place-items-center`}>
      <div className="px-4 sm:px-0 md:row-[1]">
        <Form className="flex flex-row items-center relative" method="get"
        onSubmit={(e)=> {
          e.preventDefault();
          //check if the form is valid
          if(e.currentTarget.checkValidity()) {
            if(e.currentTarget.q.value) {
             submit(e.currentTarget, {method: 'get'});
            }
          }
        }}
        onChange={(e) => {
          //check if the form is valid
          if(e.currentTarget.checkValidity()) {
            if(e.currentTarget.q.value !== '') {
              submit(e.currentTarget, {method: 'get'});
            }else {
             submit(e.currentTarget, {method: 'get'});
            }
          }
        }}
        role="search"
        >
          <button type='submit' className="flex items-center">
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
          ref={searchRef}
            type="search"
            name="q"
            placeholder="Search year"
            aria-label="Search todos"
            className="border-none rounded-full px-1 py-2 outline-1 pl-12"
            id="q"
            pattern={`^(?!.*\S)|201[9]|202[0-${String(year).slice(3)}]`}
            defaultValue={data?.query || ''}
          />
          <div
              aria-hidden
              hidden={!searching}
              id="search-spinner"
            />
        </Form>
          <TodoList todos={data?.todos} search={searchRef}  />
      </div>
      <Content>
        {navigation.state === "loading" ? <div className="loader"></div>
        :
       <Outlet />
    
}
      </Content>
    </div>
  );
}

function TodoList({todos, search}: {todos?: TodoRecord[], search?: React.RefObject<HTMLInputElement>}) {
  const list = search?.current?.value ? todos?.filter((todo) => todo.createdAt.includes(search?.current?.value) || todo.updatedAt?.includes(search?.current?.value)) as TodoRecord[] : todos;
  const filteredListAfterUpdate = list!.filter((todo) =>!todo.updatedAt);
  const displayList = list && search?.current?.value ?  filteredListAfterUpdate.length < list.length ? filteredListAfterUpdate : list : todos;
 
  return (
    <div>
      <Form method='post' onSubmit={()=> console.log('submitted')}>
        <input type="submit" value='Add New' className="p-2 rounded bg-darkGreen text-primaryLight" />
			</Form>
    <div className={`todos pt-8 max-w-lg flex flex-col gap-2 ${search?.current?.value ? 'block' : 'hidden md:block'}`}>
      {displayList?.map((todo: TodoRecord) => {
        //if updated show latest year in the url
        const year = Number(new Date(todo.updatedAt!).getFullYear()) > Number(new Date(todo.createdAt).getFullYear()) ? (new Date(todo.updatedAt!).getFullYear()).toString() : (new Date(todo.createdAt).getFullYear()).toString();
        return (
          
                <NavLink
                to={`/todo/${year}/${todo.id}`}
                     viewTransition
                     className={({ isActive }) => `${isActive ? "dark:bg-blue bg-blue/50 pointer-events-none" : ""} block p-2 rounded`}
                     key={todo.id}
                     >
                   {todo.updatedAt ? formatDate(todo.updatedAt) : formatDate(todo.createdAt!)}
                   </NavLink> 
              )})}
    </div>
              </div>
  )
}
