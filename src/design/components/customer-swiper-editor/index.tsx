import { Form, Upload, Button, Card } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { UrlSelector } from '../index';
import { CustomerSwiperConfig, DesignConfig } from '../../types';
import { useUpload, useDrag } from '../../hooks';

export const CustomerSwiperEditor = (props: DesignConfig<CustomerSwiperConfig>) => {
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const { uploadProps, imgInfo } = useUpload();
    const { items, setItems, onDragEnd, onRemoveItem, onAddItems } = useDrag({itemParams: {imgInfo, linkInfo}, condition: Boolean(imgInfo && JSON.stringify(linkInfo) !== '{}')});;

    const onFinish = (config: CustomerSwiperConfig) => {
        const { onRerenderIframe } = props;
        const params = { items }
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    useEffect(() => {
        const config = JSON.parse(props.config);
        setItems(config.items);
    }, [props.config]);

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }

    return (
        <Card>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="pic" label="Pic" valuePropName='pic'>
                    <Upload {...uploadProps} listType='picture'>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="url" label="Url">
                    <UrlSelector onUrlChange={onUrlChange}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={onAddItems}>
                        Add
                    </Button>
                </Form.Item>
                <Form.Item label="Swiper List">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                                {items?.map((item, index) => (
                                    <Draggable draggableId={`${item.linkInfo.name}-${item.url}-${index}`} index={index} key={`${item.linkInfo.name}-${item.url}-${index}`}>
                                        {(provided, snapshot) => (
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className='draggable-container'
                                            >
                                                <Card style={{ margin: '10px 0' }}>
                                                    <img alt={item.imgInfo?.url} src={item.imgInfo?.url} style={{ width: 50, marginRight: 20 }}/>
                                                    {item.linkInfo.name}
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
