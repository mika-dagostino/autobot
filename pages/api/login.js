import { connectToDatabase } from '@/helpers/connectDB';
import tryCatch from '@/helpers/tryCatch';
import { validateEmail, sanitizeEmail } from '@/helpers/validator';
import User from '@/models/userModel';
import { verifyPassword } from '@/helpers/crypt';
import { createCookie } from '@/helpers/jwt';

async function handler(req, res) {
	if (req.method === 'POST') {
		await tryCatch(login, req, res);
	}
}

async function login(req, res) {
	const { email: enteredEmail, password: enteredPassword } = req.body;

	if (!enteredEmail || !enteredPassword) {
		res.status(400).json({ status: 'fail', message: 'Email and password are required' });
		return;
	}

	const email = sanitizeEmail(enteredEmail.toLowerCase());
	const password = enteredPassword.trim();

	if (password.length < 8 || !validateEmail(email)) {
		res.status(422).json({ status: 'fail', message: 'Invalid email or password' });
		return;
	}

	await connectToDatabase();

	const userFound = await User.findOne({ email });

	if (!userFound) {
		res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
		return;
	}

	const isValidPassword = await verifyPassword(password, userFound.password);

	if (!isValidPassword) {
		res.status(422).json({ status: 'fail', message: 'Invalid email or password' });
		return;
	}

	createCookie({ userIdentifier: userFound.userIdentifier }, res);

	res.status(200).json({ status: 'success', message: 'Login successful' });
}

export default handler;
