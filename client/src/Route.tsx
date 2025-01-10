import App from '@/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

export default function Route() {
	const route = createBrowserRouter([
		{
			path: '/',
			element: (
				<ProtectedRoute>
					<App />
				</ProtectedRoute>
			),
		},
		{
			path: 'login',
			element: <Login />,
		},
		{
			path: 'signup',
			element: <Signup />,
		},
	]);

	return <RouterProvider router={route} />;
}
