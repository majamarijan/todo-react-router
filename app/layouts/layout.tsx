import { Outlet, useLoaderData } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { useTheme } from '~/context/themeContext';
import type { Route } from '../+types/root';
import { useEffect } from 'react';

export async function clientLoader({ params}: Route.ClientLoaderArgs) {
	const localTheme = localStorage.getItem('theme');
	return { localTheme};
}

clientLoader.hydrate = true as const;

export default function Layout({loaderData}: Route.ComponentProps) {
	const {theme, toggleTheme} = useTheme();
	const clientData = loaderData as unknown as {localTheme: string};
	useEffect(()=> {
		if(clientData.localTheme === 'dark') {
			document.documentElement.setAttribute('data-theme', 'dark');
			toggleTheme('dark');
		}else {
				document.documentElement.setAttribute('data-theme','light')
 			toggleTheme('light');
		}
	},[clientData]);
	useEffect(()=> {
			localStorage.setItem('theme', theme);
			document.documentElement.setAttribute('data-theme',theme);
	},[theme])
	return (
		<div className={`grid grid-rows-[100px_1fr_80px] min-h-screen`}>
			<Header />
				<Outlet />
			<Footer />
		</div>
	);
}
