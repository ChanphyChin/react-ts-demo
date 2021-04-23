import {
    Route,
    Redirect,
    useLocation
} from "react-router-dom";
import { routesConfig } from './config';
import { IRoute } from '../types';

interface ProvideAuthProps {
    route: IRoute;
}

export function ProvideAuth (props: ProvideAuthProps): JSX.Element {
    const location = useLocation();
    const { pathname } = location;
    console.log('in');
    // const getAuthRoutes = (config: IRoute[]): IRoute[] => {
    //     let authRoutes: IRoute[] = []; 
    //     for(let item of config) {
    //         if(item.auth) {
    //             authRoutes.push(item);
    //         }
    //         if(item.children) {
    //             authRoutes.push(...getAuthRoutes(item.children));
    //         }
    //     }
    //     return authRoutes;
    // }
    const checkPathExis = (pathname: string, routesConfig: IRoute[]):boolean => {
        let isPathExis:boolean = false;
        for(let item of routesConfig) {
            if(item.path === pathname) {
                isPathExis = true;
                return isPathExis;
            }
            if(item.children) {
                const childrenPathExis:boolean = checkPathExis(pathname, item.children);
                childrenPathExis && (isPathExis = true);
            }
        }
        return isPathExis;
    }
    const isPathExis = checkPathExis(pathname, routesConfig);
    const isLogin: string | null = sessionStorage.getItem('token');
    console.log(props.route);
    if(isLogin) {
        if (pathname === '/') {
            return <Redirect from="*" to="/home" />;
        }
        if(!isPathExis && pathname !== '/'){
            return <Redirect from="*" to="/404" />;
        }
        return <Route path={props.route.path} component={props.route.component} />;
    }else {
        if(!isPathExis && pathname !== '/'){
            return <Redirect from="*" to="/404" />;
        }
        return <Redirect from="*" to="/login" />;
    }
}