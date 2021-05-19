import { Form, Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { UploadFile } from 'antd/lib/upload/interface';

import { UrlSelector } from '../index';
import { CustomerSwiperConfig, DesignConfig } from '../../types';
import { api } from '../../services/api';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

export const CustomerBannerEditor = (props: DesignConfig<any>) => {
    const [imgInfo, setImgInfo] = useState<{url: string; name: string;}>();
    const [fileList, setFileList] = useState<{[key: string]: any}>([]);
    const [linkInfo, setLinkInfo] = useState<{ name: string, url: string }>();
    
    const onFinish = (config: CustomerSwiperConfig) => {
        const { onRerenderIframe } = props;
        const params = {
          imgInfo,
          linkInfo: linkInfo
        }
        console.log(config);
        onRerenderIframe(params);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (data: { file: any }) => {
        if (data.file.status !== 'uploading') {
            console.log(data.file);
        }
    }
    
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

    const  customRequest = (options: any) => {
        let formData = new FormData();
        formData.append('image', options.file);
        api.post({
            apiPath: `/admin/upload`,
            params: formData,
        }).then((res: {url: string; name: string;}) => {
          setImgInfo(res);
          setFileList([{
            uid: '-1',
            name: res.name,
            status: 'done',
            url: res.url,
            thumbUrl: res.url,
          }]);
            options.onSuccess();
        })    
    }

    const onPreview = (file: any) => {
        window.open(imgInfo && imgInfo.url);
    }

    const uploadProps = {
        name: 'image',
        onChange: onChange,
        customRequest,
        onPreview: onPreview,
        maxCount: 1,
    }

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
                <Form.Item>
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
