import Router            from './router';
import SignupComponent   from './components/signup/signup.component';
import SigninComponent   from './components/signin/signin.component';
import ListComponent     from './components/list/list.component';
import NoneComponent     from './components/none/none.component';
import { listGuard }     from './services/list-guard';
import { isAuthorized }  from './services/is-authorized';

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
			component: NoneComponent,
		},
	],
	container: document.getElementById('body'),
});