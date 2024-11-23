import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>AutoBot</div>
			<div className={styles.buttons}>
				<Link href="/login" className={styles.loginButton}>
					Login
				</Link>
				<Link href="/signup" className={styles.signupButton}>
					Sign Up
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
