import Router            from './router';
import SignupComponent   from './components/signup/signup.component';
import SigninComponent   from './components/signin/signin.component';
import ListComponent     from './components/list/list.component';
import NoneComponent     from './components/none/none.component';
import LogoutComponent   from './components/logout/logout.component';
import UserComponent     from './components/user/user.component';
import { AUTH_SERVICE }  from './services/auth.service';

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
			canActivate: (params) => AUTH_SERVICE.isAuthorized(),
		},
		{
			id: "Not found",
			path: "/404",
			component: NoneComponent,
		},
		{
			id: "Logout",
			path: "/logout",
			component: LogoutComponent,
		},
		{
			id: "User",
			path: "/user",
			component: UserComponent,
		},
	],
	container: document.getElementById('body'),
});