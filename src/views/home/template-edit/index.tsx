import { Component } from 'react';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { Renderer } from '../../../design';
import { IframeManager } from '../../../services';

interface MessageDataInterface {
  config: {
    component: string;
    config: string;
  },
  index: number;
  items: any[]; 
}

export class TemplateEdit extends Component<any, any> {
  state = {
    messageData: { config: { component: '', config: '' }, items: [], index: 0 },
  }
  iframeRef: any;
  receiveMessage = (e: any) => {
    if(!e.data.config) return;
    this.setState({messageData: e.data});
  }
  componentDidMount() {
    IframeManager.subscrib(this.receiveMessage);
  }
  componentWillUnmount() {

  }
  onSave = () => {
    IframeManager.unSubscrib();
  }
  onRerenderIframe = (config: any) => {
    const messageData: MessageDataInterface = cloneDeep(this.state.messageData);
    messageData.config.config = JSON.stringify(config);
    messageData.items[messageData.index].config = JSON.stringify(config);
    console.log(messageData);
    IframeManager.postMessage(messageData);
  }
  render() {
    const { messageData } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <iframe
          ref={ref => IframeManager.setIframe(ref && ref.contentWindow)}
          style={{ width: 400, height: 700, border: '1px solid' }}
          src={IframeManager.src}
        ></iframe>
        <div style={{ flexGrow: 1, display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Renderer messageData={messageData} onRerenderIframe={this.onRerenderIframe}/>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <Button type='primary' onClick={this.onSave}>保存</Button>
              <Button style={{ marginRight: 20 }} danger>取消</Button>
            </div>
        </div>
      </div>
    );
  }
}

