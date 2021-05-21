import { Form, Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

import { UrlSelector } from '../index';
import { CustomerSwiperConfig, DesignConfig } from '../../types';
import { useUpload } from '../../hooks';

export const CustomerBannerEditor = (props: DesignConfig<any>) => {
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    const { uploadProps, imgInfo, setImgInfo, fileList, setFileList } = useUpload();
    
    const onFinish = (config: CustomerSwiperConfig) => {
        const { onRerenderIframe } = props;
        const params = {
          imgInfo,
          linkInfo: linkInfo
        }
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    useEffect(() => {
        const config = JSON.parse(props.config);
        const imgInfo = config.imgInfo;
        setLinkInfo(config.linkInfo);
        if(imgInfo) {
          setImgInfo(imgInfo);
          setFileList([{
            uid: '-1',
            name: imgInfo.name,
            status: 'done',
            url: imgInfo.url,
            thumbUrl: imgInfo.url,
          }]);
        }else {
          setFileList([]);
        }
    }, [props.config]);

    const onUrlChange = (linkInfo: {name: string; url:string;}) => {
        setLinkInfo(linkInfo);
    }

    return (
        <Card>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="pic" label="Pic" valuePropName='pic'>
                  {/* @ts-ignore */}
                    <Upload {...uploadProps} listType='picture' fileList={fileList}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Link To" >
                    <UrlSelector onUrlChange={onUrlChange} defaultValue={linkInfo}/>
                </Form.Item>
                <Form.Item style={{ textAlign: 'right', marginTop: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
