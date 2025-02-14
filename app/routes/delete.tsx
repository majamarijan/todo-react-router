import { getTodo, removeTodo, type TodoRecord } from "~/db";
import type { Route } from "../+types/root";
import { Form, NavLink, redirect, useNavigate } from "react-router";
import { useState } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
  if (!todo) {
    throw new Response("Not Found", { status: 404 });
  }
  return todo;
}

export async function action({params, request}:Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  await removeTodo(Object(data.id!));
  return redirect(`/`);
}

export default function Delete({ loaderData }: Route.ComponentProps) {
  const todo = loaderData as TodoRecord | undefined;
  const [hidden, setHidden] = useState(true);
  const [wrongID, setWrongID] = useState(false);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (data.id !== todo?.id) {
      e.preventDefault();
      setWrongID(true);
    }
  }
  return (
    <div className="flex flex-col items-center text-center gap-12 relative min-h-[40vh] max-w-prose">
      <h1 className="text-xl md:text-2xl">
        Are you sure you want to delete todo <br />{" "}
        <span className="text-xl font-bold">{todo?.todo}</span>?{" "}
    
      </h1>
        <Form method="post"
          className="absolute left-0 top-0 right-0 py-8 px-4 bg-slate-200 text-slate-900 border-4 border-double border-slate-200 min-h-[20vh] rounded-md flex flex-col items-center gap-8"
          hidden={hidden}
          onSubmit={handleSubmit}
        >
         <label htmlFor="todoId">Please comfirm delete with the todo ID: <br /><span className="font-mono bg-slate-300 text-slate-800" onClick={()=> navigator.clipboard.writeText(todo?.id || '')}>
          {todo?.id}
        </span></label>
        <div className={`${wrongID ? 'flex' : 'hidden'} text-red-700`}>You entered worong ID!</div>
          <input type="text" placeholder="id" className="place-self-stretch border border-slate-400 rounded mt-8 px-2" id="todoId" name="id" defaultValue={''} />

          <div className="flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            className="px-4 py-2 rounded text-slate-200 bg-green-700"
          >
            Submit
          </button>
          <NavLink to={'..'} className="px-4 py-2 rounded text-slate-200 bg-slate-600">Cancel</NavLink>
        </div>
        </Form>

          <button
            type="button"
            className="px-4 py-2 rounded text-slate-200 bg-green-700"
            onClick={()=> setHidden(false)}
          >
            Confirm
          </button>
         
    </div>
  );
}
