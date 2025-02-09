import { create } from 'domain';

export type Todo = {
	todo: string;
	completed: boolean;
};

export type TodoRecord = {
	id: string;
	createdAt: string;
	priority: 'low' | 'medium' | 'high';
} & Todo;

const todosDB = {
	records: {} as Record<string, TodoRecord>,
	async getAll(): Promise<TodoRecord[]> {
		return Object.keys(todosDB.records).map((key) => todosDB.records[key]);
	},
	async createTodo(todo: Todo): Promise<TodoRecord> {
		const id = crypto.randomUUID();
		const createdAt = generateDate();
		const priority = generatePriority();
		const newTodo = { ...todo, id, createdAt, priority };
		todosDB.records[id] = newTodo;
		return newTodo;
	},
};

function generatePriority() {
	const priorities = ['low', 'medium', 'high'] as const;
	return priorities[Math.floor(Math.random() * priorities.length)];
}

function generateDate() {
	const randomDate = (start: Date, end: Date) => {
		return new Date(
			start.getTime() + Math.random() * (end.getTime() - start.getTime())
		);
	};
	return randomDate(new Date(2022, 0, 1), new Date())
		.toDateString()
		.split(' ')
		.slice(1)
		.join('-');
}

export async function getAllTodos() {
	const res = await fetch('https://dummyjson.com/todos?limit=10');
	const data = await res.json();
	const todos = data.todos;
	if (Object.keys(todosDB.records).length <= 0) {
		todos.map(async (todo: Todo) => {
			await todosDB.createTodo(todo);
		});
	}
	return await todosDB.getAll();
}
