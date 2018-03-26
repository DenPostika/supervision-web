// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { SignIn, SignUp, Auth } from './';

export default {
	path: 'auth',
	name: 'auth',
	component: Auth,
	childRoutes: [
		{ path: 'sign_in', name: 'Sign in', component: SignIn },
		{ path: 'sign_up', name: 'Sign up', component: SignUp },
	],
};
