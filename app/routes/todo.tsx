import { useLoaderData, useNavigation } from "react-router";
import Content from "~/components/Content";
import type { Route } from "../+types/root";
import { getTodo, type TodoRecord } from "~/db";
import { useEffect, useState } from "react";

export async function loader({params, request}:Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
  return todo;
}

export default function Todo({loaderData}:Route.ComponentProps) {
  const todo = loaderData as TodoRecord | undefined;
  const navigation = useNavigation();

  return (
    <Content cn="">
      {navigation.state === 'loading' ? <div className="loader"></div> :
       todo && (
        <div className="flex flex-col gap-4">
          <span className={`w-fit px-2  rounded-full ${todo.priority === 'low' ? 'bg-green-800' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>📌{todo.priority}</span>
          <p className="text-xl md:text-2xl">{todo.todo}</p>
        </div>
       )}
    </Content>
  )
}