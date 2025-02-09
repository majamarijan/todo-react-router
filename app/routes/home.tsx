import Content from '~/components/Content';
import type { Route } from './+types/home';
import { Form, NavLink } from 'react-router';

import { getAllTodos, type TodoRecord } from '~/db';
import Dashboard from '~/layouts/dashbord';
import { useEffect, useState } from 'react';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}
export async function loader({}: Route.LoaderArgs) {
	const todos = await getAllTodos();
	return { todos };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const data = loaderData;
	const [todos, setTodos] = useState<TodoRecord[]>([]);

	useEffect(() => {
		if (data) {
			setTodos(data.todos);
		}
	}, []);

	return (
		<Dashboard>
			<div className='px-4 sm:px-0 pt-8 md:row-[1]'>
				<Form className='flex flex-row items-center relative' method='get'>
					<button className='flex items-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-6 absolute left-2 z-2'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
							/>
						</svg>
					</button>
					<input
						type='search'
						name='q'
						placeholder='Search'
						aria-label='Search todos'
						className='border-none rounded-full px-1 py-2 outline-1 pl-12'
					/>
				</Form>
				<div className='todos pt-8'>
					{todos.slice(0, 10).map((todo: TodoRecord) => {
						return (
							<p
								className='text-center text-md py-6 border-b border-b-slate-400/40 hover:bg-slate-300/50 cursor-pointer backdrop-blur-2xl'
								key={todo.id}
							>
								{todo.createdAt}
							</p>
						);
					})}
				</div>
			</div>
			<Content>
				<div>
					<h2>Home</h2>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi,
						perspiciatis debitis odio dicta deserunt magnam impedit aperiam hic
						consectetur, ab corporis aliquam eligendi sint quibusdam ex
						reiciendis provident nemo quas?
					</p>
				</div>
			</Content>
		</Dashboard>
	);
}
