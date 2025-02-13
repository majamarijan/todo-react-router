import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}



export default function Home() {
	return (
			<h1 className='hidden md:block text-xl sm:text-2xl md:text-3xl lg:text-5xl lg:leading-[1.5] xl:text-6xl'>Welcome to Todo App with React Router!! 💖</h1>
	);
}
