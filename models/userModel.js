import { Schema, models, model } from 'mongoose';

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
		type: [Array],
		required: true,
	},
});

userSchema.index({ userIdentifier: 1, email: 1 }, { unique: true });

const User = models.User || model('User', userSchema);

export default User;
