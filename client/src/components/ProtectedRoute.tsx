import { api } from '@/api/axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: PropsWithChildren) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				await api.get('/auth/token/check');
				setIsAuthenticated(true);
			} catch (err) {
				navigate('/login');
				setIsAuthenticated(false);
			}
		})();
	}, []);

	if (!isAuthenticated) {
		return (
			<div className='flex justify-center items-center text-lg font-semibold'>
				<p>Authenticating...</p>
			</div>
		);
	}

	return children;
}
