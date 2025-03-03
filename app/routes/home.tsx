import { getAllTodos, type TodoRecord } from '~/db';
import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export async function loader({}: Route.LoaderArgs) {
	const todos = await getAllTodos('');
	return {todos};
}


export default function Home() {
	const data = useLoaderData() as {todos:TodoRecord[]};
	return (
			<h1 className='text-xl sm:text-2xl md:text-3xl max-w-prose text-center'> 
			<span className='hidden md:block md:max-w-md'>{data?.todos.length <= 0 && 'No Todos Found'}</span>
			<span className='md:hidden block'>Search for Todos</span></h1>
	);
}
