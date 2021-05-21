import { Form, Input, Button, Card, Upload, Radio } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState, CSSProperties, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ChromePicker } from 'react-color';

import { UrlSelector } from '../index';
import { CustomerHeaderConfig, DesignConfig } from '../../types';
import { useUpload, useDrag } from '../../hooks';

const defaultConfig = {};

export const CustomerHeaderEditor = (props: DesignConfig<CustomerHeaderConfig>) => {
    const [color, setColor] = useState('#000');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const [config, setConfig] = useState<CustomerHeaderConfig>(defaultConfig as CustomerHeaderConfig);
    const [form] = Form.useForm();
    const { uploadProps, imgInfo, setImgInfo, setFileList, fileList } = useUpload();
    const { uploadProps: backgroundUploadProps, imgInfo: backgroundImgInfo, setFileListBackground, setImgInfoBackground, fileList: backgroundFileList } = useUpload('Background');
    const { items, setItems, onDragEnd, onRemoveItem, onAddItems } = useDrag({itemParams: { title: form.getFieldValue('title'), linkInfo}, condition: Boolean(form.getFieldValue('title') && JSON.stringify(linkInfo) !== '{}')});

    const onFinish = (config: any) => {
        const { onRerenderIframe } = props;
        console.log(config);
        const params = {
            nav: {
                list: items,
                backgroundColor: config.backgroundColor === 'transparent' ? 'transparent' : color
            },
            logo: {
                imgInfo: imgInfo,
                linkInfo: linkInfo,
                textAlign: config.textAlign
            },
            background: {
                imgInfo: backgroundImgInfo,
                repeat: config.repeat
            }
        };
        console.log(params);
        onRerenderIframe(params as CustomerHeaderConfig);
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
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const config = JSON.parse(props.config);
        console.log(config.logo?.imgInfo.name);
        setConfig(config);
        setColor(config.nav.backgroundColor === 'transparent' ? '#000' : config.nav.backgroundColor);
        setItems(config.nav.list)
        setFileList([{
            uid: '-1',
            name: config.logo?.imgInfo.name,
            status: 'done',
            url: config.logo?.imgInfo.url,
            thumbUrl: config.logo?.imgInfo.url,
        }]);
        setFileListBackground([{
            uid: '-1',
            name: config.background.imgInfo.name,
            status: 'done',
            url: config.background.imgInfo.url,
            thumbUrl: config.background.imgInfo.url,
        }]);
        setImgInfo(config.logo?.imgInfo);
        setImgInfoBackground(config.background?.imgInfo);
        form.setFieldsValue({
            repeat: config.background?.repeat,
            backgroundColor: config.nav?.backgroundColor === 'transparent' ? config.nav?.backgroundColor : 'color',
            textAlign: config.logo?.textAlign,
        });
    }, [props.config, form]);
    

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }

    return (
        <Card style={{ maxHeight: 700, overflow: 'scroll', background: '#fff' }}>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    repeat: config.background?.repeat,
                    backgroundColor: config.nav?.backgroundColor,
                    textAlign: config.logo?.textAlign,
                }}
            >
                <div style={{ border: '1px solid #efefef', padding: 10 }}>
                    Logo
                    <Form.Item name="pic" label="Pic" valuePropName='pic'>
                        {/* @ts-ignore */}
                        <Upload {...uploadProps} listType='picture' fileList={fileList}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="textAlign" label="Text Align">
                        <Radio.Group name="textAlign">
                            <Radio value='left'>Left</Radio>
                            <Radio value='center'>Center</Radio>
                            <Radio value='right'>Right</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div style={{ border: '1px solid #efefef', padding: 10 }}>
                    Back Ground
                    <Form.Item name="backgroudPic" label="Pic" valuePropName='backgroudPic'>
                        {/* @ts-ignore */}
                        <Upload {...backgroundUploadProps} listType='picture' fileList={backgroundFileList}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="repeat" label="Repeat">
                        <Radio.Group name="repeat">
                            <Radio value='repeat'>Repeat</Radio>
                            <Radio value='no-repeat'>NoRepeat</Radio>
                        </Radio.Group>
                    </Form.Item>
                </div>
                <div style={{ border: '1px solid #efefef', padding: 10 }}>
                    Nav
                    <Form.Item name="title" label="标题">
                        <Input />
                    </Form.Item>
                    <Form.Item name="url" label="Url">
                        <UrlSelector onUrlChange={onUrlChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onAddItems}>
                            Add
                        </Button>
                    </Form.Item>
                    <Form.Item label="Nav List">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                >
                                    {items?.map((item, index) => (
                                        <Draggable draggableId={`${item.linkInfo.name}-${item.title}-${index}`} index={index} key={`${item.linkInfo.name}-${item.title}-${index}`}>
                                            {(provided, snapshot) => (
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className='draggable-container'
                                                >
                                                    <Card style={{ margin: '10px 0' }}>
                                                        <span style={{ marginRight: 20 }}>标题: { item.title }</span>
                                                        跳转至: {item.linkInfo.name}
                                                        <CloseCircleOutlined onClick={() => onRemoveItem(index)} style={{ float: 'right' }} />
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                                </div>
                            )}
                            </Droppable>
                        </DragDropContext>
                    </Form.Item>

                    <Form.Item name="backgroundColor" label="Background Color">
                        <Radio.Group name="backgroundColor">
                            <Radio value='transparent'>transparent</Radio>
                            <Radio value='color'>
                                <>
                                    <div style={{ background: color, width: 50, height: 20, cursor: 'pointer' }} onClick={ () => toglePicker(true) }></div>
                                    { displayColorPicker ? <div style={ popover }>
                                    <div style={ cover } onClick={ () => toglePicker(false)  }/>
                                        <ChromePicker color={color} onChange={onColorChange}/>
                                    </div> : null }
                                </>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                </div>
                
                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
