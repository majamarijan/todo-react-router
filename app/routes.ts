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
			route('/login', 'routes/login.tsx'),
			route('/logout', 'routes/logout.tsx'),
			route('todo/:year/:id', 'routes/todo.tsx',
			[
				route('edit', 'routes/edit.tsx'),
				route('delete', 'routes/delete.tsx'),
			]),
			route('user/profile', 'routes/profile.tsx'),
		]),
	]),
	route('*', 'routes/404.tsx'),
] satisfies RouteConfig;
