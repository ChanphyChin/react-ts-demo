import { Component} from 'react';
import { Layout, Menu } from 'antd';
import { PublicHeader } from '../../components';
import { RouteWithSubRoutes } from '../../routes';
import { api } from '../../services';
import { IRoute } from '../../types';

import {
    Switch,
  } from "react-router-dom";

const { Sider, Content } = Layout;

const routesRegx: { [key: string]: any } = {
    '/home/dasheboard': /\/home\/dasheboard/,
    '/home/redux': /\/home\/redux/,
    '/home/template-management': /\/home\/template-management/,
    '/home/template-edit': /\/home\/template-edit/,
    // '/home/template-edit/:id': /\/home\/template-edit\/((?!\/).)*$/
};

interface HomeProps {
    [key: string]: any;
}

export class Home extends Component<HomeProps> {
    state = {
        selectedKeys: []
    }

    onMenuChange = (key: string) => {
        const { history } = this.props;
        this.setState({ selectedKeys: key });
        history.push(key);
    }

    componentDidMount() {
        const { location, history } = this.props;
        api.get({
            apiPath: '/admin/home_routes',
        }).then((res: string[]) => {
            let routeExits: Boolean = false;
            for(let route of res) {
                if(routesRegx[route].test(location.pathname)) {
                    routeExits = true;
                }
            }
            if(!routeExits) {
                history.push(res[0]);
                this.setState({ selectedKeys: [res[0]] });
            }else {
                if(location.pathname.includes('template')) {
                    this.setState({ selectedKeys: ['/home/template-management'] });
                }else {
                    this.setState({ selectedKeys: [location.pathname] });
                }
            }
        });
    }

    render() {
        const { routes = [] } = this.props;
        return (
            <Layout style={{ height: '100%' }}>
                <PublicHeader />
                <Content>
                    <Layout style={{ height: '100%' }}>
                        <Sider trigger={null} collapsible>
                            <div className="logo" />
                            <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys} onSelect={({ key }) => this.onMenuChange(key as string)}>
                                {routes.filter((item: IRoute) => item.isMenu).map((item: IRoute) => (
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
                            <Switch>
                                {routes.map((route: IRoute) => {
                                    return <RouteWithSubRoutes key={route.path} {...route} />
                                })}
                            </Switch>
                        </Content>
                    </Layout>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}

export { Dasheboard } from './dasheboard';
export { Redux } from './redux';
export { TemplateManagement } from './template-management';
export { TemplateEdit } from './template-edit';