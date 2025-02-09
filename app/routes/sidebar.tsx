import { Form } from "react-router";
import { getAllTodos, type TodoRecord } from "~/db";
import type { Route } from "../+types/root";

export async function loader({ }: Route.LoaderArgs) {
  const todos = await getAllTodos();
  return { todos };
}

export default function Sidebar({ loaderData }: { loaderData:Route.ComponentProps }) {
  const data = loaderData;
  console.log(data)
  return (
		<div className='px-4 sm:px-0 pt-8 md:row-[1]'>
      <Form className='flex flex-row items-center relative'
      method="get">
        <button className="flex items-center">
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
          className='size-6 absolute left-2 z-2'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
					/>
				</svg>

        </button>
        <input
					type='search'
					name='q'
					placeholder='Search'
					aria-label='Search todos'
					className='border-none rounded-full px-1 py-2 outline-1 pl-12'
				/>
      </Form>
      <div className='todos pt-8'>
        
      </div>
		</div>
	);
}