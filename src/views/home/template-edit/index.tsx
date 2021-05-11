import { Component } from 'react';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { Renderer } from '../../../design';
import { IframeManager, api } from '../../../services';
import { MessageDataInterface, ComponentConfigInterface } from '../../../types';
import { setMessageData } from '../../../store/action';

interface TemplateEditState {
  messageData: MessageDataInterface;
}

class Page extends Component<{setMessageData: (msg: MessageDataInterface) => any}, TemplateEditState> {
  state: TemplateEditState = {
    messageData: { config: { component: '', config: '' }, items: [], index: 0, type: 'add' },
  }
  iframeRef: any;
  receiveMessage = (e: { data: MessageDataInterface }) => {
    if(!e.data.type) return;
    this.props.setMessageData(e.data);
    this.setState({messageData: e.data});
  }
  componentDidMount() {
    IframeManager.subscrib(this.receiveMessage);
  }
  componentWillUnmount() {
    IframeManager.unSubscrib();
  }
  onSave = () => {
    let params: MessageDataInterface = cloneDeep(this.state.messageData);
    params.pageType = 'home';
    api.post({
      apiPath: '/admin/update_config',
      params
    }).then(res => {
      
    })
  }
  onRerenderIframe = (config: ComponentConfigInterface) => {
    const messageData: MessageDataInterface = cloneDeep(this.state.messageData);
    messageData.config.config = JSON.stringify(config);
    messageData.items[messageData.index].config = JSON.stringify(config);
    console.log(messageData);
    this.setState({messageData});
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
              <Button style={{ marginRight: 20 }} type='primary' onClick={this.onSave}>保存</Button>
              <Button style={{ marginRight: 20 }} danger>取消</Button>
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessageData: (messageData: MessageDataInterface) => {
      return dispatch(setMessageData(messageData));
    }
  }
}

export const TemplateEdit = connect(null, mapDispatchToProps)(Page);
