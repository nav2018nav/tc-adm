import { connect, Dispatch, FormattedMessage, formatMessage } from "umi";
export const statusArr = {  
  "active": formatMessage({ id: "status.active.status" }),
  "inactive": formatMessage({ id: "status.inactive.status" }),
  "cancel":formatMessage({ id: "status.cancel.status" }),
  "canceled":formatMessage({ id: "status.canceled.status" }),
  "checkin": formatMessage({ id: "status.checkin.status" }),
  "completed": formatMessage({ id: "status.completed.status" }),
  "register": formatMessage({ id: "status.registr.status" }) ,
};
export const testarr = {  
  "written":formatMessage({ id: "status.written" }) ,
  "physical":formatMessage({ id: "status.physical" }) ,
  "practical":formatMessage({ id: "status.practical" }) ,
};
export const rolearr = {  
  "admin":formatMessage({ id: "role.admin" }) ,
  "user":formatMessage({ id: "role.user" }) ,
};
export const gender = {  
  "Male":formatMessage({ id: "status.registr.male" }) ,
  "Female":formatMessage({ id: "status.registr.female" }) ,
};
export const result = {  
  "pass":formatMessage({ id: "student.result.pass" }) ,
  "fail":formatMessage({ id: "student.result.fail" }) ,
};
export const weekdays = {  
  "Monday":formatMessage({ id:"label.Monday" }),
  "Tuesday":formatMessage({ id:"label.Tuesday"}),
  "Wednesday":formatMessage({ id:"label.Wednesday"}),
  "Thursday":formatMessage({ id:"label.Thursday"}),
  "Friday":formatMessage({ id:"label.Friday"}),
  "Saturday":formatMessage({ id:"label.Saturday"}),
  "Sunday":formatMessage({ id:"label.Sunday"}),
};

export const weekfrequency={
  "First Week":formatMessage({ id:"label.firstweek" }),
  "Second Week": formatMessage({ id:"label.secondweek"}),
  "Forth Week":formatMessage({ id:"label.forthweek"}),
  "Third Week":formatMessage({ id:"label.thirdweek"}),
}

export const testTypeArr = {  
  "written": formatMessage({ id:"status.written" }),
  "physical": formatMessage({ id:"status.physical" }),
  "practical": formatMessage({ id:"status.practical" }),
};

export const examinerstatusArr = {  
  "checkin": formatMessage({ id: "status.checkin.status" }),
  "register": formatMessage({ id: "status.registr.status" }) ,
};

export const transactionstatusArr = {  
  "paid": formatMessage({ id: "transaction.paid.status" }),
  "unpaid": formatMessage({ id: "transaction.unpaid.status" }),
   "refund":formatMessage({ id: "transactions.refund" }) ,
  "pay":formatMessage({ id: "transactions.pay" }) ,
};

export const months_arr = {  
  "1": formatMessage({ id: "transaction.jan" }),
  "2": formatMessage({ id: "transaction.feb" }),
   "3":formatMessage({ id: "transactions.march" }) ,
  "4":formatMessage({ id: "transactions.apr" }) ,
  "5":formatMessage({ id: "transactions.may" }) ,
  "6":formatMessage({ id: "transactions.june" }) ,
  "7":formatMessage({ id: "transactions.jully" }) ,
  "8":formatMessage({ id: "transactions.aug" }) ,
  "9":formatMessage({ id: "transactions.sept" }) ,
  "10":formatMessage({ id: "transactions.oct" }) ,
  "11":formatMessage({ id: "transactions.nov" }) ,
  "12":formatMessage({ id: "transactions.dec" }) ,
};