import type React from 'react';

export default function Banner({
	title,
	cn,
}: {
	title: string | React.ReactNode;
	cn?: string;
}) {
	return (
		<div
			className={`px-8 py-12 bg-emerald-700 text-white min-h-[50vh] flex items-center ${cn}`}
		>
			<h1 className='text-2xl md:text-4xl lg:text-6xl text-center font-bold'>
				{title}
			</h1>
		</div>
	);
}
