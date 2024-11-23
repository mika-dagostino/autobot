import { connect } from 'mongoose';

const uri = process.env.MONGODB_URI;

let cached = null;

export async function connectToDatabase() {
	try {
		if (cached.conn) {
			console.log('Using existing connection ...');
			return cached.conn;
		}

		if (!cached.promise) {
			const opts = {
				bufferCommands: false,
			};
			cached.promise = connect(uri, opts)
				.then(mongoose => {
					console.log('New connection ...');
					return mongoose;
				})
				.catch(e => {
					cached.promise = null;
					throw e;
				});
		}
		try {
			cached.conn = await cached.promise;
		} catch (e) {
			cached.promise = null;
			throw e;
		}

		return cached.conn;
	} catch (e) {
		if (e.reason?.type === 'ReplicaSetNoPrimary') {
			throw new Error('We cannot connect to our server :( Please make sure you are connected to internet or check your wifi settings');
		} else {
			throw new Error('Sorry, we are having technical difficulties, please try to login again later');
		}
	}
}
