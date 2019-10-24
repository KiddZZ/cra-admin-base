import React, { PureComponent, Component } from "react";
import { Form, message, Input, DatePicker, Button } from "antd";
import moment from "moment";

import api from "../api/api-manager";

interface Iprop {
  match: any;
  form: any;
  history: any;
}

@(Form.create() as any)
class ActivityAdd extends (PureComponent || Component)<Iprop> {
  state = {
    id: this.props.match.params.id
  };
  componentDidMount() {
    console.log(this.props);
    const { id } = this.state;
    if (id) {
      // 获取详情
      api.detail(id).then((res: any) => {
        // init form
        this.props.form.setFieldsValue({
          name: res.name,
          time: [moment(res.startAt), moment(res.endAt)],
          scope: res.scope,
          remark: res.remark
        });
      });
    }
  }
  onOk = () => {
    this.props.form.validateFields((err: any, values: any) => {
      if (err) return;
      this.addOrEdit(values);
      // ok
    });
  };

  addOrEdit = async (data: any) => {
    const { id } = this.state;
    if (id) {
      // edit
      let editData = { ...data, id };
      delete editData.time;
      delete editData.name;
      await api.update(id, editData);
      message.success("编辑成功");
      this.props.history.goBack();
    } else {
      // add
      if (data.time) {
        data.startAt = moment(data.time[0]).format("YYYY-MM-DD HH:mm:ss");
        data.endAt = moment(data.time[1]).format("YYYY-MM-DD HH:mm:ss");
      }
      delete data.time;
      await api.addNew(data);
      message.success("添加成功");
      this.props.history.goBack();
    }
  };

  render() {
    const { id } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    };
    const formItemLayout2 = {
      labelCol: { span: 4 },
      wrapperCol: { span: 4 }
    };
    return (
      <div>
        <div
          style={{
            fontSize: 18,
            color: "#363636",
            marginBottom: 20,
            textAlign: "left"
          }}
        >{`${id ? "编辑" : "新增"}营销活动`}</div>
        <Form {...formItemLayout}>
          <Form.Item label="营销活动名称" {...formItemLayout2}>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "请输入营销活动名称"
                },
                {
                  max: 50,
                  message: "营销活动名称不能超过50字符"
                }
              ]
            })(
              <Input
                disabled={id ? true : false}
                placeholder="请输入活动名称"
                style={{ width: 300, textAlign: "left" }}
              />
            )}
          </Form.Item>
          <Form.Item label="营销活动时间">
            {getFieldDecorator("time", {
              rules: [
                {
                  required: true,
                  message: "请选择营销活动时间"
                }
              ]
            })(
              <DatePicker.RangePicker
                disabled={id ? true : false}
                style={{ width: 377 }}
                showTime
              />
            )}
          </Form.Item>
          <Form.Item label="活动范围">
            {getFieldDecorator("scope", {
              rules: [
                {
                  max: 800,
                  message: "活动范围不能超过800字符"
                }
              ]
            })(
              <Input.TextArea
                style={{ minWidth: 377 }}
                placeholder="请输入参与分部门，分品牌、品类 或单品"
                autosize={{ minRows: 4 }}
              />
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator("remark", {
              rules: [
                {
                  max: 800,
                  message: "备注不能超过800字符"
                }
              ]
            })(
              <Input.TextArea
              style={{ minWidth: 377 }}
                placeholder="请输入备注信息，最多800字符"
                autosize={{ minRows: 8 }}
              />
            )}
          </Form.Item>
          <Form.Item label="">
            <div style={{ textAlign: "center" }}>
              <Button onClick={this.onOk} type="primary">
                确定
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default ActivityAdd;
