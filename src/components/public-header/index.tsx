import { Layout, Dropdown, Menu } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { api } from '../../services';

const { Header } = Layout;

interface PublicHeaderProp {
  onClick?: (key: string) => void;
}

export const PublicHeader = (props: PublicHeaderProp) => {
  const history = useHistory();
  const handleMenuClick = (key: string) => {
    const { onClick } = props;
    onClick && onClick(key);
    console.log(key);
    if(key === '/login') {
      api.post({
        apiPath: '/admin/logout',
      }).then(res => {
          sessionStorage.removeItem('token');
          history.push('/login');
      })
    }else {
      history.push(key);
    }
  }
  const menu = (
    <Menu onClick={({ key }) => handleMenuClick(key as string)}>
      <Menu.Item key="/home">
          Home
      </Menu.Item>
      <Menu.Item key="/userCenter">
          User Center
      </Menu.Item>
      <Menu.Item key="/login">
          logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Header style={{ textAlign: 'right' }}>
        <Dropdown overlay={menu} placement="bottomCenter">
            <UserOutlined style={{ fontSize: 30, color: '#fff' }}/>
        </Dropdown>
    </Header>
  );
}
