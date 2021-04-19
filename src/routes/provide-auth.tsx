import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { config } from './config';
import { IRoute } from '../types';
import {
  Login,
  PageNotFound
} from '../views';

const authContext = createContext(false);

export function ProvideAuth (props: any): JSX.Element {
    const history = useHistory();
    const location = useLocation();
    console.log(history);
    console.log(location);
    const { pathname } = location;
    const getAuthRoutes = (config: IRoute[]): IRoute[] => {
        let authRoutes: IRoute[] = []; 
        for(let item of config) {
            if(item.auth) {
                authRoutes.push(item);
            }
            if(item.children) {
                authRoutes.push(...getAuthRoutes(item.children));
            }
        }
        return authRoutes;
    }
    const checkPathExis = (pathname: string):boolean => {
        let isPathExis:boolean = false;
        for(let item of config) {
            if(item.path === pathname) {
                isPathExis = true;
            }
            if(item.children) {
                const childrenPathExis:boolean = checkPathExis(item.path);
                childrenPathExis && (isPathExis = childrenPathExis);
            }
        }
        return isPathExis;
    }
    const isPathExis = checkPathExis(pathname);
    const isLogin: string | null = sessionStorage.getItem('token');
    console.log(isLogin);
    if(isLogin) {
        const authRoutes = getAuthRoutes(config);
        return <Route path={props.route.path} component={props.route.component} />;
    }else {
        return <Redirect to="/login" />;
    }
    
}