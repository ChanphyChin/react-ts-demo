import { Radio, Card, Button } from 'antd';
import { useState } from 'react';
import { RadioChangeEvent } from 'antd';
import { useStore } from 'react-redux';
import { cloneDeep } from 'lodash';
import { IframeManager } from '../../../services';

export const ComponentSelector = () => {
    const state = useStore().getState();
    const [value, SetValue] = useState<string>();
    const options = [
        { label: 'Text', value: 'CustomerText' },
        { label: 'Swiper', value: 'CustomerSwiper' },
    ];
    const onChange = (e: RadioChangeEvent) => {
        SetValue(e.target.value);
    }
    const onNext = () => {
        let messageData = cloneDeep(state.messageData);
        switch(value) {
            case 'CustomerText':
                const { index, addType } = messageData;
                const config = {
                    component: value,
                    config: '{"text": "Please edit text", "color": "#000", "fontSize": 16, "textAlign": "left"}'
                };
                messageData.config = config;
                if(index === 0) {
                    addType === 'pre' ?
                    messageData.items.unshift(config) :
                    messageData.items.splice(index + 1, 0, config);
                }else {
                    addType === 'pre' ?
                    messageData.items.splice(index, 0, config) :
                    messageData.items.splice(index + 1, 0, config);
                }
                window.postMessage(messageData, '*');
                IframeManager.postMessage(messageData);
                break;
        }
    }
    return (
        <Card>
            <div>preview</div>
            <div style={{ margin: '20px 0' }}>
                <div style={{ marginBottom: 10 }}>Component List : </div>
                <Radio.Group
                    options={options}
                    onChange={onChange}
                    value={value}
                    optionType="button"
                    buttonStyle="solid"
                />
            </div>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={onNext} type='primary'>Next</Button>
            </div>
        </Card>
  );
}
