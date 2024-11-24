import { useState, useEffect } from 'react';

export function useTypingAnimation(text, speed = 20) {
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		if (!text) return;

		setIsTyping(true);
		let i = -1;
		const splitText = text.split(' ') || [];
		const timer = setInterval(() => {
			if (i < splitText.length - 1) {
				setDisplayedText(prev => prev + splitText[i] + ' ');
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
