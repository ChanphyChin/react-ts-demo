import { IRoute } from '../types';
import {
    Login,
    Home,
    PageNotFound
} from '../views';
export const config: Array<IRoute> = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        auth: true
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/pageNotFound',
        name: 'pageNotFound',
        component: PageNotFound
    },
];