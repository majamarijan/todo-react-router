import type React from "react";

export default function Content({ cn,children }: { cn?:string; children: React.ReactNode }) {
	return <main className={`px-0 ${cn ? cn : ''}`}>{children}</main>;
}