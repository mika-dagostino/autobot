import HomePage from '@/components/HomePage';
import Onboarding from '@/components/OnboardingPage';
import { verifyJWT } from '@/helpers/jwt';
import Head from 'next/head';

export default function Home({ isUserLoggedIn }) {
	return (
		<>
			<Head>
				<title>CodeJam 14</title>
				<meta name="description" content="CodeJam14 Project" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<main>{isUserLoggedIn ? <HomePage /> : <Onboarding />}</main>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	let isUserLoggedIn = false;

	try {
		const user = await verifyJWT(context.req);
		isUserLoggedIn = user ? true : false;
	} catch (error) {
		isUserLoggedIn = false;
	}

	return {
		props: {
			isUserLoggedIn,
		},
	};
}
