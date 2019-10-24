import http from "../../utils/http";

export function register(postData) {
  const url = "/admin/v1/index/login";
  const data = postData;
  return http.post(url, data);
}

// export function captcha (getData) {
//     const url = '/v1/captcha'
//     const data = getData
//     return get(url,data)
// }
