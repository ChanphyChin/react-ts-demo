import { Form, Input, Button, Card } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import cloneDeep from 'lodash/cloneDeep';

import { UrlSelector } from '../index';
import { CustomerNavConfig, DesignConfig } from '../../types';


const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

export const CustomerNavEditor = (props: DesignConfig<CustomerNavConfig>) => {
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const [tabList, setTabList] = useState<any[]>([]);
    const [form] = Form.useForm();

    const onFinish = (config: CustomerNavConfig) => {
        const { onRerenderIframe } = props;
        const params = { tabList }
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    useEffect(() => {
        const config = JSON.parse(props.config);
        setTabList(config.tabList);
    }, [props.config]);

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }

    const onDragEnd = (result: any) => {
        const newItems = reorder(
            tabList as any[],
            result.source.index,
            result.destination.index
        );
        setTabList(newItems);
    }

    const onRemoveItem = (index: number) => {
        const newItems = cloneDeep(tabList);
        newItems.splice(index, 1);
        setTabList(newItems);
    }

    const onAddItems = () => {
        const title = form.getFieldValue('title');
        if(title && JSON.stringify(linkInfo) !== '{}') {
            const newTabList= cloneDeep(tabList);
            newTabList.push({
                title,
                linkInfo: linkInfo
            });
            setTabList(newTabList);
        }
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
                <Form.Item style={{ textAlign: 'right', marginTop: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
