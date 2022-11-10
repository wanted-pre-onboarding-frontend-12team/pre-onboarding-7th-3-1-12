import { Route, Routes } from 'react-router-dom';
import { Home, NotFound } from '@src/pages';
import { ROUTE_PATHS } from '@src/router/routePaths';
import { isNotEmptyArray } from '@src/utils/arrayUtils';

const routes = [
	{
		id: 1,
		path: ROUTE_PATHS.HOME,
		element: <Home />,
	},
	{
		id: 2,
		path: ROUTE_PATHS.NOT_FOUND,
		element: <NotFound />,
	},
];

const Router = () => {
	return (
		<Routes>
			{isNotEmptyArray(routes) && routes.map(({ id, path, element }) => <Route key={id} path={path} element={element} />)}
		</Routes>
	);
};

export default Router;
