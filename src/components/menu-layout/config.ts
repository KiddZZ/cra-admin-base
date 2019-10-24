const menus = [
  {
    type: "activity",
    text: "营销活动管理",
    children: [
      {
        path: "/activity/list",
        text: "营销活动列表",
        children: [
          {
            path: "/activity/add",
            text: "添加编辑营销活动"
          }
        ]
      }
    ]
  },
  {
    type: "coupon",
    text: "优惠券管理",
    children: [
      {
        path: "/coupon/list",
        text: "优惠券列表",
        children: [
          {
            path: "/coupon/add",
            text: "添加编辑优惠券"
          }
        ]
      }
    ]
  }
];
export default menus;
