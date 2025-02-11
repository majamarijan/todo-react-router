import { getTodo, type TodoRecord } from "~/db";
import type { Route } from "../+types/root";
import { Form, useNavigate } from "react-router";
import { useState } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
  if (!todo) {
    throw new Response("Not Found", { status: 404 });
  }
  return todo;
}

export default function Delete({ loaderData }: Route.ComponentProps) {
  const todo = loaderData as TodoRecord | undefined;
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  return (
    <div className="flex flex-col items-center text-center gap-12 relative min-h-[40vh]">
      <h1 className="text-xl md:text-2xl">
        Are you sure you want to delete todo <br />{" "}
        <span className="text-xl font-bold">{todo?.todo}</span>?{" "}
    
      </h1>
        <Form method="post"
          className="absolute inset-0 py-8 px-4 bg-slate-200 text-slate-900 border-4 border-double border-slate-200 rounded-md flex flex-col items-center gap-8"
          hidden={hidden}
        >
         <label htmlFor="todoId">Please comfirm delete with the todo ID: <br /><span className="font-mono bg-slate-300 text-slate-800">
          {todo?.id}
        </span></label>
          <input type="text" placeholder="id" className="place-self-stretch border border-slate-400 rounded mt-8 px-2" id="todoId" name="id" defaultValue={''} />

          <div className="flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            className="px-4 py-2 rounded text-slate-200 bg-green-700"
          >
            Submit
          </button>
          <button
            className="px-4 py-2 rounded text-slate-200 bg-slate-600"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
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
