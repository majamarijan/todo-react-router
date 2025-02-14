import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}



export default function Home() {
	return (
			<h1 className='text-xl sm:text-2xl md:text-3xl max-w-prose text-center'> 
			<span className='hidden md:block'>Welcome to Todo App <br /> with React Router!! 💖</span>
			<span className='md:hidden block'>Search for Todos</span></h1>
	);
}
