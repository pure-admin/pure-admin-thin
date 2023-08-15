<p align="center">
      <img src="https://img.shields.io/badge/Release-V1.8.0-green.svg" alt="Downloads">
      <img src="https://img.shields.io/badge/JDK-1.8+-green.svg" alt="Build Status">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Build Status">
   <img src="https://img.shields.io/badge/Spring%20Boot-2.7.1-blue.svg" alt="Downloads">
   <a target="_blank" href="https://bladex.vip">
   <img src="https://img.shields.io/badge/Author-valarchie-ff69b4.svg" alt="Downloads">
 </a>
 <a target="_blank" href="https://bladex.vip">
   <img src="https://img.shields.io/badge/Copyright%20-@Agileboot-%23ff3f59.svg" alt="Downloads">
 </a>
 </p>  
<p align="center">

<img alt="logo" height="200" src="https://oscimg.oschina.net/oscnet/up-eda2a402cc061f1f5f40d9ac4c084f4c98c.png">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">AgileBoot v2.0.0</h1>

<h4 align="center">基于SpringBoot+Vue3前后端分离的Java快速开发框架</h4>
<p align="center">
</p>

## ⚡ 平台简介 ⚡

- 本仓库是 Agilboot 快速开发脚手架的配套前端项目。前端是基于优秀的开源项目[Pure-Admin](https://github.com/pure-admin/vue-pure-admin)开发而成。在此感谢 Pure-Admin 作者。
- 本仓库前端技术栈 [Vue3](https://v3.cn.vuejs.org) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 版本。
- 配套后端代码仓库地址[AgileBoot-Back-End](https://github.com/valarchie/AgileBoot-Back-End) 版本。

- 规范请参照该文档 [前端规范](https://gitee.com/MinJieLiu/web-standard#/MinJieLiu/web-standard)

### 前端配套资料

#### 配套视频

- [点我查看教程](https://www.bilibili.com/video/BV1kg411v7QT)
- [点我查看 UI 设计](https://www.bilibili.com/video/BV17g411T7rq)

#### 配套保姆级文档

- [查看文档](https://yiming_chang.gitee.io/pure-admin-doc)

#### Pure-Admin 框架预览

- [查看预览](https://pure-admin-thin.netlify.app/#/login)

#### Pure-Admin 维护者

- [xiaoxian521](https://github.com/xiaoxian521)

## ✨ 使用 ✨

### 开发环境

node 版本应不小于 16 ，pnpm 版本应不小于 6  
版本请勿过新，有先选择 node=16, pnpm=7.30.5  
如果您还没安装 pnpm，请执行下面命令进行安装（mac 用户遇到安装报错请在命令前加上 sudo） 如果是 windows 用户 用使用管理员 power shell 来执行

```
npm install -g pnpm
```

安装依赖

```
pnpm install
```

启动平台

```
pnpm dev
```

不管是什么源，我们都可以不用管，直接执行下面命令即可

npm config set registry https://registry.npmmirror.com

上面的命令是将本地的源换成国内源 npmmirror
(opens new window)，经过几轮测试，发现它的下载速度快且同步率高，同步频率 10 分钟一次，如果您之前的源是这个 http://registry.npm.taobao.org ，那您必须换成 npmmirror 啦，因为原淘宝 npm 域名即将停止解析

## 🙊 系统内置功能 🙊

🙂 大部分功能，均有通过 **单元测试** **集成测试** 保证质量。

|     | 功能       | 描述                                                          |
| --- | ---------- | ------------------------------------------------------------- |
|     | 用户管理   | 用户是系统操作者，该功能主要完成系统用户配置                  |
| ⭐  | 部门管理   | 配置系统组织机构（公司、部门、小组），树结构展现支持数据权限  |
| ⭐  | 岗位管理   | 配置系统用户所属担任职务                                      |
|     | 菜单管理   | 配置系统菜单、操作权限、按钮权限标识等，本地缓存提供性能      |
| ⭐  | 角色管理   | 角色菜单权限分配、设置角色按机构进行数据范围权限划分          |
|     | 参数管理   | 对系统动态配置常用参数                                        |
|     | 通知公告   | 系统通知公告信息发布维护                                      |
| 🚀  | 操作日志   | 系统正常操作日志记录和查询；系统异常信息日志记录和查询        |
|     | 登录日志   | 系统登录日志记录查询包含登录异常                              |
|     | 在线用户   | 当前系统中活跃用户状态监控                                    |
|     | 系统接口   | 根据业务代码自动生成相关的 api 接口文档                       |
|     | 服务监控   | 监视当前系统 CPU、内存、磁盘、堆栈等相关信息                  |
|     | 缓存监控   | 对系统的缓存信息查询，命令统计等                              |
|     | 连接池监视 | 监视当前系统数据库连接池状态，可进行分析 SQL 找出系统性能瓶颈 |

## 💥 在线体验 💥

演示地址：

- <www.agileboot.vip>
- <www.agileboot.cc>
  > 账号密码：admin/admin123

[项目文档](https://juejin.cn/column/7159946528827080734)

## 🎬 AgileBoot 全栈交流群 🎬

QQ 群： [![加入QQ群](https://img.shields.io/badge/1398880-blue.svg)](https://qm.qq.com/cgi-bin/qm/qr?k=TR5guoXS0HssErVWefmdFRirJvfpEvp1&jump_from=webapi&authKey=VkWMmVhp/pNdWuRD8sqgM+Sv2+Vy2qCJQSeLmeXlLtfER2RJBi6zL56PdcRlCmTs) 点击按钮入群。

如果觉得该项目对您有帮助，可以小额捐赠支持本项目演示网站服务器等费用~

<img alt="logo" height="200" src="https://oscimg.oschina.net/oscnet/up-28b63fdd7b3ce003bd30c25883f2276212b.png">

### 用法

#### 安装依赖

```
pnpm install
```

#### 安装一个包

```
pnpm add 包名
```

#### 卸载一个包

```
pnpm remove 包名
```

### 许可证

原则上不收取任何费用及版权，可商用，不过如需二次开源（比如用此平台二次开发并开源，要求前端代码必须开源免费）请联系作者获取许可！（免费，走个记录而已）
