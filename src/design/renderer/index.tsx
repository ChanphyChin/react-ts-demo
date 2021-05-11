import { Component } from 'react';

import { CustomerTextEditor, CustomerSwiperEditor, ComponentSelector } from '../components';
import { MessageDataInterface } from '../../types';

interface RendererProps {
    messageData: MessageDataInterface | undefined;
    onRerenderIframe: (config: any) => void;
}

export class Renderer extends Component<RendererProps> {
    render() {
        const { messageData, onRerenderIframe } = this.props;
        if(messageData?.type === 'add') {
            return <ComponentSelector />
        }
        if(messageData && messageData.config) {
            const { config: { component, config } } = messageData;
            switch(component) {
                case 'CustomerText':
                return <CustomerTextEditor config={config} onRerenderIframe={onRerenderIframe} />
                case 'CustomerSwiper':
                return <CustomerSwiperEditor config={config} onRerenderIframe={onRerenderIframe} />
            }
        }
        return null;
    }
}
