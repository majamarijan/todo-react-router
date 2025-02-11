import { Outlet } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { useTheme } from '~/context/themeContext';

export default function Layout() {
	const {theme} = useTheme();
	return (
		<div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} grid grid-rows-[100px_1fr_auto] min-h-screen`}>
			<Header />
				<Outlet />
			<Footer />
		</div>
	);
}
