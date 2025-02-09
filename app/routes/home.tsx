import Content from '~/components/Content';
import type { Route } from './+types/home';
import Sidebar from '~/routes/sidebar';

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'New React Router App' },
		{ name: 'description', content: 'Welcome to React Router!' },
	];
}

export default function Home() {
	return (
    <Content>
      <div>
				<h2>Home</h2>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi,
					perspiciatis debitis odio dicta deserunt magnam impedit aperiam hic
					consectetur, ab corporis aliquam eligendi sint quibusdam ex reiciendis
					provident nemo quas?
				</p>

      </div>
      </Content>
	);
}
