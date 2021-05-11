import { Table, Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface dataSourceInterface {
    id: string;
    name: string;
    createTime: string;
    remark: string;
}

export const TemplateManagement = () => {
    const history = useHistory();
    const onEdit = (id: string) => {
        history.push(`/home/template-edit/${id}`);
    }
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
            title: '操作',
            key: 'action',
            width: 300,
            render: (text: any, record: dataSourceInterface) => {
                return(
                    <>
                        <Button type='primary' onClick={() => onEdit(record.id)}>编辑</Button>
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

export default TemplateManagement;
