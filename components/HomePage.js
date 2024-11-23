import { useState, useRef, useEffect } from 'react';
import styles from './HomePage.module.css';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import UploadIcon from '@mui/icons-material/Upload';
import LoadingDots from './LoadingDots';
import LogoutIcon from '@mui/icons-material/Logout';
import ModalPopup from './ModalPopup';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';

export default function HomePage() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);
	const [thinkingTime, setThinkingTime] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const { fetchData: logoutFetchData, isLoading: logoutIsLoading } = useFetch();

	const dummyResponse =
		'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ullam quibusdam iusto qui quo culpa recusandae! Obcaecati quod eligendi eaque amet cupiditate vero nihil odio, voluptates accusantium, porro ipsam mollitia?';
	const { displayedText, isTyping } = useTypingAnimation(
		messages[messages.length - 1]?.role === 'assistant' ? messages[messages.length - 1].content : ''
	);

	const handleSubmit = async e => {
		e.preventDefault();
		if (isTyping) return;
		if (!input.trim()) return;

		const newMessages = [...messages, { role: 'user', content: input }];
		setMessages(newMessages);
		setInput('');
		setIsLoading(true);

		const timer = setInterval(() => {
			setThinkingTime(prev => prev + 1);
		}, 1000);

		// Simulating API call to backend
		await new Promise(resolve => setTimeout(resolve, 5000));
		// TODO: Replace with actual API call to backend

		clearInterval(timer);
		setThinkingTime(0);

		setMessages(snapshot => {
			return [...snapshot, { role: 'assistant', content: dummyResponse }];
		});
		setIsLoading(false);
	};

	console.log(thinkingTime);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	async function logout() {
		const data = await logoutFetchData('/api/logout');
		if (data?.status === 'success') router.reload();
	}

	return (
		<div className={styles.container}>
			<ModalPopup
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="Logout"
				disabled={logoutIsLoading}
				description="Are you sure you want to logout?"
				primaryButtonText={logoutIsLoading ? 'Logging out...' : 'Logout'}
				secondaryButtonText="Cancel"
				onPrimaryAction={logout}
			/>
			<header className={styles.header}>
				<div className={styles.headerContent}>
					<h1 className={styles.logo}>The Whoppers</h1>
					<nav className={styles.nav}>
						<button onClick={() => setIsOpen(true)} className={styles.authButton}>
							Logout
						</button>
						<button onClick={() => setIsOpen(true)} className={styles.menuButton}>
							<LogoutIcon className={styles.menuIcon} />
						</button>
					</nav>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.chatContainer}>
					{messages.map((message, index) => (
						<div key={index} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
							{message.role === 'assistant' && index === messages.length - 1 ? displayedText : message.content}
						</div>
					))}
					{isLoading && (
						<div className={styles.loadingDotsContainer}>
							<p className={styles.thinkingTag}>{`Thinking for: ${thinkingTime} seconds`}</p>
							<LoadingDots />
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>
				<form onSubmit={handleSubmit} className={styles.inputForm}>
					<input
						type="text"
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Type your message..."
						className={styles.input}
					/>
					<button type="submit" className={styles.sendButton} disabled={isLoading || isTyping}>
						<UploadIcon />
					</button>
				</form>
			</main>
		</div>
	);
}
