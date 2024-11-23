import HomePage from '@/components/HomePage';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>CodeJam 14</title>
				<meta name="description" content="CodeJam14 Project" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<main>
					<HomePage />
				</main>
			</div>
		</>
	);
}
