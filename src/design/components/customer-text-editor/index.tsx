import { Form, Input, Button, Card, Slider } from 'antd';
import { ChromePicker } from 'react-color';
import { useState, CSSProperties } from 'react';

interface CustomerTextEditorProps {
    config: string;
    onRerenderIframe: (values: Values) => void;
}

interface Values {
    [key: string]: any;
}

export const CustomerTextEditor = (props: CustomerTextEditorProps) => {
    const [color, setColor] = useState('#000');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const onFinish = (values: Values) => {
        const { onRerenderIframe } = props;
        console.log('Success:', values);
        onRerenderIframe(values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onColorChange = (color: any) => {
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
    return (
        <Card>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ fontSize: config.fontSize, color: config.color, text: config.text }}
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
                <Form.Item name="color" label="Color">
                    <>
                        <div style={{ background: color, width: 50, height: 20, cursor: 'pointer' }} onClick={ () => toglePicker(true) }></div>
                        { displayColorPicker ? <div style={ popover }>
                        <div style={ cover } onClick={ () => toglePicker(false)  }/>
                            <ChromePicker color={color} onChange={onColorChange}/>
                        </div> : null }
                    </>
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