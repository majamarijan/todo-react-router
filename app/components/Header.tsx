import { NavLink, useLocation } from "react-router";
import { useTheme } from "~/context/themeContext";

export default function Header() {
	const location = useLocation();
	const {theme, toggleTheme} = useTheme();
	return (
		<header className={`dark:bg-black bg-secondaryLight text-primary dark:text-primaryLight px-8 flex items-center justify-between row-[1]`}>
			<span className="font-mono text-xl">🗒️TX</span>
			<nav className='flex-row hidden sm:flex items-center gap-4'>
				<ul className='grid [grid-auto-columns:80px] grid-flow-col-dense items-center justify-start w-fit '>
					<NavLink
						className={({ isActive }: { isActive: boolean }) => {
							return `${isActive && location.pathname === '/' || location.pathname.startsWith('/todo') ? 'bg-orange-400' : ''
								} p-2 no-underline hover:font-bold  text-center rounded`;
						}}
						to='/'
					>
						Home
					</NavLink>
				</ul>
				<div className="py-2 relative w-[60px] flex items-center rounded-lg ">
					<div className={`${theme === 'dark' ? 'bg-blue translate-x-full' : 'bg-yellow translate-x-0'} rounded-lg transition-all duration-300 absolute top-0 left-0 z-1 w-1/2 h-full `}></div>
					<button className="relative z-10 flex flex-row items-center justify-around w-full"
						onClick={()=> {
							const val = theme === 'dark' ? 'light' : 'dark';
							toggleTheme(val);
						}}
					>
						<span>🌞</span>
						<span>🌛</span>
						</button>

				</div>
			</nav>
		</header>
	);
}