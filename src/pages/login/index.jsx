import React from "react";
import "./index.scss";
import { Input, Button, message } from "antd";
import { register } from "./api";
import { setUserToken } from "@/utils/session";

export default class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ""
    };
  }

  onChange = (e, rag) => {
    this.setState({
      [rag]: e.target.value
    });
  };

  sub = () => {
    const { word } = this.state;
    if (!word) {
      message.error("请输入口令");
    } else {
      register({ word })
        .then(res => {
          setUserToken(res);
        })
        .then(() => {
          this.props.history.push("/activity/list");
        });
    }
  };

  render() {
    return (
      <div className="register">
        <div className="register-middle">
          {/* <div className = "register-middle-box">
                        <span className="register-middle-title"> 用户名： </span>
                        <Input onChange = {(e)=>{this.onChange(e,'username')}}  />
                    </div> */}
          <div style={{ width: "100%", textAlign: "center" }}>
            <div>
              <span className="register-middle-title"> 口令： </span>
              <Input
                type="password"
                onChange={e => {
                  this.onChange(e, "word");
                }}
              />
            </div>
            <Button type="primary" onClick={this.sub}>
              登录
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
