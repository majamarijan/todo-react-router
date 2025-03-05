import { prismaClient } from "./db/index";
import { formatDate, generateDate, sortTodos } from "./utils/utils";


export type TodoRecord = {
	id?: string;
	todo: string;
	completed: boolean;
	createdAt: string;
	updatedAt?: string | null;
	priority: Priority;
	userId: string;
	recordId? :string;
};

export type User = {
	username: string;
	password?: string;
	email: string;
	image: string;
	id: string;
	todos: TodoRecord[]
}

type Priority = 'low' | 'medium' | 'high';


const todosDB = {
	records: {} as Record<string, TodoRecord>,
	async findAll(id?:string): Promise<TodoRecord[]> {
		if(Object.keys(todosDB.records).length <= 0) {
			console.log('records are empty');
			// fetch todos from DB if records are empty
			console.log('fetching todos');
			todosDB.records = {};
			const todos=await prismaClient.todo.findMany({where: {userId: id}});
			if(todos.length > 0) {
				todos.forEach(todo=> {
				const _id = crypto.randomUUID();
				todosDB.records[_id] = todo;
			});
		}
	}
		return Object.keys(todosDB.records).map((key) => todosDB.records[key]);
	},

	async add(userId:string): Promise<TodoRecord> {
		const id = crypto.randomUUID();
		const date = new Date().toString();
		const newTodo = {todo:'', completed: false, priority: 'low', createdAt: date, updatedAt: null, userId: userId} as TodoRecord;
		todosDB.records[id] = newTodo;
		return newTodo;
	},

	async find(id: string) {
		if(Object.keys(todosDB.records).length === 0) {
			return {};
		}
		const todo = Object.values(todosDB.records).find((todo) => todo.id === id);
		return todo;
	},

	async update(userId:string, id:string, obj: TodoRecord) {
		const todo:TodoRecord | undefined | {} = await todosDB.find(id);
		const recordId = Object.keys(todosDB.records).find((key) => todosDB.records[key].id === id);
			const updatedDate = new Date().toString();
			if(todo) {
				const newTodo = {...todo,...obj, userId: userId, updatedAt: updatedDate};
				todosDB.records[recordId as string] = newTodo;
				newTodo.id = id;
				return newTodo;
			}else {
				return null;
			}
		},

	async delete(id: string) {
		const todo = Object.values(todosDB.records).find((t) => t.id === id);
		const recordID = Object.keys(todosDB.records).find((key) => todosDB.records[key].id === id);
		if(!todo){
			throw new Error('Todo not found');
		}
		delete todosDB.records[recordID as string];
		return null;
	}
};

export async function getAllTodos(id:string,q?:string) {
	await new Promise((resolve) => setTimeout(resolve, 400));
	const todos = await todosDB.findAll(id);
	console.log(todosDB.records)
	//const todos = await prismaClient.todo.findMany({where: {userId: id}});
	if(todos.length > 0) {
		const sortedTodos = sortTodos(todos);	
	
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
	if(id === undefined) return null;
	return await todosDB.find(id);	
	
	// const todo = await prismaClient.todo.findFirst({where: {id: id}}) as TodoRecord | null;
	// return todo;
}

export async function createTodo(userId:string) {
	return await todosDB.add(userId);
	// const newTodo = {todo:'', completed: false, priority: 'low', createdAt: new Date().toString(), updatedAt: null, userId: userId} as TodoRecord;
	// const todo = await prismaClient.todo.create({data: newTodo}) as TodoRecord;
	// return todo;
}


export async function editTodo(userId:string,id: string, obj: TodoRecord) {
	return await todosDB.update(userId, id, obj);
	// const todo = await prismaClient.todo.findFirst({where: {id: id, userId: userId}, omit: {id: true}}) as TodoRecord | null;
	// const updatedDate = new Date().toString();
	// if(todo) {
	// 	const newTodo = {...todo,...obj, updatedAt: updatedDate};
	// 	const updatedTodo = await prismaClient.todo.update({where: {id: id}, data: newTodo}) as TodoRecord;
	// 	updatedTodo.id = id;
	// 	return updatedTodo;
	// }else {
	// 	return null;
	// }
}

export async function removeTodo(id:string) {
	await new Promise((resolve) => setTimeout(resolve, 300));
	//return  await prismaClient.todo.delete({where: {id: id}});
	return await todosDB.delete(id);
}


export async function getUserId({username, password}: {username: string, password: string}):Promise<{userId:string | undefined} | null> {
	const user = await prismaClient.user.findFirst({
		where: 
		{username: username, password: password},
		select: {
			id: true
		}
	}
	);
	if(!user || !user.id) {
		return null;
	}
	return {userId: String(user?.id)};
}

export async function getUser(id:string):Promise<User> {
	const user = await prismaClient.user.findFirst({where: {id: id}, omit: {password: true}}) as User;
	if(!user) {
		throw new Error('User not found');
	}
	return user;
}








	// [{"id":'0388a074-86e4-4136-b4f2-3116bf42b04d',"todo":"Do something nice for someone you care about","completed":false,"priority":"low", "userId":1, "createdAt":"Thu Feb 10 2022 10:50:16 GMT+0100"},{"id":"43d914f3-8eb6-45cd-ba9b-a44f3da09d5c","todo":"Memorize a poem","completed":true,"priority":"medium","userId":13, "createdAt":"Mon Jan 27 2025 22:16:31 GMT+0100"},{"id":"5467f050-2184-40d1-bbbe-4840326b50bb","todo":"Watch a classic movie","completed":true, "priority":"high","userId":68, "createdAt":"Wed Jun 28 2022 22:07:41 GMT+0200"},{"id":"a8978228-b644-4413-9627-dff685a5cd0a","todo":"Watch a documentary","completed":false,"priority":"low","userId":84, "createdAt":"Thu Mar 29 2022 15:06:31 GMT+0200"},{"id":'c8069329-b270-4d36-b8b6-c3de286bce25',"todo":"Invest in cryptocurrency","completed":false,"priority":"medium","userId":163, "createdAt":"Sun Apr 30 2023 01:10:15 GMT+0200 "},{"id":"c0d533ac-e70d-43b4-b068-e37a04ee0f9d","todo":"Contribute code or a monetary donation to an open-source software project","completed":false,"priority":"high","userId":69, "createdAt":"Wed Apr 12 2023 17:53:07 GMT+0200"},{"id":"b8dec22a-acaa-4b81-a29e-c6186e7f81d4","todo":"Solve a Rubik's cube","completed":true,"priority":"low","userId":76, "createdAt":"Mon May 01 2023 20:14:39 GMT+0200"},{"id":"d13122d9-0632-4097-b011-4a9857c87f49","todo":"Bake pastries for yourself and neighbor","completed":true,"priority":"medium","userId":198, "createdAt":"Sat Aug 17 2024 02:32:49 GMT+0200"},{"id":"81b6f3f7-2317-4005-9f4f-82a733928294","todo":"Go see a Broadway production","completed":false, "priority":"high","userId":7, "createdAt":"Tue Sep 05 2023 10:12:04 GMT+0200"},{"id":"1b529308-d467-43b2-b069-31f4ac154fcc","todo":"Write a thank you letter to an influential person in your life","completed":true,"priority":"high","userId":9, "createdAt":"Fri Jul 28 2023 22:46:44 GMT+0200"}].forEach((todo)=> {
	// 	const priority = todo.priority as 'low' | 'medium' | 'high';
	// 	todosDB.records[todo.id] = { ...todo, priority };
	// 	return todo;
	// })
