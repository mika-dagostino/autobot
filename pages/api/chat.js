async function handler(req, res) {
	// const response = await fetch('http://localhost:3000/api/test');
	// const data = await response.json();
	// console.log(data);
	// TODO: MAKE FLASK BACKEND

	res.status(200).json({ status: 'success', message: '...' });
}

export default handler;
