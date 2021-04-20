import { Layout, Dropdown, Menu } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;

interface PublicHeaderProp {
  onClick?: (key: string) => void;
}

export const PublicHeader = (props: PublicHeaderProp) => {
  const history = useHistory();
  const handleMenuClick = (key: string) => {
    const { onClick } = props;
    onClick && onClick(key);
    sessionStorage.removeItem('token');
    history.push('/login');
  }
  const menu = (
    <Menu onClick={({ key }) => handleMenuClick(key as string)}>
      <Menu.Item key="logout">
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
