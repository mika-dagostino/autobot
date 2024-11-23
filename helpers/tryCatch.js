async function tryCatch(func, req, res) {
	try {
		await func(req, res);
	} catch (e) {
		res.status(500).json({ status: 'fail', message: 'Something went wrong on our servers, please try again later :(' });
	}
}

export default tryCatch;
