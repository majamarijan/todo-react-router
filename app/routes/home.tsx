import { useAuth } from '~/context/AuthProvider';
import type { Route } from './+types/home';
import { getSession } from '~/sessions.server';
import { useLoaderData } from 'react-router';
import { useEffect } from 'react';
import { getUser, type User } from '~/db';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export async function loader({request}: Route.LoaderArgs) {
	const session = await getSession(
    request.headers.get("Cookie")
  );
  if (!session.has("userId")) {
		return {isAuthenticatedSession: false};
	}else {
		return {isAuthenticatedSession: true};
	}
}


export default function Home() {
	const {isAuthenticatedSession} = useLoaderData() as {isAuthenticatedSession: boolean};
	const {isAuthenticated, user, handleAuth} = useAuth();
	console.log(isAuthenticated, isAuthenticatedSession)
	
	useEffect(()=> {	
		if(!isAuthenticatedSession) {
			handleAuth({isAuthenticated: isAuthenticatedSession, user:undefined});			
		}else {
			handleAuth({isAuthenticated: isAuthenticatedSession, user:user});
		}
	},[isAuthenticatedSession]);

	return (
			<h1 className='text-xl sm:text-2xl md:text-3xl max-w-prose text-center'> 
				{isAuthenticatedSession ? 'Search Todos' : 'Welcome! Please, login to continue.'}
			</h1>
	);
}
