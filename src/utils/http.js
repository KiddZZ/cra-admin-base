import axios from "axios";
import qs from "qs";
import { message } from "antd";
import { getUserToken } from "./session";

let notLoginCallback = null;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.delete["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Authorization"] = getUserToken();
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return then(response);
  },
  error => {
    // 对响应错误做点什么
    message.error(`${error}`);
    if (error && error.response && error.response.status === 401) {
      window.location = "/login";
    }
    return reject(error);
  }
);

function then(response) {
  try {
    let res = response.data;
    if (typeof res === "string") {
      res = JSON.parse(res);
    }
    if (res.code === 1 || res.status === "1") {
      return Promise.resolve(res.data ? res.data : res);
    } else if (res.code === -10) {
      notLoginCallback && notLoginCallback();
      if (res.msg) {
        message.error(res.msg);
      }
      return reject(res);
    } else if (res.code === -1) {
      notLoginCallback && notLoginCallback();
      if (res.msg) {
        message.error(res.msg);
      }
      return reject(res);
    } else if (res.code === -9) {
      notLoginCallback && notLoginCallback();
      if (res.msg) {
        message.error(res.msg).then(() => {});
      }
      return reject(res);
    } else if (res.status === 401) {
      window.location = "/mine/login";
    } else {
      return reject(res);
    }
  } catch (e) {
    // JSON 格式解析失败
    return reject(e);
  }
}

function reject(e) {
  return Promise.reject(getErrorMessage(e));
}

function getErrorMessage(e) {
  if (e && e.msg) {
    return e;
  }
  return {
    ret: -1,
    msg: "网络连接失败，请稍后再试"
  };
}

// 本地
const Xurl = "http://192.168.1.200:8011/";

// // 测试
// const Xurl = 'https://zbdx.zbszkj.com/hx-admin/v1'
// // 线上
// const Xurl = 'https://o2o-admin.zbszkj.com/v1'
// isFormData ? data : qs.stringify(data, { arrayFormat: 'repeat' })

export default class http {
  static get(url, data) {
    url = url.replace("/", `${Xurl}`);
    return axios.get(`${url}`, { params: data });
  }

  static post(url, data, isFormData) {
    url = url.replace("/", `${Xurl}`);
    return axios.post(
      `${url}`,
      isFormData ? data : qs.stringify(data, { arrayFormat: "repeat" })
    );
  }

  static postBody(url, data, isFormData) {
    url = url.replace("/", `${Xurl}`);
    return axios.post(`${url}`, data);
  }

  static put(url, data, isRawData) {
    url = url.replace("/", `${Xurl}`);
    return axios.put(
      `${url}`,
      isRawData ? data : qs.stringify(data, { arrayFormat: "repeat" })
    );
  }

  static putY(url, data, isRawData) {
    url = url.replace("/", `${Xurl}`);
    return axios.put(`${url}`, data);
  }

  static apiDelete(url, data) {
    url = url.replace("/", `${Xurl}`);
    return axios.delete(`${url}`, {
      data: qs.stringify(data, { arrayFormat: "repeat" })
    });
  }

  static deleteBody(url, datas) {
    url = url.replace("/", `${Xurl}`);
    return axios.delete(`${url}`, { data: datas.ids });
  }

  static setNotLoginCallback(callback) {
    notLoginCallback = callback;
  }

  static updateAuthorization() {
    axios.defaults.headers.common["Authorization"] = getUserToken();
  }
}
