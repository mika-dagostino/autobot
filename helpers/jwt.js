import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/userModel';
import { connectToDatabase } from './connectDB';
import { validateUUID } from './uuidHandler';

const secretKey = process.env.JWT_SECRETKEY;

export function createJWT(dataObject) {
	const token = jwt.sign(dataObject, secretKey, {
		expiresIn: '1y',
	});
	return token;
}

export function createCookie(dataObject, res) {
	const currentDate = new Date();
	const expires = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());

	const jwt = createJWT(dataObject);

	if (process.env.NODE_ENV === 'production') {
		res.setHeader('set-cookie', `jwt=${jwt}; path=/; samesite=lax; httponly; secure; Expires=${expires.toUTCString()}`);
		return;
	}

	res.setHeader('set-cookie', `jwt=${jwt}; path=/; samesite=lax; httponly; Expires=${expires.toUTCString()}`);
}

export async function verifyJWT(req) {
	const token = req?.cookies?.jwt;
	if (!token) {
		throw new Error("You're not logged in! Please log in to get access.");
	}

	const decodedJWT = await promisify(jwt.verify)(token, secretKey);

	await connectToDatabase();

	const { userIdentifier } = decodedJWT;

	if (!validateUUID(userIdentifier)) {
		throw new Error("You're not logged in! Please log in to get access.");
	}

	const user = await User.findOne({ userIdentifier });

	return user;
}
