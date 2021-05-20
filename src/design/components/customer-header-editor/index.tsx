import { Form, Input, Button, Card, Upload, Radio } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState, CSSProperties, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { UrlSelector } from '../index';
import { CustomerTextConfig, DesignConfig } from '../../types';
import { useUpload, useDrag } from '../../hooks';

const defaultConfig: CustomerTextConfig = {
    text: '',
    textAlign: 'left',
    color: '#000',
    fontSize: 16
};

export const CustomerHeaderEditor = (props: DesignConfig<CustomerTextConfig>) => {
    const [tabList, setTabList] = useState<any[]>([]);
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const [config, setConfig] = useState<CustomerTextConfig>(defaultConfig);
    const [form] = Form.useForm();
    const { uploadProps, imgInfo, setImgInfo, fileList, setFileList } = useUpload();
    const { items, setItems, onDragEnd, onRemoveItem, onAddItems } = useDrag({itemParams: {imgInfo, linkInfo}, condition: Boolean(imgInfo && JSON.stringify(linkInfo) !== '{}')});

    const onFinish = (config: CustomerTextConfig) => {
        const { onRerenderIframe } = props;
        const params = {...config};
        console.log(params);
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const config = JSON.parse(props.config);
        setConfig(config);
        form.setFieldsValue({...config});
    }, [props.config, form]);
    

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }

    return (
        <Card>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{
                    fontSize: config.fontSize,
                    color: config.color,
                    textAlign: config.textAlign,
                    text: config.text
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
                                    {tabList?.map((item, index) => (
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
