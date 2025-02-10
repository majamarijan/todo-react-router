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
			route('todo/:id', 'routes/todo.tsx', [
				route('edit', 'routes/edit.tsx'),
				route('delete', 'routes/delete.tsx'),
			]),
		]),
		route('about', 'routes/about.tsx'),
	]),
] satisfies RouteConfig;
