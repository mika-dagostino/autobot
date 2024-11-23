'use client';

import React, { useEffect, useRef } from 'react';
import styles from './ModalPopup.module.css';

export default function ModalPopup({
	title,
	description,
	primaryButtonText,
	secondaryButtonText,
	onPrimaryAction,
	onSecondaryAction,
	isOpen,
	setIsOpen,
}) {
	const dialogRef = useRef(null);

	useEffect(() => {
		const handleEscape = event => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	useEffect(() => {
		if (isOpen && dialogRef.current) {
			dialogRef.current.focus();
		}
	}, [isOpen]);

	const handlePrimaryAction = () => {
		onPrimaryAction();
		setIsOpen(false);
	};

	const handleSecondaryAction = () => {
		onSecondaryAction();
		setIsOpen(false);
	};

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{isOpen && (
				<div className={styles.overlay} onClick={handleOverlayClick}>
					<div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex={-1}>
						<h2 id="dialog-title" className={styles.title}>
							{title}
						</h2>
						<p className={styles.description}>{description}</p>
						<div className={styles.buttonContainer}>
							<button onClick={handleSecondaryAction} className={`${styles.button} ${styles.secondaryButton}`}>
								{secondaryButtonText}
							</button>
							<button onClick={handlePrimaryAction} className={`${styles.button} ${styles.primaryButton}`}>
								{primaryButtonText}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
