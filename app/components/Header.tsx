import { NavLink, useLocation } from "react-router";

export default function Header() {
	const location = useLocation();
  return (
		<header className='px-8 bg-slate-800 flex items-center justify-between row-[1]'>
			<span>Logo</span>
			<nav className='flex-row hidden sm:flex items-center gap-4 border border-slate-300'>
				<ul className='grid grid-cols-[80px_80px_80px] items-center justify-start w-fit '>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${isActive && location.pathname === '/' || location.pathname.startsWith('/todo') ? 'bg-orange-400' : ''
								} p-2 no-underline text-slate-50 hover:text-white hover:font-bold  text-center`;
						}}
						to='/'
					>
						Home
					</NavLink>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${
								isActive ? 'bg-orange-400' : ''
							} p-2 no-underline text-slate-50 hover:text-white hover:font-bold  text-center`;
						}}
						to='/about'
					>
						About
					</NavLink>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${
								isActive ? 'bg-orange-400' : ''
							} p-2 no-underline text-slate-50 hover:text-white hover:font-bold  text-center`;
						}}
						to='/contact'
					>
						Contact
					</NavLink>
				</ul>
				<button>🌞 🌛</button>
			</nav>
		</header>
	);
}