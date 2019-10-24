import React, { Component, PureComponent } from "react";
import { Form, Input, Button } from "antd";

@Form.create()
class QueryView extends (PureComponent || Component) {
  componentDidMount = () => {
    console.log(this.props.form);
  };

  onQuery = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
      this.props.onQuery(values);
    });
  };
  reset = () => {
    this.props.form.resetFields();
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 14 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} layout="inline" style={{ textAlign: "left" }}>
        <Form.Item label="营销活动ID">
          {getFieldDecorator("activityId", {})(
            <Input placeholder="请输入营销活动ID" />
          )}
        </Form.Item>
        <Form.Item label="营销活动名称">
          {getFieldDecorator("keyword", {})(
            <Input placeholder="请输入营销活动名称" />
          )}
        </Form.Item>
        <Form.Item>
          <Button onClick={this.onQuery} type="primary">
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={this.reset}>清空</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default QueryView;
