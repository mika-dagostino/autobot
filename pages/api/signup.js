import { connectToDatabase } from '@/helpers/connectDB';
import tryCatch from '@/helpers/tryCatch';
import { validateEmail, sanitize } from '@/helpers/validator';
import User from '@/models/userModel';
import { hashPassword } from '@/helpers/crypt';
import { createCookie } from '@/helpers/jwt';
import createUUID from '@/helpers/uuid';

async function handler(req, res) {
	if (req.method === 'POST') {
		await tryCatch(signup, req, res);
	}
}

async function signup(req, res) {
	const { name: enteredName, email: enteredEmail, password: enteredPassword, confirmPassword: enteredConfirmPassword } = req.body;

	if (!enteredName || !enteredEmail || !enteredPassword || !enteredConfirmPassword) {
		res.status(400).json({ status: 'fail', message: 'All fields are required' });
		return;
	}

	if (enteredPassword !== enteredConfirmPassword) {
		res.status(400).json({ status: 'fail', message: 'Passwords do not match' });
		return;
	}

	if (!validateEmail(enteredEmail)) {
		res.status(400).json({ status: 'fail', message: 'Invalid email address' });
		return;
	}

	if (enteredPassword.length < 8) {
		res.status(400).json({ status: 'fail', message: 'Password must be at least 8 characters long' });
		return;
	}

	const name = sanitize(enteredName.trim());
	const email = sanitizeEmail(enteredEmail.toLowerCase());
	const password = hashPassword(enteredPassword.trim());

	await connectToDatabase();

	const userWithSameEmail = await User.findOne({ email });

	if (userWithSameEmail) {
		res.status(400).json({ status: 'fail', message: 'User with this email already exists' });
		return;
	}

	const user = {
		name,
		email,
		password,
		userIdentifier: createUUID(),
	};

	await User.create(user);

	createCookie({ userIdentifier: userFound.userIdentifier }, res);

	res.status(200).json({ status: 'success', message: 'Signup successful' });
}

export default handler;
