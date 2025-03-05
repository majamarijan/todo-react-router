import { Form, useNavigate, redirect } from "react-router"
import type { Route } from "../+types/root";
import { editTodo, getTodo, type TodoRecord } from "../db";
import { getSession } from "~/sessions.server";

export async function loader({params}:Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
  return todo;
}

export async function action({params,request}:Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const session = await getSession(request.headers.get("Cookie"));
  console.log(data)

  if(!data.hasOwnProperty('completed')) {
      Object.assign(data, {completed: false});
  }else {
    Object.assign(data, {completed: true});
  }
  if(session.get('userId')) {
    const todo = await editTodo(Number(session.get('userId')), params.id!, new Object(data) as TodoRecord);
   return redirect(`/todo/${new Date(todo.updatedAt ? todo.updatedAt : todo.createdAt).getFullYear()}/${todo.todoId}`);
  }
  
}

export default function Edit({loaderData}:Route.ComponentProps) {
  const navigate = useNavigate();
  const data = loaderData as TodoRecord | undefined;
  return (
    <div className="md:pt-14">
      
        {data && (
          <Form className="flex flex-col gap-4 border border-slate-400/40 shadow-[0_0_12px_rgba(200,200,200,.4)] shadow-primaryLight rounded p-4 max-w-prose"
            method="post"
            onSubmit={()=> console.log('submitted')}
          >
            <div>
            <label htmlFor="completed">Completed: </label>
             <input type='checkbox' defaultValue={data.completed ? 'on' : ''} name='completed' className="place-self-start ml-2" id='completed' /> 
            </div>
            <label htmlFor="todo">
              Edit Text:
             </label>
            <input id='todo' type='text' name='todo' placeholder='edit' defaultValue={data.todo} className="bg-secondaryLight text-primary px-2 py-2 rounded" />
            <label htmlFor="priority">Edit Priority:</label>
            <select name="priority" id="priority" className="bg-secondaryLight text-primary px-2 py-2 rounded" defaultValue={data.priority}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>  
            </select>
            <div className="flex flex-col md:flex-row gap-4">
      <button type="submit" className="px-4 py-2 rounded text-slate-200 bg-green-700">Save</button>
      <button className="px-4 py-2 rounded text-slate-200 bg-slate-600" onClick={() => navigate(-1)}>Cancel</button>
      </div>
          </Form>
        )}
    </div>
  )
}