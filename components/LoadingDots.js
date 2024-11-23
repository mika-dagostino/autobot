import React from 'react';
import styles from './HomePage.module.css';

function LoadingDots() {
	return (
		<div className={`${styles.message} ${styles.assistantMessage}`}>
			<div className={styles.typingIndicator}>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	);
}

export default LoadingDots;
