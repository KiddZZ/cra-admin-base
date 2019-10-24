import React, { Component, PureComponent } from "react";
import { Table, Button } from "antd";
import TextPopconfirm from "@/components/TextPopconfirm";

export default class TableView extends (PureComponent || Component) {
  get columns() {
    const { onEdit, onDelete } = this.props;
    let ret = [
      {
        title: "营销活动ID",
        key: "id",
        dataIndex: "id"
      },
      {
        title: "营销活动名称",
        key: "name",
        dataIndex: "name"
      },
      {
        title: "活动时间",
        key: "createdAt",
        dataIndex: "createdAt"
      },
      {
        title: "活动范围",
        key: "scope",
        dataIndex: "scope"
      },
      {
        title: "备注",
        key: "remark",
        dataIndex: "remark"
      },
      {
        title: "操作",
        key: "do",
        render: record => (
          <div>
            <a onClick={() => onEdit(record)}>编辑</a> 　
            {/* <a onClick={() => onDelete(record)}>删除</a> 　 */}
            <TextPopconfirm onConfirm={() => onDelete(record)} />
          </div>
        )
      }
    ];
    return ret;
  }

  render() {
    const { dataSource, toNew } = this.props;
    return (
      <div>
        <div style={{ marginBottom: 10, textAlign: "right" }}>
          <Button type="primary" onClick={toNew}>
            新增营销活动
          </Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    );
  }
}
