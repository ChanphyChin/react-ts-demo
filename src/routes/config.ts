import { IRoute } from '../types';
import {
    Login,
    Home,
    PageNotFound,
    Dasheboard,
    UserCenter,
    Redux,
    TemplateManagement
} from '../views';
export const baseRoutesConfig: Array<IRoute> = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/404',
        name: 'pageNotFound',
        component: PageNotFound
    },
];
export const routesConfig: Array<IRoute> = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        auth: true,
        children: [
            {
                path: '/home/dasheboard',
                name: 'dasheboard',
                component: Dasheboard,
                auth: true,
            },
            {
                path: '/home/redux',
                name: 'redux',
                component: Redux,
                auth: true,
            },
            {
                path: '/home/template-management',
                name: 'template management',
                component: TemplateManagement,
                auth: true,
            },
        ]
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component: UserCenter,
        auth: true,
    },
];