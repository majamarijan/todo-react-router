import {
	type RouteConfig,
	index,
	layout,
	route,
} from '@react-router/dev/routes';

export default [
	layout('layouts/layout.tsx', [
		layout('layouts/dashbord.tsx', [
			index('routes/home.tsx'),
			route('todo/:year/:id', 'routes/todo.tsx',
			[
				route('edit', 'routes/edit.tsx'),
				route('delete', 'routes/delete.tsx'),
			]),
		]),
		route('posts', 'routes/posts.tsx'),
	]),
] satisfies RouteConfig;
