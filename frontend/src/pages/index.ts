import { Component, lazy } from 'solid-js';

const Homepage = lazy(() => import('./Homepage'));
const Login = lazy(() => import('./Login'));
const Registration = lazy(() => import('./Registration'));

type Route = {
	path: string;
	component: Component;
};

const routes: Route[] = [
	{ path: '/', component: Homepage },
	{ path: '/login', component: Login },
	{ path: '/registration', component: Registration },
];

export default routes;
