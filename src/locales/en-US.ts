import component from "./en-US/component";
import globalHeader from "./en-US/globalHeader";
import menu from "./en-US/menu";
import pwa from "./en-US/pwa";
import settingDrawer from "./en-US/settingDrawer";
import settings from "./en-US/settings";
import pages from "./en-US/pages";

export default {
  'login.msg.risk':'Risk Agreement',
   "label.firstweek": "First Week",
  "label.secondweek": "Second Week",
  "label.forthweek": "Forth Week",
  "label.thirdweek": "Third Week",
   "label.Monday": "Monday",
  "label.Tuesday": "Tuesday",
  "label.Wednesday": "Wednesday",
  "label.Thursday": "Thursday",
  "label.Friday": "Friday",
  "label.Saturday": "Saturday",
  "label.Sunday": "Sunday",
  'defaultfooter.label':'考能力',
  'login.bylogintext.msg':'By login to this site, you agree',
  'transaction.paid.status':'Paid',
  'transaction.unpaid.status':'Unpaid',
  "status.registr.female":'Female',
  "status.registr.male":'Male',
  "login.text.signout": "Sign out",
  "login.msg.termofuse": "Terms of use",
  "login.msg.Privacypolicy": "Privacy policy",
  "login.text.msg": "and",
  "login.text.lbl.testcenter": "Test Center",
  "navBar.lang": "Languages",
  "layout.user.link.help": "Help",
  "layout.user.link.privacy": "Privacy",
  "layout.user.link.terms": "Terms",
  'status.canceled.status':'canceled',
  'status.checkin.status':'Checked-In',
  'status.registr.status':'Register',
  'status.active.status':'Active',
  'status.inactive.status':'Inactive',
  'status.cancel.status':'Cancel',
  'status.written':'written',
  'status.physical':'physical',
  'status.practical':'practical',
  'login.msg.Copyright':'Copyright',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
