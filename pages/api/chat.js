async function handler(req, res) {
	// const response = await fetch('http://localhost:3000/api/test');
	// const data = await response.json();
	// console.log(data);

	res.status(200).json({ status: 'success', message: '...' });
}

export default handler;
