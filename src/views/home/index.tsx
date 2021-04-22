import { useState, useEffect, useMemo } from 'react';
import { Layout, Menu } from 'antd';
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
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        api.get({
            apiRoot: 'http://192.168.0.11:4000',
            apiPath: '/home',
        })
    }, [])

    const getSelectedKeys = useMemo(() => {
        return [location.pathname];
    }, [location.pathname]);

    const onMenuChange = (key: string) => {
        history.push(key);
    }
    const homeRoutes = routesConfig.find(item => item.name === 'home');
    const homeChildrenRoutes: Array<IRoute> | undefined = homeRoutes && homeRoutes.children;
    return (
        <Layout style={{ height: '100%' }}>
            <PublicHeader />
            <Content>
                <Layout style={{ height: '100%' }}>
                    <Sider trigger={null} collapsible>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" selectedKeys={getSelectedKeys} onSelect={({ key }) => onMenuChange(key as string)}>
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
                        <Switch>
                            {
                                homeChildrenRoutes && homeChildrenRoutes.map(item => {
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