import { useState } from 'react';
import styles from './LoginPage.module.css';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		// Here you would typically handle the login logic
		console.log('Login attempted with:', { email, password });
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Welcome Back</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<input
							type="email"
							id="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className={styles.input}
							placeholder=" "
						/>
						<label htmlFor="email" className={styles.label}>
							Email
						</label>
					</div>
					<div className={styles.inputGroup}>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							className={styles.input}
							placeholder=" "
						/>
						<label htmlFor="password" className={styles.label}>
							Password
						</label>
					</div>
					<button type="submit" className={styles.button}>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
}
