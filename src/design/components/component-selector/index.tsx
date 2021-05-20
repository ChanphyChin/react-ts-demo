import { Radio, Card, Button } from 'antd';
import { useState } from 'react';
import { RadioChangeEvent } from 'antd';
import { cloneDeep } from 'lodash';
import { MessageDataInterface } from '../../types';

interface ComponentSelectorProps {
    messageData: MessageDataInterface
    onUpDateConfig: ( messageData: MessageDataInterface ) => void;
}

export const ComponentSelector = (props: ComponentSelectorProps) => {
    const [value, SetValue] = useState<string>();
    const options = [
        { label: 'Text', value: 'CustomerText' },
        { label: 'Swiper', value: 'CustomerSwiper' },
        { label: 'Nav', value: 'CustomerNav' },
        { label: 'Banner', value: 'CustomerBanner' },
        { label: 'Header', value: 'CustomerHeader' },
    ];
    const onChange = (e: RadioChangeEvent) => {
        SetValue(e.target.value);
    }
    const onNext = () => {
        if(!value) return;
        let config = {
            component: value as string,
            config: ''
        };
        switch(value) {
            case 'CustomerText':
                config.config = '{}';
                break;
            case 'CustomerSwiper' :
                config.config = '{"items":[]}';
                break;
            case 'CustomerNav' :
                config.config = '{"items":[]}';
                break;
            case 'CustomerBanner' :
                config.config = '{}';
                break;
            case 'CustomerHeader' :
                config.config = '{}';
                break;

        }

        let messageData: MessageDataInterface = cloneDeep(props.messageData);
        const { index, addType } = messageData;
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
        props.onUpDateConfig(messageData);
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
                <Button onClick={onNext} type='primary'>Add</Button>
            </div>
        </Card>
  );
}
