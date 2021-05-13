import { Form, Upload, Button, Card } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';

import { UrlSelector } from '../index';
import { CustomerSwiperConfig } from '../../types';
import { api } from '../../services/api';


interface CustomerSwiperEditorProps {
    config: string;
    onRerenderIframe: (config: CustomerSwiperConfig) => void;
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

export const CustomerSwiperEditor = (props: CustomerSwiperEditorProps) => {
    const [imgUrl, setImgUrl] = useState<string>('');
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const [items, setItems] = useState<any[]>([]);
    const onFinish = (config: CustomerSwiperConfig) => {
        const { onRerenderIframe } = props;
        const params = { items }
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (data: { file: any }) => {
        if (data.file.status !== 'uploading') {
            console.log(data.file);
        }
    }
    
    useEffect(() => {
        const config = JSON.parse(props.config);
        setItems(config.items);
    }, [props.config]);

    const  customRequest = (options: any) => {
        let formData = new FormData();
        formData.append('image', options.file);
        api.post({
            apiPath: `/admin/upload`,
            params: formData,
        }).then((res:string) => {
            setImgUrl(res);
            options.onSuccess();
        })    
    }

    const onPreview = (file: any) => {
        window.open(imgUrl);
    }

    const uploadProps = {
        name: 'image',
        onChange: onChange,
        customRequest,
        onPreview: onPreview,
        maxCount: 1
    }

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }

    const onDragEnd = (result: any) => {
        const newItems = reorder(
            items as any[],
            result.source.index,
            result.destination.index
        );
        setItems(newItems);
    }

    const onRemoveItem = (index: number) => {
        const newItems = cloneDeep(items);
        newItems.splice(index, 1);
        setItems(newItems);
    }

    const onAddItems = () => {
        if(imgUrl && JSON.stringify(linkInfo) !== '{}') {
            const newItems = cloneDeep(items) || [];
            newItems.push({
                url: imgUrl,
                linkInfo: linkInfo
            });
            setItems(newItems);
        }
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
                                                    <img alt={item.url} src={item.url} style={{ width: 50, marginRight: 20 }}/>
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
