import loadable from "@loadable/component";

// const activityList = loadable(() => import("./pages/activity/list"));

const Login = loadable(() => import("./pages/login/index.jsx"));

const routes = [
  /* 营销活动列表 */
  // {
  //   path: "/activity/list",
  //   component: activityList
  // },
  /* 登录 */
  {
    path: "/login",
    component: Login
  }
];

export default routes;
