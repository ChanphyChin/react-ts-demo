import { Form, Input, Button, Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { UrlSelector } from '../index';
import { CustomerNavConfig, DesignConfig } from '../../types';
import { useDrag } from '../../hooks';

export const CustomerNavEditor = (props: DesignConfig<CustomerNavConfig>) => {
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const [form] = Form.useForm();

    const { items, setItems, onDragEnd, onRemoveItem, onAddItems } = useDrag({itemParams: { title: form.getFieldValue('title'), linkInfo}, condition: Boolean(form.getFieldValue('title') && JSON.stringify(linkInfo) !== '{}')});

    const onFinish = (config: CustomerNavConfig) => {
        const { onRerenderIframe } = props;
        const params = { items }
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    useEffect(() => {
        const config = JSON.parse(props.config);
        setItems(config.items || []);
    }, [props.config]);

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }
    
    return (
        <Card>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
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
                <Form.Item style={{ textAlign: 'right', marginTop: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
