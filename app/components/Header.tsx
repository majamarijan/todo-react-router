import { NavLink, useLocation } from "react-router";
import { useTheme } from "~/context/themeContext";

export default function Header() {
	const location = useLocation();
	const {theme, toggleTheme} = useTheme();
	return (
		<header className={`${theme === 'dark' ? 'bg-black' : 'bg-blue-800'} px-8 flex items-center justify-between row-[1]`}>
			<span>Logo</span>
			<nav className='flex-row hidden sm:flex items-center gap-4'>
				<ul className='grid grid-cols-[80px_80px_80px] items-center justify-start w-fit '>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${isActive && location.pathname === '/' || location.pathname.startsWith('/todo') ? 'bg-orange-400' : ''
								} p-2 no-underline text-slate-50 hover:text-white hover:font-bold  text-center rounded`;
						}}
						to='/'
					>
						Home
					</NavLink>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${
								isActive ? 'bg-orange-400' : ''
							} p-2 no-underline text-slate-50 hover:text-white hover:font-bold  text-center rounded`;
						}}
						to='/about'
					>
						About
					</NavLink>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${
								isActive ? 'bg-orange-400' : ''
							} p-2 no-underline text-slate-50 hover:text-white hover:font-bold  text-center rounded`;
						}}
						to='/contact'
					>
						Contact
					</NavLink>
				</ul>
				<div className="bg-slate-800 py-2 relative w-[60px] flex items-center rounded-lg ">
					<div className={`${theme === 'dark' ? 'bg-blue-800 translate-x-full' : 'bg-white translate-x-0'} rounded-lg transition-all duration-300 absolute top-0 left-0 z-1 w-1/2 h-full `}></div>
					<button className="relative z-10 flex flex-row items-center justify-around w-full"
						onClick={()=> toggleTheme()}
					>
						<span>🌞</span>
						<span>🌛</span>
						</button>

				</div>
			</nav>
		</header>
	);
}