import { Form, Upload, Button, Card, Slider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, CSSProperties } from 'react';
import { CustomerSwiperConfig } from '../../../types';
import { api } from '../../../services';

interface CustomerSwiperEditorProps {
    config: string;
    onRerenderIframe: (config: CustomerSwiperConfig) => void;
}


export const CustomerSwiperEditor = (props: CustomerSwiperEditorProps) => {
    const [url, setUrl] = useState<string>('');
    const onFinish = (config: CustomerSwiperConfig) => {
        const { onRerenderIframe } = props;
        onRerenderIframe(config);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (data: { file: any }) => {
        if (data.file.status !== 'uploading') {
            console.log(data.file);
        }
    }

    const config = JSON.parse(props.config);

    const  customRequest = (options: any) => {
        let formData = new FormData();
        formData.append('image', options.file);
        api.post({
            apiPath: `/admin/upload`,
            params: formData,
        }).then((res:string) => {
            setUrl(res);
            options.onSuccess();
        })    
    }

    const onPreview = (file: any) => {
        window.open(url);
    }

    const uploadProps = {
        name: 'image',
        onChange: onChange,
        customRequest,
        onPreview: onPreview,
        maxCount: 1
    }

    return (
        <Card>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ fontSize: config.fontSize, color: config.color, text: config.text }}
            >
                <Form.Item name="height" label="Height">
                    <Slider min={100} max={300}/>
                </Form.Item>
                <Form.Item name="pic" label="Pic">
                    <Upload {...uploadProps} listType='picture'>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
