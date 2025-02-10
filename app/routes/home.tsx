import { Form, NavLink, Outlet, useLoaderData, useNavigation } from 'react-router';
import type { Route } from './+types/home';
import Content from '~/components/Content';
import type { TodoRecord } from '~/db';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}



export default function Home() {
	return (
		<Content>
			<h1>Welcome to Todo App with React Router!! 💖</h1>
		</Content>
	);
}
