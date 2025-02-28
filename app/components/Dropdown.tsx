export default function Dropdown({toggle, children}: {toggle:boolean, children: React.ReactNode}) {
  return (
    <div className={`${toggle ? 'flex opacity-100' : 'opacity-0'} absolute bottom-0 top-[124%] text-sm min-w-[170px] h-fit z-10 rounded-md right-0 bg-slate-800 border border-slate-300 flex-col items-stretch justify-start py-4 px-3 gap-3 transition-all duration-400 ease-in-out`}>
      {children}
    </div>
  )
}