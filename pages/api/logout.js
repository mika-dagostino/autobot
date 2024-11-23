import tryCatch from '@/helpers/tryCatch';
import { createCookie } from '@/helpers/jwt';

async function handler(req, res) {
	if (req.method === 'GET') {
		await tryCatch(logout, req, res);
	}
}

async function logout(req, res) {
	createCookie({ userIdentifier: 'No user' }, res);
	res.status(200).json({ status: 'success', message: 'Logged out' });
}

export default handler;
