import { Layout, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    Switch,
    Route,
    Redirect,
    useHistory,
} from "react-router-dom";
import { routesConfig } from '../../../routes';
import { IRoute } from '../../../types';

const { Header, Content } = Layout;

export const LayoutContainer = () => {
    const history = useHistory();
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
            <Header style={{ textAlign: 'right' }}>
                <Dropdown overlay={menu} placement="bottomCenter">
                    <UserOutlined style={{ fontSize: 30, color: '#fff' }}/>
                </Dropdown>
            </Header>
            <Content>
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
    );
}

export default LayoutContainer;
