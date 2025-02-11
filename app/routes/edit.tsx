import { Form, useNavigate, redirect } from "react-router"
import type { Route } from "../+types/root";
import { editTodo, getTodo, type TodoRecord } from "../db";

export async function loader({params}:Route.LoaderArgs) {
  const todo = await getTodo(params.id!);
  if(!todo) {
    throw new Response('Not Found', {status: 404});
  }
  return todo;
}

export async function action({params,request}:Route.ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  if(!data.hasOwnProperty('completed')) {
      Object.assign(data, {completed: false});
  }else {
    Object.assign(data, {completed: true});
  }
  await editTodo(params.id!, new Object(data) as TodoRecord);
  return redirect(`/todo/${params.id}`);
  
}

export default function Edit({loaderData}:Route.ComponentProps) {
  const navigate = useNavigate();
  const data = loaderData as TodoRecord | undefined;
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      
      <h1>Edit Page</h1>
    
        {data && (
          <Form className="flex flex-col gap-4 border border-slate-400 rounded p-4"
            method="post"
            onSubmit={()=> console.log('submitted')}
          >
            <label htmlFor="todo">
              Todo Text:
             </label>
             <input type='checkbox' defaultValue={data.completed ? 'on' : ''} name='completed' /> 
            <input id='todo' type='text' name='todo' placeholder='edit' defaultValue={data.todo} className="bg-slate-500 px-2 py-2 rounded" />
            <label htmlFor="priority">Priority:</label>
            <select name="priority" id="priority" className="bg-slate-500 px-2 py-2 rounded" defaultValue={data.priority}>
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