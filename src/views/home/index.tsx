import { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import {
    Switch,
    Route,
    Redirect,
    useHistory
} from "react-router-dom";
import { routesConfig } from '../../routes';
import { IRoute } from '../../types';
import { PublicHeader } from '../../components';

const { Sider, Content } = Layout;

export const Home = () => {
    const [ collapsed, setCollapsed ] = useState(false);
    const history = useHistory();
    const toggle = () => {
        setCollapsed(!collapsed);
    };
    const handleMenuClick = () => {
        sessionStorage.removeItem('token');
        history.push('/login');
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
        <Menu.Item key="3">
            logout
        </Menu.Item>
        </Menu>
    );
    const homeRoutes = routesConfig.find(item => item.name === 'home');
    const homeChildrenRoutes: Array<IRoute> | undefined = homeRoutes && homeRoutes.children;
    return (
        <Layout style={{ height: '100%' }}>
            <PublicHeader />
            <Content>
                <Layout style={{ height: '100%' }}>
                    <Sider trigger={null} collapsible collapsed={collapsed}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            nav 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            nav 2
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            nav 3
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