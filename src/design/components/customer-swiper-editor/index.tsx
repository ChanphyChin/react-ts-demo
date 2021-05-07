import { Form, Upload, Button, Card, Slider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, CSSProperties } from 'react';

import { CustomerSwiperConfig } from '../../../types';

interface CustomerSwiperEditorProps {
    config: string;
    onRerenderIframe: (config: CustomerSwiperConfig) => void;
}


export const CustomerSwiperEditor = (props: CustomerSwiperEditorProps) => {
    const [color, setColor] = useState('#000');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const onFinish = (config: CustomerSwiperConfig) => {
        const { onRerenderIframe } = props;
        const params = { ...config, color };
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onColorChange = (color: { hex: string; }) => {
        setColor(color.hex);
    }
    const toglePicker = (displayColorPicker: boolean) => {
        setDisplayColorPicker(displayColorPicker)
    }
    const onChange = (data: { file: any }) => {
        if (data.file.status !== 'uploading') {
            console.log(data.file);
        }
    }
    const popover: CSSProperties = {
        position: 'absolute',
        zIndex: 2,
    }
    const cover: CSSProperties = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    const config = JSON.parse(props.config);

    const uploadProps = {
        action: `${process.env.REACT_APP_API_ROOT}/upload`,
        name: 'image',
        onChange: onChange
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
