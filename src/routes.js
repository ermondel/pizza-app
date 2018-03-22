import SignupComponent    from './components/signup/signup.component';
import SignupSucComponent from './components/signup/signup.successful.component';
import SigninComponent    from './components/signin/signin.component';
import ListComponent      from './components/list/list.component';
import NoneComponent      from './components/none/none.component';
import ServUnComponent    from './components/servun/serviceunavailable.component';
import LogoutComponent    from './components/logout/logout.component';
import UserComponent      from './components/user/user.component';

export const routes = [
    {
        path: "",
        redirectTo: "/list"
    },
    {
        id: "Sign up",
        path: "/signup",
        component: SignupComponent
    },
    {
        id: "Successful sign up",
        path: "/signup/successful",
        component: SignupSucComponent
    },
    {
        id: "Sign in",
        path: "/signin",
        component: SigninComponent
    },
    {
        id: "List",
        path: "/list",
        component: ListComponent,
        allow: ['user'],
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
    {
        id: "Not found",
        path: "/404",
        component: NoneComponent,
    },
    {
        id: "503 Service Unavailable",
        path: "/503",
        component: ServUnComponent,
    },
];