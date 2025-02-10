import type React from "react";

export default function Content({ cn,children }: { cn?:string; children: React.ReactNode }) {
	return <main className={`max-w-prose px-0 md:px-20 py-12 md:row-[1] ${cn && cn}`}>{children}</main>;
}