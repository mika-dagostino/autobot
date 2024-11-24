import '@/styles/globals.css';
import localFont from 'next/font/local';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: '../public/Transformers-Movie.ttf', display: 'swap' });

export default function App({ Component, pageProps }) {
	return (
		<div className={myFont.className}>
			<Component {...pageProps} />
		</div>
	);
}
