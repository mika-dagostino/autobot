import { useEffect, useState } from 'react';

function useFetch() {
	const [error, setError] = useState({ isError: false, message: '' });
	const [success, setSuccess] = useState({ isSuccess: false, message: '' });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (success.isSuccess) {
			const timer = setTimeout(() => {
				setSuccess({ isSuccess: false, message: '' });
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [success]);

	useEffect(() => {
		if (error.isError) {
			const timer = setTimeout(() => {
				setError({ isError: false, message: '' });
			}, 8000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	async function fetchData(route, options) {
		setIsLoading(true);
		setError({ isError: false, message: '' });
		setSuccess({ isSuccess: false, message: '' });

		const response = await fetch(route, options);

		if (response.status === 413) {
			setError({ isError: true, message: 'The request is too big' });
			setIsLoading(false);
			return { status: 'fail', message: 'The request is too big' };
		}

		const data = await response.json();
		setIsLoading(false);

		if (data.status === 'fail') {
			setError({ isError: true, message: data.message });
		}

		if (data.status === 'pending' || data.status === 'success') {
			setSuccess({ isSuccess: true, message: data.message });
		}

		return data;
	}

	return { error, success, isLoading, fetchData, setError, setSuccess, setIsLoading };
}

export default useFetch;
