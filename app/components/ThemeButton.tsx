import { useTheme } from "~/context/themeContext";

export default function ThemeButton() {
  const {theme, toggleTheme} = useTheme();
  return (
    <div className="order-1 sm:order-2 py-2 relative w-[60px] flex items-center rounded-lg border border-slate-300">
					<div className={`${theme === 'dark' ? 'bg-blue translate-x-full' : 'bg-yellow translate-x-0'} rounded-lg transition-all duration-300 absolute top-0 left-0 z-1 w-1/2 h-full `}></div>
					<button className="relative z-10 flex flex-row items-center justify-around w-full"
						title='toggle theme'
						onClick={()=> {
							const val = theme === 'dark' ? 'light' : 'dark';
							toggleTheme(val);
						}}
					>
						<span>🌞</span>
						<span>🌛</span>
						</button>

				</div>
  )
}