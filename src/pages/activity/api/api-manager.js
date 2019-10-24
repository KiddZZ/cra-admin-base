import http from "@/utils/http";

export default class APIManager {
  static searchList(data) {
    return http.get("/admin/v1/activity/search", data);
  }
  static delete(id) {
    return http.apiDelete(`/admin/v1/activity/${id}`, { id });
  }
  static update(id, data) {
    return http.putY(`/admin/v1/activity/${id}`, data);
  }
  static addNew(data) {
    return http.postBody(`/admin/v1/activity/create`, data);
  }
  static detail(id) {
    return http.get(`/admin/v1/activity/${id}`);
  }
}
