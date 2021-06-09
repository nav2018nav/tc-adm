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
import React, { useState } from "react";

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
import { weekdays , testTypeArr} from '@/utils/options';
import { weekfrequency } from '@/utils/options';
import { statusArr } from '@/utils/options';
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
  console.log("changed", value);
}

function onChangetime(time, timeString) {
  console.log(time, timeString);
}

function onChangedate(date, dateString) {
  console.log(date, dateString);
}

interface TableFormDateType {
  key: string;
  item?: string;
}
const Step3: React.FC<Step3Props> = (props) => {
  const [item, setItem] = useState<FormValueType>([
    {
      name: "",
      key: "",
    },
  ]);
  const intl = useIntl();
  const { data, dispatch } = props;
  const { list } = props;
  const { test } = props;
  const { listCategory } = props;

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
    physicale_quetions_list,
    written_credit,
    physical_credit,
    practical_credit,
    physical_req_rate,
    practical_req_rate,
    handling_charges,
  } = data;

  let physical_arr1 = [];
  let practical_arr1 = [];

  function useQuery() {
    return new URLSearchParams(window.location.search);
  }
  let get_test_id = useQuery().get("id");

  //const [data, setData] = useState(item);
  const [form] = Form.useForm();

  console.log(data);
  const { validateFields, getFieldsValue } = form;

  function useQuery() {
    return new URLSearchParams(window.location.search);
  }
  let test_id = useQuery().get("id");
  console.log(test_id);

  const remove = (key: string) => {
    const newData = data?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
    console.log(newData);
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
  const { payAccount, receiverAccount, receiverName, amount } = data;
  const onFinish = async () => {
    const values = await validateFields();
    console.log(values);
    console.log(data);
    //values['ans_options'] = data;
    values["test_id"] = test_id;
    console.log(values);
    //return false;

    if (dispatch) {
      dispatch({
        type: "testFormAndstepFormEdit/submitStepForm",
        payload: {
          ...data,
          ...values,
        },
      });
      localStorage.setItem("stepEditTest", "done");
      localStorage.removeItem("physicale_quetions_list");
      localStorage.removeItem("practicle_quetions_list");
      localStorage.removeItem("sdate");
      localStorage.removeItem("stime");
      //props.router.push('/settingstests/tab/questions');

      message.success(
        formatMessage({ id: "settingstests.tests.success.subTitle" })
      );

      const timeout = setTimeout(() => {
        //history.push('/settingstests/tab/questions');
        location.replace("/settingstests/tab/tests");
      }, 1500);
    }
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: "testFormAndstepFormEdit/saveStepFormData",
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: "testFormAndstepFormEdit/saveCurrentStep",
        payload: "confirm",
      });
    }
  };

 
  const renderContent = () => {
    return (
      <>
        <Row gutter={24}>
          <Col span={6}> </Col>
          <Col span={12}>
        
          <h4>
            <b> <FormattedMessage id="select_type_basic_info.step.list.TestName" /> : </b>{" "}
          </h4>
          <Divider />
          <Descriptions column={1}>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "settingstests.tests.testName",
                defaultMessage: "Test Name",
              })}
            >
              {" "}
              {name}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "settingstests.tests.category",
                defaultMessage: "Test category:",
              })}
            >
              {listCategory?.map((item) => {
                return item.id == category_id ? <div>{item.name}</div> : "";
              })}
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                id: "settingstests.tests.section",
                defaultMessage: "Test Section:",
              })}
            >
              {sections?.map((item) => testTypeArr[item] + " ")}
            </Descriptions.Item>

            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.everyMonth",
                defaultMessage: "Every Month",
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
             {weekdays[day]} {}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.testDate",
                defaultMessage: "Test Start Date",
              })}
            >
              {start_date}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({
                id: "step3.label.testTime",
                defaultMessage: "Test Start Time",
              })}
            >
              {start_time}
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
              {testLength}
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
          <Divider />
          <div
            style={{
              display: data.sections.indexOf("written") > -1 ? "block" : "none",
            }}
          >
            <h4>
              <b> <FormattedMessage id="select_type_written.step.list.TestName" /> : </b>{" "}
            </h4>
            {(() => {
              if (data.sections.indexOf("written") > -1) {
                return (
                  <>
                    <Descriptions column={1}>
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
          </div>
          <Divider />
          <div
            style={{
              display:
                data.sections.indexOf("physical") > -1 ? "block" : "none",
            }}
          >
            <h4>
              <b> <FormattedMessage id="select_type_physical.step.list.TestName" /> : </b>{" "}
            </h4>
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
                        <p>{item.que_name} </p>
                      </>
                    ))}
                  </>
                );
              }
            })()}
            <Descriptions column={1}>
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
          </div>
          <Divider />
          <div
            style={{
              display:
                data.sections.indexOf("practical") > -1 ? "block" : "none",
            }}
          >
            <h4>
              <b><FormattedMessage id="select_type_practicle.step.list.TestName" /> : </b>{" "}
            </h4>

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
                        <p> {item.que_name} </p>
                      </>
                    ))}
                  </>
                );
              }
            })()}
            <Descriptions column={1}>
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
          </div>
          <Divider style={{ margin: "24px 0" }} />

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
                  <FormattedMessage id="settingstests.tests.modal.button.back" />
                </Button>
                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="label.donebtn" />
                </Button>
          </Form.Item>
        </Col>
          <Col span={6}> </Col>
        </Row>
      </>
    );
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  async function timeSensativeAction() {
    //must be async func
    await delay(3000);
  }

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={test}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
      >
        {renderContent()}
      </Form>
    </>
  );
};

export default connect(
  ({
    testFormAndstepFormEdit,
    loading,
  }: {
    testFormAndstepFormEdit: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => {
    const { test } = testFormAndstepFormEdit;
    const { listCategory } = testFormAndstepFormEdit;
    return {
      test,
      submitting: loading.effects["testFormAndstepFormEdit/submitStepForm"],
      listCategory,
      data: testFormAndstepFormEdit.step,
    };
  }
)(Step3);
