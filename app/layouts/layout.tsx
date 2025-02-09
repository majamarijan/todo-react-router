import { Outlet } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';

export default function Layout() {
	return (
		<div className='grid grid-rows-[100px_1fr_auto] min-h-screen'>
			<Header />
				<Outlet />
			<Footer />
		</div>
	);
}
