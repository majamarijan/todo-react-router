import { Form } from "react-router";

export default function AddTodo() {
  return (
    <Form method='post' className="flex order-2 sm:order-1">
        <input type="submit" value='Add New' className="w-full p-2 rounded font-bold bg-orange-600 text-primaryLight cursor-pointer" />
			</Form>
  )
}