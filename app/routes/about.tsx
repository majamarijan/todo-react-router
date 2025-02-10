import Banner from '~/components/Banner';
import { NavLink, useNavigation } from 'react-router';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'About' },
		{ name: 'description', content: 'Welcome to React Router! - About' },
	];
}

export default function About() {
	return (
		<div>
			<Banner title='About Page' />
		</div>
	);
}
