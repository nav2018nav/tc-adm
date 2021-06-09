import moment from "moment";
import {
  Button,
  Result,
  Descriptions,
  Table,
  Statistic,
  Form,
  Select,
  Input,
  Checkbox,
  Popconfirm,
  InputNumber,
  Row,
  Col,
  DatePicker,
  TimePicker,
  message,
  Divider,
} from "antd";
import React, { useState, useEffect } from "react";
import { statusArr,testTypeArr } from '@/utils/options';
import {
  connect,
  Dispatch,
  history,
  useIntl,
  formatMessage,
  FormattedMessage,
} from "umi";
import { StateType } from "../../model";
import styles from "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import { weekdays } from '@/utils/options';
import { weekfrequency } from '@/utils/options';
let chk_val;

interface Step3Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
function onChange(value) {
  //console.log("changed", value);
}

function onChangetime(time, timeString) {
  ////console.log(time, timeString);
}

function onChangedate(date, dateString) {
  //console.log(date, dateString);
}

interface TableFormDateType {
  key: string;
  item?: string;
}
const Step3: React.FC<Step3Props> = (props) => {
  const intl = useIntl();
  const { questionsListPhysical } = props;
  const { questionsListPractical } = props;
  const { fetch_que } = props;
  const { list } = props;
  const { data, dispatch } = props;
  let sdate = localStorage.getItem("sdate");
  let stime = localStorage.getItem("stime");
  const [item, setItem] = useState<FormValueType>([
    {
      name: "",
      key: "",
    },
  ]);
 // console.log(fetch_que);
  let physicale_que_names = "";
  const [form] = Form.useForm();
  const { validateFields, getFieldsValue } = form;

  const remove = (key: string) => {
    const newData = data?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const [formVals, setFormVals] = useState<FormValueType>({
    name: "",
    desc: "",
    key: "",
    target: "0",
    template: "0",
    type: "1",
    time: "",
    frequency: "month",
  });

  if (!data) {
    return null;
  }

  const {
    name,
    category_id,
    sections,
    month,
    week,
    day,
    start_date,
    DatePicker,
    start_time,
    registration_open_days,
    registration_close_days,
    fees,
    testLength,
    noofquestions,
    requiredcompliancesrate,
    physical_req_rate,
    practical_req_rate,
    physicale_quetions_list,
    written_credit,
    physical_credit,
    practical_credit,
    handling_charges,
  } = data;
  let physical_arr1 = [];
  let practical_arr1 = [];

  useEffect(() => {
    dispatch({
      type: "testFormAndstepForm/fetchquetions",
    });
  }, [1]);

  const onFinish = async () => {
    const values = await validateFields();

    if (dispatch) {
      dispatch({
        type: "testFormAndstepForm/submitStepForm",
        payload: {
          ...data,
          ...values,
        },
      });

      //props.router.push('/settingstests/tab/questions');
    }
    localStorage.setItem("stepTest", "doneTest");
    localStorage.removeItem("physicale_quetions_list");
    localStorage.removeItem("practicle_quetions_list");
    localStorage.removeItem("sdate");
    localStorage.removeItem("stime");

    message.success(
      formatMessage({ id: "settingstests.tests.success.subTitle" })
    );

    const timeout = setTimeout(() => {
      //history.push('/settingstests/tab/questions');
      location.replace("/settingstests/tab/tests");
    }, 1500);
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      /*dispatch({
        type: "testFormAndstepForm/saveStepFormData",
        payload: {
          ...data,
          ...values,
        },
      });*/
      dispatch({
        type: "testFormAndstepForm/saveCurrentStep",
        payload: "confirm",
      });
    }
  };

  const renderContent = () => {
    return (
      <>
          <Descriptions
          column={3}
          title={intl.formatMessage({
            id: "select_type_basic_info.step.list.TestName",
            defaultMessage: "Test Name",
          })}
          >
            <Descriptions.Item
              label={intl.formatMessage({
                id: "settingstests.tests.testName",
                defaultMessage: "Test Name",
              })}
            >{name}
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                id: "settingstests.tests.category",
                defaultMessage: "Test category:",
              })}
            >
              {list?.map((item) => {
                return item.id == category_id ? <div>{item.name}</div> : "";
              })}
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                id: "settingstests.tests.section",
                defaultMessage: "Test Section",
              })}
            > 
            {sections?.map((item) => {
                return testTypeArr[item];
              })}
            
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.month",
                defaultMessage: "Month Frequency",
              })}
            >
              {month}
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.week",
                defaultMessage: "Week Frequency",
              })}
            >
               {weekfrequency[week]}{}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.day",
                defaultMessage: "Day Frequency",
              })}
            >
             {weekdays[day]}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.testDate",
                defaultMessage: "Test Start Date",
              })}
            >
              {sdate}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.testTime",
                defaultMessage: "Test Start Time",
              })}
            >
              {stime}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.reg_start_on",
                defaultMessage: "Registration starts on",
              })}
            >
             {registration_open_days}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.reg_ends_on",
                defaultMessage: "Registration ends on",
              })}
            >
              {registration_close_days}
            </Descriptions.Item>
            
             <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.fees",
                defaultMessage: "Fees",
              })}
            >
              ￥{fees}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.handlingCharges",
                defaultMessage: "handling_charges",
              })}
            >
              ￥{handling_charges}
            </Descriptions.Item>

          </Descriptions>
                    <Divider style={{ margin: '24px 0' }} />
          {(() => {
              if (data.sections.indexOf("written") > -1) {
                return (
                  <>
                  <Descriptions
                  column={3}
                  title={intl.formatMessage({
                    id: "select_type_written.step.list.TestName",
                    defaultMessage: "Test Name",
                  })}
                  >
                      <Descriptions.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelname.TestLength",
                          defaultMessage: "Test Length",
                        })}
                      >
                        {testLength}
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.quetion",
                          defaultMessage: "No Of Quetions",
                        })}
                      >
                        {noofquestions}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "Required compliances rate",
                        })}
                      >
                        {requiredcompliancesrate}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={intl.formatMessage({
                          id: "step2.listlabelque.creditpoints",
                          defaultMessage: "",
                        })}
                      >
                        {written_credit}
                      </Descriptions.Item>
                    </Descriptions>
                  </>
                );
              }
            })()}
            <Divider style={{ margin: '24px 0' }} />
            <Descriptions
            column={3}
            title={intl.formatMessage({
              id: "select_type_physical.step.list.TestName",
              defaultMessage: "Test Name",
            })}
            >
            <Descriptions.Item
              label={intl.formatMessage({
                id: "questions_list",
                defaultMessage: "Question list",
              })}
            >
            {(() => {
              if (data.sections.indexOf("physical") > -1) {
                console.log(
                  JSON.parse(localStorage.getItem("physicale_quetions_list"))
                );
                let obj = JSON.parse(
                  localStorage.getItem(
                    "physicale_quetions_list",
                    JSON.stringify(physical_arr1)
                  )
                );

                return (
                  <>
                    {obj?.map((item) => (
                      <>
                        {item.que_name} <br />
                      </>
                    ))}
                  </>
                );
              }
            })()}
            </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                  defaultMessage: "Required compliances rate",
                })}
              >
                {physical_req_rate}
              </Descriptions.Item>

              <Descriptions.Item
                label={intl.formatMessage({
                  id: "step2.listlabelque.creditpoints",
                  defaultMessage: "",
                })}
              >
                {physical_credit}
              </Descriptions.Item>

            </Descriptions>
            <Divider style={{ margin: '24px 0' }} />
            <Descriptions
            column={3}
            title={intl.formatMessage({
              id: "select_type_practicle.step.list.TestName",
              defaultMessage: "Test Name",
            })}
            >
            <Descriptions.Item
              label={intl.formatMessage({
                id: "questions_list",
                defaultMessage: "Question list",
              })}
            >
            {(() => {
              if (data.sections.indexOf("practical") > -1) {
                console.log(
                  JSON.parse(localStorage.getItem("practicle_quetions_list"))
                );

                let obj = JSON.parse(
                  localStorage.getItem(
                    "practicle_quetions_list",
                    JSON.stringify(practical_arr1)
                  )
                );

                return (
                  <>
                    {obj?.map((item) => (
                      <>
                        {item.que_name} <br />
                      </>
                    ))}
                  </>
                );
              }
            })()}
            </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                  defaultMessage: "Required compliances rate",
                })}
              >
                {practical_req_rate}
              </Descriptions.Item>
              <Descriptions.Item
                label={intl.formatMessage({
                  id: "step2.listlabelque.creditpoints",
                  defaultMessage: "",
                })}
              >
                {practical_credit}
              </Descriptions.Item>
            </Descriptions>

          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
          >
            <Button onClick={onPrev}>
              <FormattedMessage id="msg.step2.back.btn" />
            </Button>

            <Button type="primary" onClick={onFinish} style={{ marginLeft: 8 }}>
              <FormattedMessage id="msg.step2.done.btn" />
            </Button>
          </Form.Item>
      </>
    );
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      hideRequiredMark
      initialValues={data}
    >
      {renderContent()}
    </Form>
  );
};

export default connect(
  ({
    testFormAndstepForm,
    loading,
  }: {
    testFormAndstepForm: {};
    loading: any;
  }) => {
    const { questionsListPractical } = testFormAndstepForm;
    const { questionsListPhysical } = testFormAndstepForm;
    const { testList_details } = testFormAndstepForm;
    const { fetch_que } = testFormAndstepForm;
    const { list } = testFormAndstepForm;
    return {
      questionsListPractical,
      questionsListPhysical,
      fetch_que,
      list,
      submitting: loading.effects["testFormAndstepForm/submitStepForm"],
      data: testFormAndstepForm.step,
    };
  }
)(Step3);
