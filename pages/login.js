import LoginPage from '@/components/LoginPage';
import Head from 'next/head';

export default function Login() {
	return (
		<>
			<Head>
				<title>CodeJam 14 · Login</title>
				<meta name="description" content="CodeJam14 Project" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<main>
					<LoginPage />
				</main>
			</div>
		</>
	);
}
