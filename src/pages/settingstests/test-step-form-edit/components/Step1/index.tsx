import React, { FC, useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Divider,
  Input,
  Select,
  Card,
  Radio,
  Row,
  Checkbox,
  InputNumber,
  Spin,
  TimePicker,
} from "antd";

import moment from 'moment';
import { connect, Dispatch, useIntl, FormattedMessage } from "umi";
import { StateType } from "../../model";
import styles from "./index.less";

const { Option } = Select;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 15,
  },
};

interface Step1Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const { list } = props;
  const intl = useIntl();
  const { test } = props;
  const { listCategory } = props;
  console.log(test);
  const [form] = Form.useForm();
  console.log(props);
  const [value, setValue] = React.useState(1);
  function useQuery() {
    return new URLSearchParams(window.location.search);
  }
  let get_test_id = useQuery().get("id");
  console.log(get_test_id);

  if (!data) {
    return null;
  }
  useEffect(() => {
    dispatch({
      type: "testFormAndstepFormEdit/fetchTest",
      payload: {
        test_id: get_test_id,
      },
    });
  }, [1]);
  useEffect(() => {
    dispatch({
      type: "testFormAndstepFormEdit/fetchCategory",
    });
  }, [1]);
  const { validateFields } = form;
  const onValidateForm = async () => {
    localStorage.setItem("stepEditTest", "done");

    const values = await validateFields();
    console.log(values);
    // return false;
    if (dispatch) {
      dispatch({
        type: "testFormAndstepFormEdit/saveStepFormData",
        payload: values,
      });
      dispatch({
        type: "testFormAndstepFormEdit/saveCurrentStep",
        payload: "confirm",
      });
    }
  };
  function onChangeRadio(e) {
    console.log(`checked:${e.target.value}`);
  }
  function onChange(value) {
    console.log("changed", value);
  }
  const options = [
    { label: "Questions", value: "questions" },
    { label: "Physical Compliance", value: "physicalcompliance" },
    { label: "Practical Compliance", value: "practicalcompliance" },
  ];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  async function timeSensativeAction() {
    //must be async func
    await delay(3000);
  }
  return (
    <>
    
        {timeSensativeAction() && test && test.id == get_test_id ? (
          <Form
            {...formItemLayout}
            form={form}
            layout="horizontal"
            className={styles.stepForm}
            hideRequiredMark
            initialValues={test}
          >
            <Form.Item
              name="name"
              label={intl.formatMessage({
                id: "placeholder_name.step.listlabelname.TestName",
                defaultMessage: "Test Name",
              })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step1.testName_msg" />,
                },
              ]}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: "placeholder_name.step.list.TestName",
                  defaultMessage: "Enter Test Name",
                })}
              />
            </Form.Item>
            <Form.Item
              name="category_id"
               label={intl.formatMessage({
                 id: "settingstests.tests.category",
                 defaultMessage: "",
              })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step1.category_msg" />,
                },
              ]}
            >
              <Select style={{ width: "100%" }}>
                {listCategory?.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="sections"
               label={intl.formatMessage({
            id: "settingstests.tests.category",
            defaultMessage: "",
          })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step1.section_msg" />,
                },
              ]}
            >
              <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Checkbox value="written">
                  {intl.formatMessage({
                    id: "select_type_written.step.list.TestName",
                    defaultMessage: "Written",
                  })}
                </Checkbox>
                <Checkbox value="physical">
                  {intl.formatMessage({
                    id: "select_type_physical.step.list.TestName",
                    defaultMessage: "physical",
                  })}
                </Checkbox>
                <Checkbox className={styles.marginleftlable} value="practical">
                  {intl.formatMessage({
                    id: "select_type_practicle.step.list.TestName",
                    defaultMessage: "Written",
                  })}
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="month"
              label={intl.formatMessage({
                      id: "step3.label.everyMonth",
                      defaultMessage: "Every Month",
                    })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="msg.step3.monthFrequency_msg" />
                  ),
                },
              ]}
            >
              <Select>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="11">11</Option>
                <Option value="12">12</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="week"
              label={intl.formatMessage({
                id: "step3.label.week",
                defaultMessage: "Week Frequency",
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="msg.step3.weekFrequency_msg" />
                  ),
                },
              ]}
            >
              <Select>
                <Option value="First Week">
                  {intl.formatMessage({
                    id: "step3.label.firstweek",
                    defaultMessage: "First Week",
                  })}
                </Option>
                <Option value="Second Week">
                  {intl.formatMessage({
                    id: "step3.label.secondweek",
                    defaultMessage: "Second Week",
                  })}
                </Option>
                <Option value="Third Week">
                  {intl.formatMessage({
                    id: "step3.label.thirdweek",
                    defaultMessage: "Third Week",
                  })}
                </Option>
                <Option value="Fourth Week">
                  {intl.formatMessage({
                    id: "step3.label.forthweek",
                    defaultMessage: "Forth Week",
                  })}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="day"
              label={intl.formatMessage({
                id: "step3.label.day",
                defaultMessage: "Day Frequency",
              })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step3.dayFrequency_msg" />,
                },
              ]}
            >
              <Select>
                <Option value="Monday">
                  {intl.formatMessage({
                    id: "step3.label.Monday",
                    defaultMessage: "Monday",
                  })}
                </Option>
                <Option value="Tuesday">
                  {intl.formatMessage({
                    id: "step3.label.Tuesday",
                    defaultMessage: "Tuesday",
                  })}
                </Option>
                <Option value="Wednesday">
                  {" "}
                  {intl.formatMessage({
                    id: "step3.label.Wednesday",
                    defaultMessage: "Wednesday",
                  })}
                </Option>
                <Option value="Thursday">
                  {" "}
                  {intl.formatMessage({
                    id: "step3.label.Thursday",
                    defaultMessage: "Thursday",
                  })}
                </Option>
                <Option value="Friday">
                  {" "}
                  {intl.formatMessage({
                    id: "step3.label.Friday",
                    defaultMessage: "Friday",
                  })}
                </Option>
                <Option value="Tuesday">
                  {intl.formatMessage({
                    id: "step3.label.Saturday",
                    defaultMessage: "Saturday",
                  })}
                </Option>
                <Option value="Tuesday">
                  {" "}
                  {intl.formatMessage({
                    id: "step3.label.Sunday",
                    defaultMessage: "Sunday",
                  })}
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="start_date"
              label={intl.formatMessage({
                id: "step3.label.testDate",
                defaultMessage: "Test Start Date",
              })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step3.testDate_msg" />,
                },
              ]}
            >
              <input />
            </Form.Item>

            <Form.Item
              name="start_time"
              label={intl.formatMessage({
                id: "step3.label.testTime",
                defaultMessage: "Test Start Time",
              })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step3.testTime_msg" />,
                },
              ]}
            >
              <input />
            </Form.Item>
            <Form.Item
              name="registration_open_days"
             label={intl.formatMessage({
                    id: "step3.label.reg_start_on",
                    defaultMessage: "Registration starts on",
                  })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="msg.step3.registrationStart_msg" />
                  ),
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="registration_close_days"
              label={intl.formatMessage({
                    id: "step3.label.reg_ends_on",
                    defaultMessage: "Registration ends on",
                  })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="msg.step3.registrationEnd_msg" />
                  ),
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="handling_charges"
              label={intl.formatMessage({
                id: "step3.label.handlingCharges",
                defaultMessage: "Handling Charges",
              })}
             /* rules={[
                {
                  required: true,
                  message: <FormattedMessage id="msg.step1.handlingcharges_msg" />,
                },
              ]}*/
            >
            <Input prefix="¥" />
          </Form.Item>
            <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
        >
          <Button type="primary" onClick={onValidateForm}>
            {intl.formatMessage({
              id: "select_type_practicle.step.list.nextBtn",
              defaultMessage: "Next",
            })}
          </Button>
        </Form.Item>
          </Form>
        ) : (
          <Spin />
        )}
     
    </>
  );
};

export default connect(
  ({
    testFormAndstepFormEdit,
    loading,
  }: {
    testFormAndstepFormEdit: {};
    loading: any;
  }) => {
    const { list } = testFormAndstepFormEdit;
    const { test } = testFormAndstepFormEdit;
    const { listCategory } = testFormAndstepFormEdit;
    return {
      list,
      test,
      listCategory,
      data: testFormAndstepFormEdit.step,
    };
  }
)(Step1);
