import { Component } from 'react';
import { Button, message } from 'antd';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { Renderer } from '../../../design';
import { IframeManager, api, getQueryVariable } from '../../../services';
import { MessageDataInterface, ComponentConfigInterface } from '../../../types';
import { setMessageData } from '../../../store/action';

interface TemplateEditState {
  messageData: MessageDataInterface;
  page: string;
}

interface TemplateEditProps {
  setMessageData: (msg: MessageDataInterface) => any;
  location: any;
  history: any;
}

// const PAGE_TYPES = ['home', 'store'];

class Page extends Component<TemplateEditProps, TemplateEditState> {
  state: TemplateEditState = {
    messageData: { config: { component: '', config: '' }, items: [], index: 0, type: 'add' },
    page: 'home'
  }
  iframeRef: any;
  receiveMessage = (e: { data: MessageDataInterface }) => {
    if(!e.data.type) return;
    this.props.setMessageData(e.data);
    this.setState({messageData: e.data});
  }
  componentDidMount() {
    const { location: { search } } = this.props;
    IframeManager.subscrib(this.receiveMessage);
    this.setState({ page: getQueryVariable(search).type });
  }
  componentWillUnmount() {
    IframeManager.unSubscrib();
  }
  onSave = () => {
    let params: MessageDataInterface = cloneDeep(this.state.messageData);
    params.pageType = this.state.page;
    api.post({
      apiPath: '/admin/update_config',
      params
    }).then(res => {
      message.success(res.success);
    })
  }
  onRerenderIframe = (config: ComponentConfigInterface) => {
    const messageData: MessageDataInterface = cloneDeep(this.state.messageData);
    messageData.config.config = JSON.stringify(config);
    messageData.items[messageData.index].config = JSON.stringify(config);
    this.setState({messageData});
    IframeManager.postMessage(messageData);
  }

  onUpDateConfig = (messageData: MessageDataInterface) => {
    window.postMessage(messageData, '*');
    IframeManager.postMessage(messageData);
  }

  render() {
    const { messageData } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <iframe
          title='iframe'
          ref={ref => IframeManager.setIframe(ref && ref.contentWindow)}
          style={{ width: 400, height: 700, border: '1px solid' }}
          src={IframeManager.getSrc(this.state.page)}
        ></iframe>
        <div style={{ flexGrow: 1, display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Renderer messageData={messageData} onRerenderIframe={this.onRerenderIframe} onUpDateConfig={this.onUpDateConfig}/>
            </div>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <Button style={{ marginRight: 20 }} type='primary' onClick={this.onSave}>保存</Button>
              <Button onClick={() => this.props.history.push('/home/template-management')} style={{ marginRight: 20 }} danger>取消</Button>
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
