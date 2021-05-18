import { Table, Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface dataSourceInterface {
    id: string;
    name: string;
    createTime: string;
    remark: string;
    type: string;
}

export const TemplateManagementWeb = () => {
    const history = useHistory();
    const onEdit = (type: string) => {
        history.push(`/home/template-edit-web?type=${type}`);
    }
    const dataSource: dataSourceInterface[] = [
        {
            id: '1',
            name: '首页',
            createTime: '2021-1-1',
            remark: '首页',
            type: 'webHome'
        },
        {
            id: '2',
            name: '店铺页面',
            createTime: '2021-1-1',
            remark: '店铺页面',
            type: 'webStore'
        },
    ];
    
    const columns = [
        {
            title: '模板名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: '操作',
            key: 'action',
            width: 300,
            render: (text: any, record: dataSourceInterface) => {
                return(
                    <>
                        <Button type='primary' onClick={() => onEdit(record.type)}>编辑</Button>
                        <Button type='primary' style={{ margin: '0 10px' }}>预览</Button>
                        <Button danger>删除</Button>
                    </>
                );
            },
        },
    ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={record => record.id} />
        </div>
    );
}
