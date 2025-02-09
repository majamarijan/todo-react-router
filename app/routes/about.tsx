import Banner from '~/components/Banner';
import { NavLink } from 'react-router';

export default function About() {
	return (
		<div>
			<NavLink to='/'>Home</NavLink>
			<Banner title='About Page' />
		</div>
	);
}
