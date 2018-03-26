// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  Profile,
} from './';

export default {
  path: 'user',
  name: 'User',
  childRoutes: [
    { path: 'profile', name: 'Profile', component: Profile, isIndex: true },
  ],
};
