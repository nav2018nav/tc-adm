import component from "./zh-CN/component";
import globalHeader from "./zh-CN/globalHeader";
import menu from "./zh-CN/menu";
import pwa from "./zh-CN/pwa";
import settingDrawer from "./zh-CN/settingDrawer";
import settings from "./zh-CN/settings";
import pages from "./zh-CN/pages";

export default {
  'login.msg.risk':'自愿参考责任及风险告知书',
   "label.firstweek": "第一周",
  "label.secondweek": "第二周",
  "label.forthweek": "第四周",
  "label.thirdweek": "第三周",
  "label.Monday": "星期一",
  "label.Tuesday": "星期二",
  "label.Wednesday": "星期三",
  "label.Thursday": "星期四",
  "label.Friday": "星期五",
  "label.Saturday": "星期六",
  "label.Sunday": "星期日",
  'login.bylogintext.msg':'登录及使用本系统，即代表同意我们的',
  'transaction.paid.status':'已支付',
  'transaction.unpaid.status':'待支付',
  "status.registr.female":'女',
  "status.registr.male":'男',
  'defaultfooter.label':'考能力',
  "login.text.signout": "登出",
  "login.msg.termofuse": "用户协议",
  "login.msg.Privacypolicy": "隐私政策",
  "login.text.msg": "与",
  "login.text.lbl.testcenter": "考试管理平台",
  "navBar.lang": "语言",
  "layout.user.link.help": "帮助",
  "layout.user.link.privacy": "隐私",
  "layout.user.link.terms": "条款",
  "app.preview.down.block": "下载此页面到本地项目",
  "app.welcome.link.fetch-blocks": "获取全部区块",
  "app.welcome.link.block-list": "基于 block 开发，快速构建标准页面",

  'status.canceled.status':'已取消',
   'status.checkin.status':'已检录',
  'status.registr.status':'已报名',
  'status.active.status':'激活',
  'status.inactive.status':'未激活',
  'status.cancel.status':'取消',
  'status.written':'笔试',
  'status.physical':'素质考试',
  'status.practical':'技能考试',
  'login.msg.Copyright':'版权',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
