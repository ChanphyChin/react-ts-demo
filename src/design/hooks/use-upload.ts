import { useState } from 'react';
import { api } from '../../services/api';

export const useUpload = () => {
    const [imgInfo, setImgInfo] = useState<{url: string; name: string;}>();
    const [fileList, setFileList] = useState<{[key: string]: any}>([]);

    const onChange = (data: { file: any }) => {
        if (data.file.status !== 'uploading') {
            console.log(data.file);
        }
    }

    const  customRequest = (options: any) => {
        let formData = new FormData();
        formData.append('image', options.file);
        api.post({
            apiPath: `/admin/upload`,
            params: formData,
        }).then((res:{ url: string; name: string; }) => {
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
        maxCount: 1
    }

    return {
        uploadProps,
        onPreview,
        customRequest,
        onChange,
        imgInfo,
        setImgInfo,
        fileList,
        setFileList
    };
}
