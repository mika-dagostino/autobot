import { useState } from 'react';
import styles from './Auth.module.css';
import Link from 'next/link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useFetch from '../hooks/useFetch';

export default function SignUpPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
	const { fetchData, error, isLoading } = useFetch();

	async function handleSubmit(e) {
		e.preventDefault();
		const body = JSON.stringify({ name, email, password, confirmPassword });
		await fetchData('/api/signup', {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h1 className={styles.title}>Create an Account</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className={styles.input} placeholder=" " />
						<label htmlFor="name" className={styles.label}>
							Name
						</label>
					</div>
					<div className={styles.inputGroup}>
						<input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className={styles.input} placeholder=" " />
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
					<div className={styles.inputGroup}>
						<input
							type={isConfirmPasswordVisible ? 'text' : 'password'}
							id="confirmPassword"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className={styles.input}
							placeholder=" "
						/>
						<label htmlFor="confirmPassword" className={styles.label}>
							Confirm Password
						</label>

						{isConfirmPasswordVisible ? (
							<VisibilityOffIcon className={styles.visibilityIcon} onClick={() => setIsConfirmPasswordVisible(false)} />
						) : (
							<VisibilityIcon className={styles.visibilityIcon} onClick={() => setIsConfirmPasswordVisible(true)} />
						)}
					</div>
					{error.isError && <p className={styles.errorMessage}>{error.message}</p>}
					<button disabled={isLoading} type="submit" className={styles.button}>
						{isLoading ? 'Loading ...' : 'Sign Up'}
					</button>
				</form>
				<Link className={styles.aTag} href="/login">
					Already have an account? Login here
				</Link>
			</div>
		</div>
	);
}
