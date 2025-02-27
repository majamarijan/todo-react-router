import type { TodoRecord } from "~/db";

export function sortTodos(todos: TodoRecord[]) {
  return  todos?.sort((a,b)=> (
    (!a.updatedAt && !b.updatedAt) && new Date(a.createdAt).toISOString() > new Date(b.createdAt).toISOString() ? -1 : 1 &&
    (!a.updatedAt && b.updatedAt) && new Date(a.createdAt).toISOString() > new Date(b.updatedAt).toISOString() ? -1 : 1 &&
    (a.updatedAt && !b.updatedAt) && new Date(a.updatedAt).toISOString() > new Date(b.createdAt).toISOString() ? -1 : 1 && 
    (a.updatedAt && b.updatedAt) && new Date(a.updatedAt).toISOString() > new Date(b.updatedAt).toISOString() ? -1 : 1
  ));
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		// weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
} 