import { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { routesConfig } from '../../routes';
import { IRoute } from '../../types';
import { PublicHeader } from '../../components';
import { api } from '../../services';

const { Sider, Content } = Layout;

export const Home = () => {
    const [ routes, setRoutes ] = useState<string[]>([]);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        api.get({
            apiPath: '/home_routes',
        }).then(res => {
            setRoutes(res);
        });
    }, [])

    const selectedKeys = useMemo(() => {
        return [location.pathname];
    }, [location.pathname]);

    const homeRoutes = routesConfig.find(item => item.name === 'home');
    const homeChildrenRoutes: Array<IRoute> | undefined = useMemo(() => {
        return (homeRoutes && homeRoutes.children) || [];
    }, [homeRoutes]);
    // 从接口获取路由
    const getRoutes = useCallback(() => {
        const currentRoutes = routes.reduce((result: IRoute[], path: string) => {
            for(let child of homeChildrenRoutes) {
                if(child.path === path) {
                    result.push(child);
                }
            }
            return result;
        }, []);
        return currentRoutes;
    }, [routes, homeChildrenRoutes]);
    
    // 使用本地路由
    // const getRoutes = () => {
    //     return homeChildrenRoutes;
    // }

    const onMenuChange = (key: string) => {
        history.push(key);
    }

    const childrenRoutes: Array<IRoute> = getRoutes();

    return (
        <Layout style={{ height: '100%' }}>
            <PublicHeader />
            <Content>
                <Layout style={{ height: '100%' }}>
                    <Sider trigger={null} collapsible>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onSelect={({ key }) => onMenuChange(key as string)}>
                            {homeChildrenRoutes.filter(item => item.isMenu).map(item => (
                                <Menu.Item key={item.path} >
                                    {item.name}
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Sider>
                <Layout className="site-layout">
                    <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                    >
                        {!routes.length && <Button>获取子路由</Button>}
                        <Switch>
                            {
                                childrenRoutes.map(item => {
                                    return <Route key={item.path} path={item.path} component={item.component}/>
                                })
                            }
                            <Redirect from="*" to="/home/dasheboard" /> 
                        </Switch>
                    </Content>
                </Layout>
                </Layout>
            </Content>
        </Layout>
    );
}

export { Dasheboard } from './dasheboard';
export { Redux } from './redux';
export { TemplateManagement } from './template-management';
export { TemplateEdit } from './template-edit';