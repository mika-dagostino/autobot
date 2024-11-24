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
	const messagesEndRef = useRef(null);
	const [thinkingTime, setThinkingTime] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const { fetchData: logoutFetchData, isLoading: logoutIsLoading } = useFetch();
	const { fetchData, isLoading } = useFetch();

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

		const timer = setInterval(() => {
			setThinkingTime(prev => prev + 1);
		}, 1000);

		try {
			const data = await fetchData('/api/chat', {
				method: 'POST',
				body: JSON.stringify({ prompt: input, chatHistory: newMessages }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (data.status === 'fail') {
				clearInterval(timer);
				setThinkingTime(0);
				setMessages(snapshot => {
					return [...snapshot, { role: 'assistant', content: data.message }];
				});
				return;
			}

			const content = data?.response || 'Sorry, we are having technical difficulties, please try to login again later';

			clearInterval(timer);
			setThinkingTime(0);

			setMessages(snapshot => {
				return [...snapshot, { role: 'assistant', content }];
			});
		} catch (error) {
			clearInterval(timer);
			setThinkingTime(0);
			setMessages(snapshot => {
				return [...snapshot, { role: 'assistant', content: 'Sorry, we are having technical difficulties, please try to login again later' }];
			});
		}
	};

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
					<h1 className={styles.logo}>AutoBot</h1>
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
				<div className={styles.chillGuy}>
					<img src="/chillguy.png" alt="Chill Guy" className={styles.chillGuyImage} />
				</div>
				<div className={styles.chatContainer}>
					{messages.map((message, index) => (
						<div className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
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
