import { Component } from 'react';

import {
    CustomerTextEditor,
    CustomerSwiperEditor,
    ComponentSelector,
    CustomerNavEditor,
    CustomerBannerEditor,
    CustomerHeaderEditor
} from '../components';
import { MessageDataInterface } from '../types';

interface RendererProps {
    messageData: MessageDataInterface;
    onRerenderIframe: (config: any) => void;
    onUpDateConfig: (config: MessageDataInterface) => void;
}

export class Renderer extends Component<RendererProps> {
    render() {
        const { messageData, onRerenderIframe, onUpDateConfig } = this.props;
        if(messageData?.type === 'add') {
            return <ComponentSelector messageData={messageData} onUpDateConfig={onUpDateConfig}/>
        }
        if(messageData && messageData.config) {
            const { config: { component, config } } = messageData;
            switch(component) {
                case 'CustomerText':
                return <CustomerTextEditor config={config} onRerenderIframe={onRerenderIframe} />
                case 'CustomerSwiper':
                return <CustomerSwiperEditor config={config} onRerenderIframe={onRerenderIframe} />
                case 'CustomerNav':
                return <CustomerNavEditor config={config} onRerenderIframe={onRerenderIframe} />
                case 'CustomerBanner':
                return <CustomerBannerEditor config={config} onRerenderIframe={onRerenderIframe} />
                case 'CustomerHeader':
                return <CustomerHeaderEditor config={config} onRerenderIframe={onRerenderIframe} />
            }
        }
        return null;
    }
}
