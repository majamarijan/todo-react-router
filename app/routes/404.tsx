import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="bg-black text-slate-200 py-8 px-12 rounded-md flex flex-col gap- justify-center items-center h-[100vh] gap-8">
      <p className="text-center text-4xl sm:text-5xl">404 <br /> Page Not Found</p>
      <NavLink to={'/'} className="px-4 py-2 rounded border border-slate-400">Back</NavLink>
    </div>
  )
}