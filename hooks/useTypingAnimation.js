import { useState, useEffect } from 'react';

export function useTypingAnimation(text, speed = 20) {
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		if (!text) return;

		setIsTyping(true);
		let i = -1;
		const timer = setInterval(() => {
			if (i < text.length) {
				setDisplayedText(prev => prev + text.charAt(i));
				i++;
			} else {
				clearInterval(timer);
				setIsTyping(false);
			}
		}, speed);

		return () => {
			clearInterval(timer);
			setDisplayedText('');
			setIsTyping(false);
		};
	}, [text, speed]);

	return { displayedText, isTyping };
}
