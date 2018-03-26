// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { FaceDetection, Calendar } from './';

export default {
	path: 'users',
	name: 'Users',
	childRoutes: [
		{
			path: 'face_detection',
			name: 'Face detection',
			component: FaceDetection,
			isIndex: true,
		},
		{ path: 'calendar', name: 'Calendar', component: Calendar },
	],
};
