import { Form, Input, Button, Card, Slider, Radio } from 'antd';
import { ChromePicker } from 'react-color';
import { useState, CSSProperties, useEffect } from 'react';

import { CustomerTextConfig } from '../../../types';

interface CustomerTextEditorProps {
    config: string;
    onRerenderIframe: (config: CustomerTextConfig) => void;
}


export const CustomerTextEditor = (props: CustomerTextEditorProps) => {
    const [color, setColor] = useState('#000');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const onFinish = (config: CustomerTextConfig) => {
        const { onRerenderIframe } = props;
        const params = {...config, color};
        console.log(params);
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onColorChange = (color: { hex: string; }) => {
        setColor(color.hex);
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
    const toglePicker = (displayColorPicker: boolean) => {
        setDisplayColorPicker(displayColorPicker)
    }
    const config = JSON.parse(props.config);

    useEffect(() => {
        const config = JSON.parse(props.config);
        setColor(config.color);
    }, []);

    return (
        <Card>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    fontSize: config.fontSize,
                    color: config.color,
                    textAlign: config.textAlign,
                    text: config.text
                }}
            >
                <Form.Item
                    label="Text"
                    name="text"
                    rules={[{ required: true, message: 'Please input text' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="fontSize" label="Font Size">
                    <Slider min={14} max={30}/>
                </Form.Item>
                <Form.Item name="textAlign" label="Text Align">
                    <Radio.Group name="textAlign">
                        <Radio value='left'>Left</Radio>
                        <Radio value='center'>Center</Radio>
                        <Radio value='right'>Right</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="color" label="Color">
                    <>
                        <div style={{ background: color, width: 50, height: 20, cursor: 'pointer' }} onClick={ () => toglePicker(true) }></div>
                        { displayColorPicker ? <div style={ popover }>
                        <div style={ cover } onClick={ () => toglePicker(false)  }/>
                            <ChromePicker color={color} onChange={onColorChange}/>
                        </div> : null }
                    </>
                </Form.Item>
                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
