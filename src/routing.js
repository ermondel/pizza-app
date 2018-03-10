/**
 * routing.js
 * version 0.1
 */

import Router            from './router';
import SignupComponent   from './signup/signup.component';
import SigninComponent   from './signin/signin.component';
import ListComponent     from './list/list.component';
import NotfoundComponent from './notfound/notfound.component';
import { listGuard }     from './list-guard';
import { isAuthorized }  from './is-authorized';

export const APP_ROUTER = new Router({
	map:
	[
		{
			path: "",
			redirectTo: "/list"
		},
		{
			id: "Signup",
			path: "/signup",
			component: SignupComponent
		},
		{
			id: "Signin",
			path: "/signin",
			component: SigninComponent
		},
		{
			id: "List",
			path: "/list",
			component: ListComponent,
			canActivate: isAuthorized
		},
		{
			id: "Not found",
			path: "/404",
			component: NotfoundComponent,
		},
	],
	container: document.getElementById('body'),
});