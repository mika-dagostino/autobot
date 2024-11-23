import { useState } from 'react';
import styles from './Auth.module.css';
import Link from 'next/link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
							type={isPasswordVisible ? 'text' : 'password'}
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

						{isPasswordVisible ? (
							<VisibilityOffIcon className={styles.visibilityIcon} onClick={() => setIsPasswordVisible(false)} />
						) : (
							<VisibilityIcon className={styles.visibilityIcon} onClick={() => setIsPasswordVisible(true)} />
						)}
					</div>
					<button type="submit" className={styles.button}>
						Log In
					</button>
				</form>
				<Link className={styles.aTag} href="/signup">
					Don't have an account? Sign up here
				</Link>
			</div>
		</div>
	);
}
