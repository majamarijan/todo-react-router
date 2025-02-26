export type TodoRecord = {
	id: string;
	todo: string;
	completed: boolean;
	createdAt:string;
	updatedAt?: string;
	priority: 'low' | 'medium' | 'high';
};

const todosDB = {
	records: {} as Record<string, TodoRecord>,
	async findAll(): Promise<TodoRecord[]> {
		if(Object.keys(todosDB.records).length === 0) {
			return [];
		}
		return Object.keys(todosDB.records).map((key) => todosDB.records[key]);
	},
	async set(todo?: TodoRecord): Promise<TodoRecord> {
		const id = crypto.randomUUID();
		const date = new Date().toString();
		let createdTodo;
		if(todo) {
			createdTodo = {...todo, id, createdAt: date};
		}else {
			const todo: TodoRecord = {todo: '', id: id, completed: false, priority: 'low', createdAt: date};
			createdTodo = todo;
		}
			todosDB.records[id] = createdTodo;
			return createdTodo;
	},
	async find(id: string) {
		if(Object.keys(todosDB.records).length === 0) {
			return {};
		}
		const todo = todosDB.records[id];
		if(!todo) {
			throw new Error('Todo not found');
		}else {
			return todo;
		}
	},

	async update(id:string, todo: TodoRecord) {
		const oldTodo = await todosDB.find(id);
		if(!oldTodo) {
			throw new Error('Todo not found');
		}else {
			const updatedAt = generateDate().toString();
			const newTodo = {...oldTodo, ...todo,  updatedAt};
			todosDB.records[id] = newTodo;
			return newTodo;
		}
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

export async function getAllTodos(q?:string) {
	await new Promise((resolve) => setTimeout(resolve, 400));
	const todos = await todosDB.findAll();
	if(todos.length > 0) {
		if (q) {
			return todos.filter((todo) => todo.createdAt.includes(q.toLowerCase()) || todo.updatedAt?.includes(q.toLowerCase()));
		}
	}
	return todos;
}

export async function getTodo(id: string) {
	await new Promise((resolve) => setTimeout(resolve, 600));
	return await todosDB.find(id);	
}

export async function createTodo() {
	return await todosDB.set();
}

export async function editTodo(id: string, todo: TodoRecord) {
	return await todosDB.update(id, todo);
}

export async function removeTodo(id:string) {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return await todosDB.delete(id);
}


function generateDate() {
	const randomDate = (start: Date, end: Date) => {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
	};
	return randomDate(new Date(), new Date());
}







	// [{"id":'0388a074-86e4-4136-b4f2-3116bf42b04d',"todo":"Do something nice for someone you care about","completed":false,"priority":"low", "userId":1, "createdAt":"Thu Feb 10 2022 10:50:16 GMT+0100"},{"id":"43d914f3-8eb6-45cd-ba9b-a44f3da09d5c","todo":"Memorize a poem","completed":true,"priority":"medium","userId":13, "createdAt":"Mon Jan 27 2025 22:16:31 GMT+0100"},{"id":"5467f050-2184-40d1-bbbe-4840326b50bb","todo":"Watch a classic movie","completed":true, "priority":"high","userId":68, "createdAt":"Wed Jun 28 2022 22:07:41 GMT+0200"},{"id":"a8978228-b644-4413-9627-dff685a5cd0a","todo":"Watch a documentary","completed":false,"priority":"low","userId":84, "createdAt":"Thu Mar 29 2022 15:06:31 GMT+0200"},{"id":'c8069329-b270-4d36-b8b6-c3de286bce25',"todo":"Invest in cryptocurrency","completed":false,"priority":"medium","userId":163, "createdAt":"Sun Apr 30 2023 01:10:15 GMT+0200 "},{"id":"c0d533ac-e70d-43b4-b068-e37a04ee0f9d","todo":"Contribute code or a monetary donation to an open-source software project","completed":false,"priority":"high","userId":69, "createdAt":"Wed Apr 12 2023 17:53:07 GMT+0200"},{"id":"b8dec22a-acaa-4b81-a29e-c6186e7f81d4","todo":"Solve a Rubik's cube","completed":true,"priority":"low","userId":76, "createdAt":"Mon May 01 2023 20:14:39 GMT+0200"},{"id":"d13122d9-0632-4097-b011-4a9857c87f49","todo":"Bake pastries for yourself and neighbor","completed":true,"priority":"medium","userId":198, "createdAt":"Sat Aug 17 2024 02:32:49 GMT+0200"},{"id":"81b6f3f7-2317-4005-9f4f-82a733928294","todo":"Go see a Broadway production","completed":false, "priority":"high","userId":7, "createdAt":"Tue Sep 05 2023 10:12:04 GMT+0200"},{"id":"1b529308-d467-43b2-b069-31f4ac154fcc","todo":"Write a thank you letter to an influential person in your life","completed":true,"priority":"high","userId":9, "createdAt":"Fri Jul 28 2023 22:46:44 GMT+0200"}].forEach((todo)=> {
	// 	const priority = todo.priority as 'low' | 'medium' | 'high';
	// 	todosDB.records[todo.id] = { ...todo, priority };
	// 	return todo;
	// })
