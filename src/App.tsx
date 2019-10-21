import React from "react";
import "./app.less";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { ConfigProvider, Button } from "antd";
import aa from '@/images/background.png'

moment.locale("zh-cn");

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="app">
        <h1 className="text">Hello Webpack</h1>
        <img className="background" src={aa} alt="" />
        <Button>按钮</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;
