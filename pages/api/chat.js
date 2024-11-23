import { verifyJWT } from '@/helpers/jwt';
import tryCatch from '@/helpers/tryCatch';
import User from '@/models/userModel';

async function handler(req, res) {
	if (req.method === 'POST') {
		await tryCatch(chat, req, res);
	}
}

async function chat(req, res) {
	const { prompt } = req.body;

	const user = await verifyJWT(req);

	if (!user) {
		res.status(401).json({ status: 'fail', message: 'You are not logged in! Please log in to get access!' });
		return;
	}

	const { preferenceVector } = user;

	const response = await fetch('http://127.0.0.1:5000/api/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt, preferenceVector }),
	});

	const data = await response.json();
	const updatedPreferenceVector = data?.updatedPreferenceVector;
	const output = data?.response || 'Sorry, we are having technical difficulties, please try to login again later';

	if (updatedPreferenceVector) {
		await User.findOneAndUpdate({ userIdentifier: user.userIdentifier }, { preferenceVector: updatedPreferenceVector });
	}

	res.status(200).json({ status: 'success', response: output });
}

export default handler;
