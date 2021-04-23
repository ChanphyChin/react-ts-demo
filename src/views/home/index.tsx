import { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
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

    const onMenuChange = (key: string) => {
        history.push(key);
    }
    
    return (
        <Layout style={{ height: '100%' }}>
            <PublicHeader />
            <Content>
                <Layout style={{ height: '100%' }}>
                    <Sider trigger={null} collapsible>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onSelect={({ key }) => onMenuChange(key as string)}>
                            <Menu.Item key="/home/dasheboard" icon={<UserOutlined />}>
                                dasheboard
                            </Menu.Item>
                            <Menu.Item key="/home/redux" icon={<VideoCameraOutlined />}>
                                redux
                            </Menu.Item>
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
                                getRoutes().map(item => {
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