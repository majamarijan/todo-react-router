import { Form, NavLink, Outlet, redirect, useNavigation, useSubmit } from "react-router";
import type { Route } from "../+types/root";
import { getAllTodos, type TodoRecord } from "~/db";
import Content from "~/components/Content";
import React, { useRef } from "react";
import TodoList from "~/components/TodosList";



export async function loader({params, request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const data = await getAllTodos(q || '');
	return {todos: data, query: q};
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
        <Form className="flex flex-row items-center relative mb-8" method="get"
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
     
         {data?.todos && <TodoList todos={data?.todos} search={searchRef}  />}
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

