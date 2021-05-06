import { Component } from 'react';
import { Button } from 'antd';
import { Renderer } from '../../../design';

interface MessageDataInterface {
  config: {
    component: string;
  }
}

export class TemplateEdit extends Component<any, any> {
  state = {
    messageData: undefined,
  }
  iframeRef: any;
  receiveMessage = (e: any) => {
    if(!e.data.config) return;
    this.setState({messageData: e.data});
  }
  componentDidMount() {
    window.addEventListener("message", this.receiveMessage, false);
  }
  onSave = () => {
    this.iframeRef.contentWindow.postMessage({refresh: 'id'},'*')
  }
  onRerenderIframe = () => {
    
  }
  render() {
    const { messageData } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <iframe
          ref={ref => this.iframeRef = ref}
          style={{ width: 400, height: 700, border: '1px solid' }}
          src='http://192.168.0.8:10086/#/pages/index/index'
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

