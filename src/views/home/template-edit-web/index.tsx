import { Component } from 'react';
import { Button, message } from 'antd';
import { cloneDeep } from 'lodash';
import { connect } from 'react-redux';
import { Renderer } from '../../../design';
import { IframeManager, api, getQueryVariable } from '../../../services';
import { MessageDataInterface, ComponentConfigInterface } from '../../../types';
import { setMessageData } from '../../../store/action';
import './index.scss';

interface TemplateEditState {
  messageData: MessageDataInterface;
  page: string;
}

interface TemplateEditProps {
  setMessageData: (msg: MessageDataInterface) => any;
  location: any;
}

const PAGE_TYPES = ['home', 'store'];

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
      <div>
        <div style={{ width: '100%', textAlign: 'right', marginBottom: 10 }}>
          <Button style={{ marginRight: 20 }} type='primary' onClick={this.onSave}>保存</Button>
          <Button style={{ marginRight: 20 }} danger>取消</Button>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='web-iframe'>
            <iframe
              title='iframe'
              className='web-iframe-content'
              ref={ref => IframeManager.setIframe(ref && ref.contentWindow)}
              style={{ width: 1920, height: 920, border: '1px solid' }}
              src={`${process.env.REACT_APP_IFRAME_WEB_ROOT}/#/home?type=edit&page=home`}
            ></iframe>
          </div>
          <div style={{ flexGrow: 1, display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <Renderer messageData={messageData} onRerenderIframe={this.onRerenderIframe} onUpDateConfig={this.onUpDateConfig}/>
              </div>
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

export const TemplateEditWeb = connect(null, mapDispatchToProps)(Page);
