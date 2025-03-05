import type { T } from "node_modules/react-router/dist/development/route-data-Cq_b5feC.mjs";
import { prismaClient } from "./db/index";
import { formatDate, generateDate, sortTodos } from "./utils/utils";


export type TodoRecord = {
	id?: string;
	todo: string;
	completed: boolean;
	createdAt: string;
	updatedAt?: string | null;
	priority: Priority;
	userId: number;
	todoId?: string | null;
};

export type User = {
	user_id?: number;
	username: string;
	password: string;
	email: string;
	image: string;
	id?: string;
}

type Priority = 'low' | 'medium' | 'high';


const todosDB = {
	records: {} as Record<string, TodoRecord>,
	async findAll(id?:number): Promise<TodoRecord[]> {
		if(Object.keys(todosDB.records).length <= 0) {
			console.log('records are empty');
			// fetch todos from DB if records are empty
			console.log('fetching todos');
			const todos=await prismaClient.todos.findMany({where: {userId: id}});
			if(todos.length > 0) {
				todos.forEach(todo=> {
				todosDB.records[todo.id] = todo;
			});
		}
	}
		return Object.keys(todosDB.records).map((key) => todosDB.records[key]);
	},
	async add(): Promise<TodoRecord> {
		const id = crypto.randomUUID();
		const date = new Date().toString();
		const todo:TodoRecord = {todo: '', todoId:id, completed: false, priority:'low', createdAt: date, updatedAt: null, userId:1};
		todosDB.records[id] = todo;
		return todo;
	},

	async find(id: string) {
		if(Object.keys(todosDB.records).length === 0) {
			return {};
		}
		const todo = todosDB.records[id];
		return todo;
	},

	async update(userId:number, id:string, todo: TodoRecord) {
		const oldTodo:TodoRecord | {} = await todosDB.find(id);
		const updatedAt = generateDate().toString();
		const	newTodo:TodoRecord = {...oldTodo, ...todo, updatedAt, userId: userId, todoId: id};
		todosDB.records[id] = newTodo;
		return newTodo;
		},

	async delete(id: string) {
		const todo = todosDB.records[id];
		if(!todo) {
			throw new Error('Todo not found');
	}
		delete todosDB.records[id];
		return null;
	}
};

export async function getAllTodos(userId:number,q?:string) {
	await new Promise((resolve) => setTimeout(resolve, 400));
	//const todos = await todosDB.findAll(userId);
	const todos = await prismaClient.todos.findMany({where: {userId: userId}});
	const todosByDates = todos.map(t=> ({...t,createdAt: new Date(t.createdAt).toDateString()}));
	if(todos.length > 0) {
		const sortedTodos = sortTodos(todosByDates);	
	
	if (q) {
		return sortedTodos.filter((todo) => todo.createdAt.includes(q.toLowerCase()) || todo.updatedAt?.includes(q.toLowerCase()));
  }
	return sortedTodos;
	}else {
		return {todos: []};
	}
}

export async function getTodo(id:string) {
	await new Promise((resolve) => setTimeout(resolve, 600));
	//return await todosDB.find(id);	
	if(id === undefined) return null;
	const todo = await prismaClient.todos.findFirst({where: {id: id}}) as TodoRecord | null;
	return todo;
}

export async function createTodo(userId:number) {
	//return await todosDB.add();
	const newTodo = {todo:'', todoId: crypto.randomUUID(), completed: false, priority: 'low', createdAt: formatDate(new Date().toString()), updatedAt: null, userId: userId} as TodoRecord;
	const todo = await prismaClient.todos.create({data: newTodo}) as TodoRecord;
	return todo;
}


export async function editTodo(userId:number,id: string, obj: TodoRecord) {
	// return await todosDB.update(userId, id, todo);
	const todo = await prismaClient.todos.findFirst({where: {id: id, userId: userId}});
	const updatedDate = formatDate(new Date().toString());
	const newTodo = {...obj, updatedAt: updatedDate};
	const updatedTodo = await prismaClient.todos.update({where: {id: id}, data: newTodo}) as TodoRecord;
	updatedTodo.id = id;
	return updatedTodo;
}

export async function removeTodo(id:string) {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return  await prismaClient.todos.delete({where: {id: id}});
	// return await todosDB.delete(id);
}


export async function getUserId({username, password}: {username: string, password: string}):Promise<{userId:string | undefined} | null> {
	const user = await prismaClient.users.findFirst({
		where: 
		{username: username, password: password},
		select: {
			user_id: true
		}
	}
	);
	if(!user || !user.user_id) {
		return null;
	}
	return {userId: String(user?.user_id)};
}

export async function getUser(id:string):Promise<User> {
	const user = await prismaClient.users.findFirst({where: {user_id: Number(id)}}) as User;
	return user;
}








	// [{"id":'0388a074-86e4-4136-b4f2-3116bf42b04d',"todo":"Do something nice for someone you care about","completed":false,"priority":"low", "userId":1, "createdAt":"Thu Feb 10 2022 10:50:16 GMT+0100"},{"id":"43d914f3-8eb6-45cd-ba9b-a44f3da09d5c","todo":"Memorize a poem","completed":true,"priority":"medium","userId":13, "createdAt":"Mon Jan 27 2025 22:16:31 GMT+0100"},{"id":"5467f050-2184-40d1-bbbe-4840326b50bb","todo":"Watch a classic movie","completed":true, "priority":"high","userId":68, "createdAt":"Wed Jun 28 2022 22:07:41 GMT+0200"},{"id":"a8978228-b644-4413-9627-dff685a5cd0a","todo":"Watch a documentary","completed":false,"priority":"low","userId":84, "createdAt":"Thu Mar 29 2022 15:06:31 GMT+0200"},{"id":'c8069329-b270-4d36-b8b6-c3de286bce25',"todo":"Invest in cryptocurrency","completed":false,"priority":"medium","userId":163, "createdAt":"Sun Apr 30 2023 01:10:15 GMT+0200 "},{"id":"c0d533ac-e70d-43b4-b068-e37a04ee0f9d","todo":"Contribute code or a monetary donation to an open-source software project","completed":false,"priority":"high","userId":69, "createdAt":"Wed Apr 12 2023 17:53:07 GMT+0200"},{"id":"b8dec22a-acaa-4b81-a29e-c6186e7f81d4","todo":"Solve a Rubik's cube","completed":true,"priority":"low","userId":76, "createdAt":"Mon May 01 2023 20:14:39 GMT+0200"},{"id":"d13122d9-0632-4097-b011-4a9857c87f49","todo":"Bake pastries for yourself and neighbor","completed":true,"priority":"medium","userId":198, "createdAt":"Sat Aug 17 2024 02:32:49 GMT+0200"},{"id":"81b6f3f7-2317-4005-9f4f-82a733928294","todo":"Go see a Broadway production","completed":false, "priority":"high","userId":7, "createdAt":"Tue Sep 05 2023 10:12:04 GMT+0200"},{"id":"1b529308-d467-43b2-b069-31f4ac154fcc","todo":"Write a thank you letter to an influential person in your life","completed":true,"priority":"high","userId":9, "createdAt":"Fri Jul 28 2023 22:46:44 GMT+0200"}].forEach((todo)=> {
	// 	const priority = todo.priority as 'low' | 'medium' | 'high';
	// 	todosDB.records[todo.id] = { ...todo, priority };
	// 	return todo;
	// })
