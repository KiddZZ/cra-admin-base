import React, { PureComponent, Component } from "react";
import { Pagination, message } from "antd";

import QueryForm from "./view/query";
import TableView from "./view/main-table-v";
import api from "../api/api-manager";

interface Iprops {
  history: any;
}

export default class ActivityList extends (PureComponent || Component)<Iprops> {
  state = {
    searchParams: {},
    pagination: {
      page: 1,
      size: 10
    },
    total: 0,
    dataSource: []
  };
  componentDidMount() {
    this.getDataList();
  }
  getDataList = () => {
    const { searchParams, pagination } = this.state;
    api.searchList({ ...searchParams, ...pagination }).then((res: any) => {
      this.setState({
        dataSource: res.records,
        pagination: {
          page: res.current,
          size: res.size
        },
        total: res.total
      });
    });
  };
  // 搜索
  onQuery = (searchParams: any) => {
    this.setState({ searchParams }, () => {
      this.getDataList();
    });
  };
  // 编辑
  onEdit = ({ id }: any) => {
    this.props.history.push("/activity/add/" + id);
  };
  toNew = () => {
    this.props.history.push("/activity/add/");
  };
  // 删除
  onDelete = async ({ id }: any) => {
    await api.delete(id);
    message.success("删除成功");
    this.getDataList();
  };
  onChangePage = (page: number, pageSize: number | undefined) => {
    this.setState(
      {
        pagination: {
          page,
          size: pageSize
        }
      },
      () => {
        this.getDataList();
      }
    );
  };
  render() {
    const { dataSource, pagination, total } = this.state;
    return (
      <div>
        <div>
          <QueryForm onQuery={this.onQuery} />
        </div>
        <div style={{ marginTop: 20 }}>
          <TableView
            dataSource={dataSource}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            toNew={this.toNew}
          />
        </div>
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Pagination
            current={pagination.page}
            pageSize={pagination.size}
            total={total}
            showQuickJumper
            showSizeChanger
            showTotal={(total: number) => <span>共{total}条记录</span>}
            onChange={this.onChangePage}
          />
        </div>
      </div>
    );
  }
}
