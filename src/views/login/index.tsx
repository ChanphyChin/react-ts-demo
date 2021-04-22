import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import { api } from '../../services';
import './index.less';

export const Login = () => {
    const history = useHistory();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = (values: any) => {
        api.post({
            apiRoot: 'http://192.168.0.11:4000',
            apiPath: '/login',
            params: values
        }).then(res => {
            console.log(res, 'res');
        })
        sessionStorage.setItem('token', JSON.stringify(values));
        history.push('/home');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='login'
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>
    
            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>
    
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Login
            </Button>
            </Form.Item>
        </Form>
    );
}