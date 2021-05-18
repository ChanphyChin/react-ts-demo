import { IRoute } from '../types';
import {
    Login,
    Home,
    PageNotFound,
    TemplateEditWeb,
    TemplateManagementWeb,
    UserCenter,
    Redux,
    TemplateManagement,
    TemplateEdit
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
            // {
            //     path: '/home/dasheboard',
            //     name: 'dasheboard',
            //     component: Dasheboard,
            //     auth: true,
            //     isMenu: true
            // },
            {
                path: '/home/redux',
                name: 'redux',
                component: Redux,
                auth: true,
                isMenu: true
            },
            {
                path: '/home/template-management',
                name: '移动端模板管理',
                component: TemplateManagement,
                auth: true,
                isMenu: true
            },
            {
                path: '/home/template-edit',
                name: '移动端模板管理',
                component: TemplateEdit,
                auth: true,
                isMenu: false
            },
            {
                path: '/home/template-management-web',
                name: 'web端模板管理',
                component: TemplateManagementWeb,
                auth: true,
                isMenu: true
            },
            {
                path: '/home/template-edit-web',
                name: 'web端模板管理',
                component: TemplateEditWeb,
                auth: true,
                isMenu: false
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