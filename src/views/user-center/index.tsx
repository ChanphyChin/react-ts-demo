import { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PublicHeader } from '../../components';
import { api } from '../../services';

export const UserCenter = () => {
  const [user, setUser] = useState<{name: string}>({name: ''});
  useEffect(() => {
    api.get({
      apiPath: '/admin/user_info',
    }).then(res => {
      setUser(res);
    })
  }, []);
  return (
    <div>
      <PublicHeader />
      <Card title="User Info" bordered={false} style={{ width: 300 }}>
        <p>user: {user.name}</p>
      </Card>
    </div>
  );
}