import { Table, Button } from 'antd';

interface dataSourceInterface {
    id: string;
    name: string;
    createTime: string;
    remark: string;
}

export const TemplateManagement = () => {
    const dataSource: dataSourceInterface[] = [
        {
            id: '1',
            name: '首页',
            createTime: '2021-1-1',
            remark: '首页',
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
            title: 'Action',
            key: 'action',
            render: (text: any, record: dataSourceInterface) => {
                return(
                    <>
                        <Button type='primary'>编辑</Button>
                        <Button type='primary'>预览</Button>
                        <Button danger>删除</Button>
                    </>
                );
            },
        },
    ];
    return (
        <div>
        <Table dataSource={dataSource} columns={columns} />
        </div>
    );
}

export default TemplateManagement;
