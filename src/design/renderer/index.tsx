import { Component } from 'react';

import { CustomerTextEditor } from '../components';

interface RendererProps {
    messageData: {
        config: {
            component: string;
            config: string;
        }
    } | undefined;
    onRerenderIframe: (values: any) => void;
}

export class Renderer extends Component<RendererProps> {
    render() {
        const { messageData, onRerenderIframe } = this.props;
        if(messageData && messageData.config) {
            const { config: { component, config } } = messageData;
            switch(component) {
                case 'CustomerText':
                return <CustomerTextEditor config={config} onRerenderIframe={onRerenderIframe} />
            }
        }
        return null;
    }
}
