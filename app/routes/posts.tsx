import Banner from '~/components/Banner';
import { NavLink, useNavigation } from 'react-router';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Posts' },
		{ name: 'description', content: 'Posts Page' },
	];
}

export default function About() {
	return (
		<div>
			<Banner title='Posts Page' />
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quidem ea nihil minus, aliquam dolorum pariatur reiciendis fugit nam praesentium natus non explicabo! Dolor dolorem nostrum itaque quod quis voluptates.</p>
		</div>
	);
}
