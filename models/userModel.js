import { Schema, models, model } from 'mongoose';

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

const userSchema = new Schema({
	userIdentifier: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	name: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	preferenceVector: {
		type: Object,
		required: true,
		default: defaultPreferenceVector,
	},
});

userSchema.index({ userIdentifier: 1, email: 1 }, { unique: true });

const User = models.User || model('User', userSchema);

export default User;
