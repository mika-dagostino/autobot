import tryCatch from '@/helpers/tryCatch';
import User from '@/models/userModel';
import { verifyJWT } from '@/helpers/jwt';

const defaultPreferenceVector = {
	Year: [],
	Make: [],
	Model: [],
	Body: [],
	Doors: [],
	ExteriorColor: [],
	InteriorColor: [],
	EngineCylinders: [],
	Transmission: [],
	Miles: [],
	SellingPrice: [],
	MarketClass: [],
	PassengerCapacity: [],
	Drivetrain: [],
	Engine_Description: [],
	CityMPG: [],
	HighwayMPG: [],
};

async function handler(req, res) {
	if (req.method === 'GET') {
		await tryCatch(reset, req, res);
	}
}

async function reset(req, res) {
	const user = await verifyJWT(req);

	if (!user) {
		res.status(401).json({ status: 'fail', message: 'Unauthorized' });
		return;
	}

	const updatedUser = await User.findOneAndUpdate({ userIdentifier: user.userIdentifier }, { preferenceVector: defaultPreferenceVector });

	if (!updatedUser) {
		res.status(500).json({ status: 'fail', message: 'Internal server error' });
		return;
	}

	res.status(200).json({ status: 'success', message: 'Preference vector reset' });
}

export default handler;
