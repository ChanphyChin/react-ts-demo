import { Component } from 'react';
import { Table, Button } from 'antd';
import { cloneDeep } from 'lodash';
import { api } from '../../../services';

interface DasheboardState {
  dataSource: any[];
  pagination: {
    page: number;
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  }
}

export class Dasheboard extends Component<any, DasheboardState> {
  state: DasheboardState = {
    dataSource: [],
    pagination: {
      page: 1,
      current: 1,
      pageSize: 10,
      total: 1,
      onChange: (page: number) => {}
    }
  }
  componentDidMount() {
    this.getDataSource(1);
  }
  getDataSource = (page: number) => {
    api.get({
      apiPath: '/dasheboard_table',
      params: {
        page,
        pageSize: 10
      }
    }).then(res => {
      this.setState((preState)=> {
        return { dataSource: res.result, pagination: {...preState.pagination, page: res.page, current: res.page, pageSize: res.pageSize, total: res.total } }
      })
    })
  }
  onPageChange = (page: number) => {
    this.getDataSource(page);
  }
  render() {
    let { dataSource, pagination } = this.state;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    pagination = cloneDeep(pagination);
    pagination.onChange = this.onPageChange;
    return (
      <div>
        <Button type='primary' onClick={() => this.getDataSource(1)}>获取数据</Button>
        <Table dataSource={dataSource} columns={columns} style={{marginTop: 30}} pagination={pagination}/>
      </div>
    );
  }
}
