import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/getPrice",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: [
          {
            name: "百世快运",
            weight: 3,
            data: [
              {
                label: "北京",
                level: "1",
                code: "1100",
                weight: 3,
                price: [
                  [0, 3, 20],
                  [3, 60, 1.6, 20],
                  [60, 1.5]
                ]
              },
              {
                label: "天津",
                level: "1",
                code: "1200",
                weight: 3,
                price: [
                  [0, 3, 20],
                  [3, 60, 1.6, 20],
                  [60, 1.5]
                ]
              },
              {
                label: "河北",
                level: "1",
                code: "1300",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "山西",
                level: "1",
                code: "1400",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "内蒙古自治区",
                level: "1",
                code: "1500",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "辽宁",
                level: "1",
                code: "2100",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "吉林",
                level: "1",
                code: "2200",
                weight: 3,
                price: [
                  [0, 3, 25],
                  [3, 60, 2, 25],
                  [60, 2]
                ]
              },
              {
                label: "黑龙江",
                level: "1",
                code: "2300",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "上海",
                level: "1",
                code: "3100",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "江苏",
                level: "1",
                code: "3200",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "浙江",
                level: "1",
                code: "3300",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "安徽",
                level: "1",
                code: "3400",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "福建",
                level: "1",
                code: "3500",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "江西",
                level: "1",
                code: "3600",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "山东",
                level: "1",
                code: "3700",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "河南",
                level: "1",
                code: "4100",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "湖北",
                level: "1",
                code: "4200",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "湖南",
                level: "1",
                code: "4300",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "广东",
                level: "1",
                code: "4400",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "广西壮族自治区",
                level: "1",
                code: "4500",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "海南",
                level: "1",
                code: "4600",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "重庆",
                level: "1",
                code: "5000",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "四川",
                level: "1",
                code: "5100",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "贵州",
                level: "1",
                code: "5200",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "云南",
                level: "1",
                code: "5300",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "西藏自治区",
                level: "1",
                code: "5400",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "陕西",
                level: "1",
                code: "6100",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "甘肃",
                level: "1",
                code: "6200",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "青海",
                level: "1",
                code: "6300",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "宁夏回族自治区",
                level: "1",
                code: "6400",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              },
              {
                label: "新疆维吾尔自治区",
                level: "1",
                code: "6500",
                weight: 3,
                price: [
                  [0, 3, 15],
                  [3, 60, 1.3, 15],
                  [60, 1.3]
                ]
              }
            ]
          }
        ]
      };
    }
  }
] as MockMethod[];

// { label: "北京", level: "1", code: "1100" },
// { label: "天津", level: "1", code: "1200" },
// { label: "河北", level: "1", code: "1300" },
// { label: "山西", level: "1", code: "1400" },
// { label: "内蒙古自治区", level: "1", code: "1500" },
// { label: "辽宁", level: "1", code: "2100" },
// { label: "吉林", level: "1", code: "2200" },
// { label: "黑龙江", level: "1", code: "2300" },
// { label: "上海", level: "1", code: "3100" },
// { label: "江苏", level: "1", code: "3200" },
// { label: "浙江", level: "1", code: "3300" },
// { label: "安徽", level: "1", code: "3400" },
// { label: "福建", level: "1", code: "3500" },
// { label: "江西", level: "1", code: "3600" },
// { label: "山东", level: "1", code: "3700" },
// { label: "河南", level: "1", code: "4100" },
// { label: "湖北", level: "1", code: "4200" },
// { label: "湖南", level: "1", code: "4300" },
// { label: "广东", level: "1", code: "4400" },
// { label: "广西壮族自治区", level: "1", code: "4500" },
// { label: "海南", level: "1", code: "4600" },
// { label: "重庆", level: "1", code: "5000" },
// { label: "四川", level: "1", code: "5100" },
// { label: "贵州", level: "1", code: "5200" },
// { label: "云南", level: "1", code: "5300" },
// { label: "西藏自治区", level: "1", code: "5400" },
// { label: "陕西", level: "1", code: "6100" },
// { label: "甘肃", level: "1", code: "6200" },
// { label: "青海", level: "1", code: "6300" },
// { label: "宁夏回族自治区", level: "1", code: "6400" },
// { label: "新疆维吾尔自治区", level: "1", code: "6500" }
