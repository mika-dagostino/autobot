import React from 'react';
import Navbar from './Navbar';
import styles from './Onboarding.module.css';
import Link from 'next/link';

function Onboarding() {
	return (
		<div className={styles.container}>
			<Navbar />
			<main className={styles.main}>
				<div className={styles.content}>
					<h1 className={styles.title}>Welcome to AI Dealership Assistant</h1>
					<p className={styles.description}>Our AI-powered chatbot helps your clients find their perfect car and answers all their questions.</p>
					<Link href="/login" className={styles.ctaButton}>
						Get Started
					</Link>
				</div>
				<div className={styles.imageContainer}>
					<img
						src="https://burgerkingks.com/wp-content/uploads/2020/08/Double-Whopper-meal.png"
						alt="AI Dealership Assistant"
						className={styles.image}
					/>
				</div>
			</main>
		</div>
	);
}

export default Onboarding;
