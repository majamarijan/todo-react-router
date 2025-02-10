import type React from "react";


export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
		<div className='grid grid-rows-[100px_1fr] px-4 sm:px-8 md:grid-rows-1 row-[2] grid-cols-1 md:grid-cols-[auto_2fr] bg-slate-700'>
			
			{children}
		</div>
	);
}