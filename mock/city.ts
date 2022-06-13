import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/getProvinces",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: [
          {
            label: "北京",
            level: "1",
            code: "1100",
            children: [
              {
                label: "北京",
                level: "1",
                code: "1100"
              }
            ]
          },
          {
            label: "天津",
            level: "1",
            code: "1200",
            children: [
              {
                label: "天津",
                level: "1",
                code: "1200"
              }
            ]
          },
          {
            label: "河北",
            level: "1",
            code: "1300",
            children: [
              {
                label: "石家庄",
                level: "2",
                code: "1301"
              },
              {
                label: "唐山",
                level: "3",
                code: "1302"
              },
              {
                label: "秦皇岛",
                level: "3",
                code: "1303"
              },
              {
                label: "邯郸",
                level: "3",
                code: "1304"
              },
              {
                label: "邢台",
                level: "3",
                code: "1305"
              },
              {
                label: "保定",
                level: "3",
                code: "1306"
              },
              {
                label: "张家口",
                level: "3",
                code: "1307"
              },
              {
                label: "承德",
                level: "3",
                code: "1308"
              },
              {
                label: "沧州",
                level: "3",
                code: "1309"
              },
              {
                label: "廊坊",
                level: "3",
                code: "1310"
              },
              {
                label: "衡水",
                level: "3",
                code: "1311"
              }
            ]
          },
          {
            label: "山西",
            level: "1",
            code: "1400",
            children: [
              {
                label: "太原",
                level: "2",
                code: "1401"
              },
              {
                label: "大同",
                level: "3",
                code: "1402"
              },
              {
                label: "阳泉",
                level: "3",
                code: "1403"
              },
              {
                label: "长治",
                level: "3",
                code: "1404"
              },
              {
                label: "晋城",
                level: "3",
                code: "1405"
              },
              {
                label: "朔州",
                level: "3",
                code: "1406"
              },
              {
                label: "晋中",
                level: "3",
                code: "1407"
              },
              {
                label: "运城",
                level: "3",
                code: "1408"
              },
              {
                label: "忻州",
                level: "3",
                code: "1409"
              },
              {
                label: "临汾",
                level: "3",
                code: "1410"
              },
              {
                label: "吕梁",
                level: "3",
                code: "1411"
              }
            ]
          },
          {
            label: "内蒙古自治区",
            level: "1",
            code: "1500",
            children: [
              {
                label: "呼和浩特",
                level: "2",
                code: "1501"
              },
              {
                label: "包头",
                level: "3",
                code: "1502"
              },
              {
                label: "乌海",
                level: "3",
                code: "1503"
              },
              {
                label: "赤峰",
                level: "3",
                code: "1504"
              },
              {
                label: "通辽",
                level: "3",
                code: "1505"
              },
              {
                label: "鄂尔多斯",
                level: "3",
                code: "1506"
              },
              {
                label: "呼伦贝尔",
                level: "3",
                code: "1507"
              },
              {
                label: "巴彦淖尔",
                level: "3",
                code: "1508"
              },
              {
                label: "乌兰察布",
                level: "3",
                code: "1509"
              },
              {
                label: "兴安盟",
                level: "3",
                code: "1522"
              },
              {
                label: "锡林郭勒盟",
                level: "3",
                code: "1525"
              },
              {
                label: "阿拉善盟",
                level: "3",
                code: "1529"
              }
            ]
          },
          {
            label: "辽宁",
            level: "1",
            code: "2100",
            children: [
              {
                label: "沈阳",
                level: "2",
                code: "2101"
              },
              {
                label: "大连",
                level: "3",
                code: "2102"
              },
              {
                label: "鞍山",
                level: "3",
                code: "2103"
              },
              {
                label: "抚顺",
                level: "3",
                code: "2104"
              },
              {
                label: "本溪",
                level: "3",
                code: "2105"
              },
              {
                label: "丹东",
                level: "3",
                code: "2106"
              },
              {
                label: "锦州",
                level: "3",
                code: "2107"
              },
              {
                label: "营口",
                level: "3",
                code: "2108"
              },
              {
                label: "阜新",
                level: "3",
                code: "2109"
              },
              {
                label: "辽阳",
                level: "3",
                code: "2110"
              },
              {
                label: "盘锦",
                level: "3",
                code: "2111"
              },
              {
                label: "铁岭",
                level: "3",
                code: "2112"
              },
              {
                label: "朝阳",
                level: "3",
                code: "2113"
              },
              {
                label: "葫芦岛",
                level: "3",
                code: "2114"
              }
            ]
          },
          {
            label: "吉林",
            level: "1",
            code: "2200",
            children: [
              {
                label: "长春",
                level: "2",
                code: "2201"
              },
              {
                label: "吉林",
                level: "3",
                code: "2202"
              },
              {
                label: "四平",
                level: "3",
                code: "2203"
              },
              {
                label: "辽源",
                level: "3",
                code: "2204"
              },
              {
                label: "通化",
                level: "3",
                code: "2205"
              },
              {
                label: "白山",
                level: "3",
                code: "2206"
              },
              {
                label: "松原",
                level: "3",
                code: "2207"
              },
              {
                label: "白城",
                level: "3",
                code: "2208"
              },
              {
                label: "延边朝鲜族自治州",
                level: "3",
                code: "2224"
              }
            ]
          },
          {
            label: "黑龙江",
            level: "1",
            code: "2300",
            children: [
              {
                label: "哈尔滨",
                level: "2",
                code: "2301"
              },
              {
                label: "齐齐哈尔",
                level: "3",
                code: "2302"
              },
              {
                label: "鸡西",
                level: "3",
                code: "2303"
              },
              {
                label: "鹤岗",
                level: "3",
                code: "2304"
              },
              {
                label: "双鸭山",
                level: "3",
                code: "2305"
              },
              {
                label: "大庆",
                level: "3",
                code: "2306"
              },
              {
                label: "伊春",
                level: "3",
                code: "2307"
              },
              {
                label: "佳木斯",
                level: "3",
                code: "2308"
              },
              {
                label: "七台河",
                level: "3",
                code: "2309"
              },
              {
                label: "牡丹江",
                level: "3",
                code: "2310"
              },
              {
                label: "黑河",
                level: "3",
                code: "2311"
              },
              {
                label: "绥化",
                level: "3",
                code: "2312"
              },
              {
                label: "大兴安岭地区",
                level: "3",
                code: "2327"
              }
            ]
          },
          {
            label: "上海",
            level: "1",
            code: "3100",
            children: [
              {
                label: "上海",
                level: "1",
                code: "3100"
              }
            ]
          },
          {
            label: "江苏",
            level: "1",
            code: "3200",
            children: [
              {
                label: "南京",
                level: "2",
                code: "3201"
              },
              {
                label: "无锡",
                level: "3",
                code: "3202"
              },
              {
                label: "徐州",
                level: "3",
                code: "3203"
              },
              {
                label: "常州",
                level: "3",
                code: "3204"
              },
              {
                label: "苏州",
                level: "3",
                code: "3205"
              },
              {
                label: "南通",
                level: "3",
                code: "3206"
              },
              {
                label: "连云港",
                level: "3",
                code: "3207"
              },
              {
                label: "淮安",
                level: "3",
                code: "3208"
              },
              {
                label: "盐城",
                level: "3",
                code: "3209"
              },
              {
                label: "扬州",
                level: "3",
                code: "3210"
              },
              {
                label: "镇江",
                level: "3",
                code: "3211"
              },
              {
                label: "泰州",
                level: "3",
                code: "3212"
              },
              {
                label: "宿迁",
                level: "3",
                code: "3213"
              }
            ]
          },
          {
            label: "浙江",
            level: "1",
            code: "3300",
            children: [
              {
                label: "杭州",
                level: "2",
                code: "3301"
              },
              {
                label: "宁波",
                level: "3",
                code: "3302"
              },
              {
                label: "温州",
                level: "3",
                code: "3303"
              },
              {
                label: "嘉兴",
                level: "3",
                code: "3304"
              },
              {
                label: "湖州",
                level: "3",
                code: "3305"
              },
              {
                label: "绍兴",
                level: "3",
                code: "3306"
              },
              {
                label: "金华",
                level: "3",
                code: "3307"
              },
              {
                label: "衢州",
                level: "3",
                code: "3308"
              },
              {
                label: "舟山",
                level: "3",
                code: "3309"
              },
              {
                label: "台州",
                level: "3",
                code: "3310"
              },
              {
                label: "丽水",
                level: "3",
                code: "3311"
              }
            ]
          },
          {
            label: "安徽",
            level: "1",
            code: "3400",
            children: [
              {
                label: "合肥",
                level: "2",
                code: "3401"
              },
              {
                label: "芜湖",
                level: "3",
                code: "3402"
              },
              {
                label: "蚌埠",
                level: "3",
                code: "3403"
              },
              {
                label: "淮南",
                level: "3",
                code: "3404"
              },
              {
                label: "马鞍山",
                level: "3",
                code: "3405"
              },
              {
                label: "淮北",
                level: "3",
                code: "3406"
              },
              {
                label: "铜陵",
                level: "3",
                code: "3407"
              },
              {
                label: "安庆",
                level: "3",
                code: "3408"
              },
              {
                label: "黄山",
                level: "3",
                code: "3410"
              },
              {
                label: "滁州",
                level: "3",
                code: "3411"
              },
              {
                label: "阜阳",
                level: "3",
                code: "3412"
              },
              {
                label: "宿州",
                level: "3",
                code: "3413"
              },
              {
                label: "巢湖",
                level: "3",
                code: "3414"
              },
              {
                label: "六安",
                level: "3",
                code: "3415"
              },
              {
                label: "亳州",
                level: "3",
                code: "3416"
              },
              {
                label: "池州",
                level: "3",
                code: "3417"
              },
              {
                label: "宣城",
                level: "3",
                code: "3418"
              }
            ]
          },
          {
            label: "福建",
            level: "1",
            code: "3500",
            children: [
              {
                label: "福州",
                level: "2",
                code: "3501"
              },
              {
                label: "厦门",
                level: "3",
                code: "3502"
              },
              {
                label: "莆田",
                level: "3",
                code: "3503"
              },
              {
                label: "三明",
                level: "3",
                code: "3504"
              },
              {
                label: "泉州",
                level: "3",
                code: "3505"
              },
              {
                label: "漳州",
                level: "3",
                code: "3506"
              },
              {
                label: "南平",
                level: "3",
                code: "3507"
              },
              {
                label: "龙岩",
                level: "3",
                code: "3508"
              },
              {
                label: "宁德",
                level: "3",
                code: "3509"
              }
            ]
          },
          {
            label: "江西",
            level: "1",
            code: "3600",
            children: [
              {
                label: "南昌",
                level: "2",
                code: "3601"
              },
              {
                label: "景德镇",
                level: "3",
                code: "3602"
              },
              {
                label: "萍乡",
                level: "3",
                code: "3603"
              },
              {
                label: "九江",
                level: "3",
                code: "3604"
              },
              {
                label: "新余",
                level: "3",
                code: "3605"
              },
              {
                label: "鹰潭",
                level: "3",
                code: "3606"
              },
              {
                label: "赣州",
                level: "3",
                code: "3607"
              },
              {
                label: "吉安",
                level: "3",
                code: "3608"
              },
              {
                label: "宜春",
                level: "3",
                code: "3609"
              },
              {
                label: "抚州",
                level: "3",
                code: "3610"
              },
              {
                label: "上饶",
                level: "3",
                code: "3611"
              }
            ]
          },
          {
            label: "山东",
            level: "1",
            code: "3700",
            children: [
              {
                label: "济南",
                level: "2",
                code: "3701"
              },
              {
                label: "青岛",
                level: "3",
                code: "3702"
              },
              {
                label: "淄博",
                level: "3",
                code: "3703"
              },
              {
                label: "枣庄",
                level: "3",
                code: "3704"
              },
              {
                label: "东营",
                level: "3",
                code: "3705"
              },
              {
                label: "烟台",
                level: "3",
                code: "3706"
              },
              {
                label: "潍坊",
                level: "3",
                code: "3707"
              },
              {
                label: "济宁",
                level: "3",
                code: "3708"
              },
              {
                label: "泰安",
                level: "3",
                code: "3709"
              },
              {
                label: "威海",
                level: "3",
                code: "3710"
              },
              {
                label: "日照",
                level: "3",
                code: "3711"
              },
              {
                label: "莱芜",
                level: "3",
                code: "3712"
              },
              {
                label: "临沂",
                level: "3",
                code: "3713"
              },
              {
                label: "德州",
                level: "3",
                code: "3714"
              },
              {
                label: "聊城",
                level: "3",
                code: "3715"
              },
              {
                label: "滨州",
                level: "3",
                code: "3716"
              },
              {
                label: "菏泽",
                level: "3",
                code: "3717"
              }
            ]
          },
          {
            label: "河南",
            level: "1",
            code: "4100",
            children: [
              {
                label: "郑州",
                level: "2",
                code: "4101"
              },
              {
                label: "开封",
                level: "3",
                code: "4102"
              },
              {
                label: "洛阳",
                level: "3",
                code: "4103"
              },
              {
                label: "平顶山",
                level: "3",
                code: "4104"
              },
              {
                label: "安阳",
                level: "3",
                code: "4105"
              },
              {
                label: "鹤壁",
                level: "3",
                code: "4106"
              },
              {
                label: "新乡",
                level: "3",
                code: "4107"
              },
              {
                label: "焦作",
                level: "3",
                code: "4108"
              },
              {
                label: "濮阳",
                level: "3",
                code: "4109"
              },
              {
                label: "许昌",
                level: "3",
                code: "4110"
              },
              {
                label: "漯河",
                level: "3",
                code: "4111"
              },
              {
                label: "三门峡",
                level: "3",
                code: "4112"
              },
              {
                label: "南阳",
                level: "3",
                code: "4113"
              },
              {
                label: "商丘",
                level: "3",
                code: "4114"
              },
              {
                label: "信阳",
                level: "3",
                code: "4115"
              },
              {
                label: "周口",
                level: "3",
                code: "4116"
              },
              {
                label: "驻马店",
                level: "3",
                code: "4117"
              }
            ]
          },
          {
            label: "湖北",
            level: "1",
            code: "4200",
            children: [
              {
                label: "武汉",
                level: "2",
                code: "4201"
              },
              {
                label: "黄石",
                level: "3",
                code: "4202"
              },
              {
                label: "十堰",
                level: "3",
                code: "4203"
              },
              {
                label: "宜昌",
                level: "3",
                code: "4205"
              },
              {
                label: "襄樊",
                level: "3",
                code: "4206"
              },
              {
                label: "鄂州",
                level: "3",
                code: "4207"
              },
              {
                label: "荆门",
                level: "3",
                code: "4208"
              },
              {
                label: "孝感",
                level: "3",
                code: "4209"
              },
              {
                label: "荆州",
                level: "3",
                code: "4210"
              },
              {
                label: "黄冈",
                level: "3",
                code: "4211"
              },
              {
                label: "咸宁",
                level: "3",
                code: "4212"
              },
              {
                label: "随州",
                level: "3",
                code: "4213"
              },
              {
                label: "恩施土家族苗族自治州",
                level: "3",
                code: "4228"
              }
            ]
          },
          {
            label: "湖南",
            level: "1",
            code: "4300",
            children: [
              {
                label: "长沙",
                level: "2",
                code: "4301"
              },
              {
                label: "株洲",
                level: "3",
                code: "4302"
              },
              {
                label: "湘潭",
                level: "3",
                code: "4303"
              },
              {
                label: "衡阳",
                level: "3",
                code: "4304"
              },
              {
                label: "邵阳",
                level: "3",
                code: "4305"
              },
              {
                label: "岳阳",
                level: "3",
                code: "4306"
              },
              {
                label: "常德",
                level: "3",
                code: "4307"
              },
              {
                label: "张家界",
                level: "3",
                code: "4308"
              },
              {
                label: "益阳",
                level: "3",
                code: "4309"
              },
              {
                label: "郴州",
                level: "3",
                code: "4310"
              },
              {
                label: "永州",
                level: "3",
                code: "4311"
              },
              {
                label: "怀化",
                level: "3",
                code: "4312"
              },
              {
                label: "娄底",
                level: "3",
                code: "4313"
              },
              {
                label: "湘西土家族苗族自治州",
                level: "3",
                code: "4331"
              }
            ]
          },
          {
            label: "广东",
            level: "1",
            code: "4400",
            children: [
              {
                label: "广州",
                level: "2",
                code: "4401"
              },
              {
                label: "韶关",
                level: "3",
                code: "4402"
              },
              {
                label: "深圳",
                level: "3",
                code: "4403"
              },
              {
                label: "珠海",
                level: "3",
                code: "4404"
              },
              {
                label: "汕头",
                level: "3",
                code: "4405"
              },
              {
                label: "佛山",
                level: "3",
                code: "4406"
              },
              {
                label: "江门",
                level: "3",
                code: "4407"
              },
              {
                label: "湛江",
                level: "3",
                code: "4408"
              },
              {
                label: "茂名",
                level: "3",
                code: "4409"
              },
              {
                label: "肇庆",
                level: "3",
                code: "4412"
              },
              {
                label: "惠州",
                level: "3",
                code: "4413"
              },
              {
                label: "梅州",
                level: "3",
                code: "4414"
              },
              {
                label: "汕尾",
                level: "3",
                code: "4415"
              },
              {
                label: "河源",
                level: "3",
                code: "4416"
              },
              {
                label: "阳江",
                level: "3",
                code: "4417"
              },
              {
                label: "清远",
                level: "3",
                code: "4418"
              },
              {
                label: "东莞",
                level: "3",
                code: "4419"
              },
              {
                label: "中山",
                level: "3",
                code: "4420"
              },
              {
                label: "潮州",
                level: "3",
                code: "4451"
              },
              {
                label: "揭阳",
                level: "3",
                code: "4452"
              },
              {
                label: "云浮",
                level: "3",
                code: "4453"
              }
            ]
          },
          {
            label: "广西壮族自治区",
            level: "1",
            code: "4500",
            children: [
              {
                label: "南宁",
                level: "2",
                code: "4501"
              },
              {
                label: "柳州",
                level: "3",
                code: "4502"
              },
              {
                label: "桂林",
                level: "3",
                code: "4503"
              },
              {
                label: "梧州",
                level: "3",
                code: "4504"
              },
              {
                label: "北海",
                level: "3",
                code: "4505"
              },
              {
                label: "防城港",
                level: "3",
                code: "4506"
              },
              {
                label: "钦州",
                level: "3",
                code: "4507"
              },
              {
                label: "贵港",
                level: "3",
                code: "4508"
              },
              {
                label: "玉林",
                level: "3",
                code: "4509"
              },
              {
                label: "百色",
                level: "3",
                code: "4510"
              },
              {
                label: "贺州",
                level: "3",
                code: "4511"
              },
              {
                label: "河池",
                level: "3",
                code: "4512"
              },
              {
                label: "来宾",
                level: "3",
                code: "4513"
              },
              {
                label: "崇左",
                level: "3",
                code: "4514"
              }
            ]
          },
          {
            label: "海南",
            level: "1",
            code: "4600",
            children: [
              {
                label: "海口",
                level: "2",
                code: "4601"
              },
              {
                label: "三亚",
                level: "3",
                code: "4602"
              }
            ]
          },
          {
            label: "重庆",
            level: "1",
            code: "5000",
            children: [
              {
                label: "重庆",
                level: "1",
                code: "5000"
              }
            ]
          },
          {
            label: "四川",
            level: "1",
            code: "5100",
            children: [
              {
                label: "成都",
                level: "2",
                code: "5101"
              },
              {
                label: "自贡",
                level: "3",
                code: "5103"
              },
              {
                label: "攀枝花",
                level: "3",
                code: "5104"
              },
              {
                label: "泸州",
                level: "3",
                code: "5105"
              },
              {
                label: "德阳",
                level: "3",
                code: "5106"
              },
              {
                label: "绵阳",
                level: "3",
                code: "5107"
              },
              {
                label: "广元",
                level: "3",
                code: "5108"
              },
              {
                label: "遂宁",
                level: "3",
                code: "5109"
              },
              {
                label: "内江",
                level: "3",
                code: "5110"
              },
              {
                label: "乐山",
                level: "3",
                code: "5111"
              },
              {
                label: "南充",
                level: "3",
                code: "5113"
              },
              {
                label: "眉山",
                level: "3",
                code: "5114"
              },
              {
                label: "宜宾",
                level: "3",
                code: "5115"
              },
              {
                label: "广安",
                level: "3",
                code: "5116"
              },
              {
                label: "达州",
                level: "3",
                code: "5117"
              },
              {
                label: "雅安",
                level: "3",
                code: "5118"
              },
              {
                label: "巴中",
                level: "3",
                code: "5119"
              },
              {
                label: "资阳",
                level: "3",
                code: "5120"
              },
              {
                label: "阿坝藏族羌族自治州",
                level: "3",
                code: "5132"
              },
              {
                label: "甘孜藏族自治州",
                level: "3",
                code: "5133"
              },
              {
                label: "凉山彝族自治州",
                level: "3",
                code: "5134"
              }
            ]
          },
          {
            label: "贵州",
            level: "1",
            code: "5200",
            children: [
              {
                label: "贵阳",
                level: "2",
                code: "5201"
              },
              {
                label: "六盘水",
                level: "3",
                code: "5202"
              },
              {
                label: "遵义",
                level: "3",
                code: "5203"
              },
              {
                label: "安顺",
                level: "3",
                code: "5204"
              },
              {
                label: "铜仁地区",
                level: "3",
                code: "5222"
              },
              {
                label: "黔西南布依族苗族自治州",
                level: "3",
                code: "5223"
              },
              {
                label: "毕节地区",
                level: "3",
                code: "5224"
              },
              {
                label: "黔东南苗族侗族自治州",
                level: "3",
                code: "5226"
              },
              {
                label: "黔南布依族苗族自治州",
                level: "3",
                code: "5227"
              }
            ]
          },
          {
            label: "云南",
            level: "1",
            code: "5300",
            children: [
              {
                label: "昆明",
                level: "2",
                code: "5301"
              },
              {
                label: "曲靖",
                level: "3",
                code: "5303"
              },
              {
                label: "玉溪",
                level: "3",
                code: "5304"
              },
              {
                label: "保山",
                level: "3",
                code: "5305"
              },
              {
                label: "昭通",
                level: "3",
                code: "5306"
              },
              {
                label: "丽江",
                level: "3",
                code: "5307"
              },
              {
                label: "普洱",
                level: "3",
                code: "5308"
              },
              {
                label: "临沧",
                level: "3",
                code: "5309"
              },
              {
                label: "楚雄彝族自治州",
                level: "3",
                code: "5323"
              },
              {
                label: "红河哈尼族彝族自治州",
                level: "3",
                code: "5325"
              },
              {
                label: "文山壮族苗族自治州",
                level: "3",
                code: "5326"
              },
              {
                label: "西双版纳傣族自治州",
                level: "3",
                code: "5328"
              },
              {
                label: "大理",
                level: "3",
                code: "5329"
              },
              {
                label: "德宏傣族景颇族自治州",
                level: "3",
                code: "5331"
              },
              {
                label: "怒江傈僳族自治州",
                level: "3",
                code: "5333"
              },
              {
                label: "迪庆藏族自治州",
                level: "3",
                code: "5334"
              }
            ]
          },
          {
            label: "西藏自治区",
            level: "1",
            code: "5400",
            children: [
              {
                label: "拉萨",
                level: "2",
                code: "5401"
              },
              {
                label: "昌都地区",
                level: "3",
                code: "5421"
              },
              {
                label: "山南地区",
                level: "3",
                code: "5422"
              },
              {
                label: "日喀则地区",
                level: "3",
                code: "5423"
              },
              {
                label: "那曲地区",
                level: "3",
                code: "5424"
              },
              {
                label: "阿里地区",
                level: "3",
                code: "5425"
              },
              {
                label: "林芝地区",
                level: "3",
                code: "5426"
              }
            ]
          },
          {
            label: "陕西",
            level: "1",
            code: "6100",
            children: [
              {
                label: "西安",
                level: "2",
                code: "6101"
              },
              {
                label: "铜川",
                level: "3",
                code: "6102"
              },
              {
                label: "宝鸡",
                level: "3",
                code: "6103"
              },
              {
                label: "咸阳",
                level: "3",
                code: "6104"
              },
              {
                label: "渭南",
                level: "3",
                code: "6105"
              },
              {
                label: "延安",
                level: "3",
                code: "6106"
              },
              {
                label: "汉中",
                level: "3",
                code: "6107"
              },
              {
                label: "榆林",
                level: "3",
                code: "6108"
              },
              {
                label: "安康",
                level: "3",
                code: "6109"
              },
              {
                label: "商洛",
                level: "3",
                code: "6110"
              }
            ]
          },
          {
            label: "甘肃",
            level: "1",
            code: "6200",
            children: [
              {
                label: "兰州",
                level: "2",
                code: "6201"
              },
              {
                label: "嘉峪关",
                level: "3",
                code: "6202"
              },
              {
                label: "金昌",
                level: "3",
                code: "6203"
              },
              {
                label: "白银",
                level: "3",
                code: "6204"
              },
              {
                label: "天水",
                level: "3",
                code: "6205"
              },
              {
                label: "武威",
                level: "3",
                code: "6206"
              },
              {
                label: "张掖",
                level: "3",
                code: "6207"
              },
              {
                label: "平凉",
                level: "3",
                code: "6208"
              },
              {
                label: "酒泉",
                level: "3",
                code: "6209"
              },
              {
                label: "庆阳",
                level: "3",
                code: "6210"
              },
              {
                label: "定西",
                level: "3",
                code: "6211"
              },
              {
                label: "陇南",
                level: "3",
                code: "6212"
              },
              {
                label: "临夏回族自治州",
                level: "3",
                code: "6229"
              },
              {
                label: "甘南藏族自治州",
                level: "3",
                code: "6230"
              }
            ]
          },
          {
            label: "青海",
            level: "1",
            code: "6300",
            children: [
              {
                label: "西宁",
                level: "2",
                code: "6301"
              },
              {
                label: "海东地区",
                level: "3",
                code: "6321"
              },
              {
                label: "海北藏族自治州",
                level: "3",
                code: "6322"
              },
              {
                label: "黄南藏族自治州",
                level: "3",
                code: "6323"
              },
              {
                label: "海南藏族自治州",
                level: "3",
                code: "6325"
              },
              {
                label: "果洛藏族自治州",
                level: "3",
                code: "6326"
              },
              {
                label: "玉树藏族自治州",
                level: "3",
                code: "6327"
              },
              {
                label: "海西蒙古族藏族自治州",
                level: "3",
                code: "6328"
              }
            ]
          },
          {
            label: "宁夏回族自治区",
            level: "1",
            code: "6400",
            children: [
              {
                label: "银川",
                level: "2",
                code: "6401"
              },
              {
                label: "石嘴山",
                level: "3",
                code: "6402"
              },
              {
                label: "吴忠",
                level: "3",
                code: "6403"
              },
              {
                label: "固原",
                level: "3",
                code: "6404"
              },
              {
                label: "中卫",
                level: "3",
                code: "6405"
              }
            ]
          },
          {
            label: "新疆维吾尔自治区",
            level: "1",
            code: "6500",
            children: [
              {
                label: "乌鲁木齐",
                level: "2",
                code: "6501"
              },
              {
                label: "克拉玛依",
                level: "3",
                code: "6502"
              },
              {
                label: "吐鲁番地区",
                level: "3",
                code: "6521"
              },
              {
                label: "哈密地区",
                level: "3",
                code: "6522"
              },
              {
                label: "昌吉回族自治州",
                level: "3",
                code: "6523"
              },
              {
                label: "博尔塔拉蒙古自治州",
                level: "3",
                code: "6527"
              },
              {
                label: "巴音郭楞蒙古自治州",
                level: "3",
                code: "6528"
              },
              {
                label: "阿克苏地区",
                level: "3",
                code: "6529"
              },
              {
                label: "克孜勒苏柯尔克孜自治州",
                level: "3",
                code: "6530"
              },
              {
                label: "喀什地区",
                level: "3",
                code: "6531"
              },
              {
                label: "和田地区",
                level: "3",
                code: "6532"
              },
              {
                label: "伊犁哈萨克自治州",
                level: "3",
                code: "6540"
              },
              {
                label: "塔城地区",
                level: "3",
                code: "6542"
              },
              {
                label: "阿勒泰地区",
                level: "3",
                code: "6543"
              }
            ]
          },
          {
            label: "台湾",
            level: "1",
            code: "7100",
            children: [
              {
                label: "台湾",
                level: "1",
                code: "7100"
              }
            ]
          },
          {
            label: "香港特别行政区",
            level: "1",
            code: "8100",
            children: [
              {
                label: "香港特别行政区",
                level: "1",
                code: "8100"
              }
            ]
          },
          {
            label: "澳门特别行政区",
            level: "1",
            code: "8200",
            children: [
              {
                label: "澳门特别行政区",
                level: "1",
                code: "8200"
              }
            ]
          }
        ]
      };
    }
  }
] as MockMethod[];
