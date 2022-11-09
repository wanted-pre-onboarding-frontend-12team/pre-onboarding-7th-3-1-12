import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import { isValidArray } from '../utils/ArrayUtils';

const ROUTE_PATHS = {
	HOME: '/',
	NOT_FOUND: '*',
} as const;

const routes = [
	{
		id: 1,
		path: ROUTE_PATHS.HOME,
		element: <Home />,
	},
] as const;

const Router = () => {
	return (
		<Routes>
			{isValidArray(routes) && routes.map(({ id, path, element }) => <Route key={id} path={path} element={element} />)}
		</Routes>
	);
};

export default Router;
