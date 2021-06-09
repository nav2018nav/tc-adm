import React, { FC, useRef, useState, useEffect } from "react";
import moment from "moment";
import {
  Form,
  Button,
  Divider,
  Input,
  Select,
  Card,
  Radio,
  Checkbox,
  Row,
  Col,
  DatePicker,
  TimePicker,
  message,
  InputNumber,
} from "antd";
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
  const intl = useIntl();
  const { dispatch, data } = props;
  const { list } = props;
  const [form] = Form.useForm();

  const [value, setValue] = React.useState(1);

  if (!data) {
    return null;
  }

  useEffect(() => {
    dispatch({
      type: "testFormAndstepForm/fetch",
      // payload: {
      //   count: 5,
      // },
    });
  }, [1]);

  const { validateFields } = form;
  const onValidateForm = async () => {
    localStorage.setItem("stepTest", "doneTest");

    const values = await validateFields();
    //console.log(values);

    let date = JSON.stringify(values.start_date);
    date = date.slice(1, 11);
    localStorage.setItem("sdate", date);

//    let t = moment(values.start_time).format("HH:mm");
    localStorage.setItem("stime", values.start_time);
    if (dispatch) {
      dispatch({
        type: "testFormAndstepForm/saveStepFormData",
        payload: values,
      });
      dispatch({
        type: "testFormAndstepForm/saveCurrentStep",
        payload: "confirm",
      });
    }
  };

  function onChangeRadio(e) {
    //console.log(`checked:${e.target.value}`);
  }
  function onChangedate(date, dateString) {
     //console.log(date, dateString);
      form.start_date = dateString;
     console.log( dateString);
  }
  function onChangetime(time, timeString) {
    //form.start_time = timeString;
    console.log(timeString);
  }
  function onChange(value) {
    // console.log("changed", value);
  }
  const options = [
    { label: "Questions", value: "questions" },
    { label: "Physical Compliance", value: "physicalcompliance" },
    { label: "Practical Compliance", value: "practicalcompliance" },
  ];
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          name="name"
          label={intl.formatMessage({
            id: "settingstests.tests.testName",
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
            {list?.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="sections"
           label={intl.formatMessage({
            id: "settingstests.tests.sections",
            defaultMessage: "Please select test unit",
          })}

          rules={[
            {
              required: true,
              message: <FormattedMessage id="msg.step1.section_msg" />,
            },
          ]}
        >
          <Checkbox.Group onChange={onChange}>
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
              })}{" "}
            </Checkbox>
            <Checkbox className={styles.marginleftlable} value="practical">
              {intl.formatMessage({
                id: "select_type_practicle.step.list.TestName",
                defaultMessage: "Written",
              })}{" "}
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="month"
          label={intl.formatMessage({
            id: "step3.label.month",
            defaultMessage: "Month Frequency",
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="msg.step3.monthFrequency_msg" />,
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
              message: <FormattedMessage id="msg.step3.weekFrequency_msg" />,
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
            <Option value="Forth Week">
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
            <Option value="Saturday">
              {intl.formatMessage({
                id: "step3.label.Saturday",
                defaultMessage: "Saturday",
              })}
            </Option>
            <Option value="Sunday">
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
          <DatePicker label="DatePicker" onChange={onChangedate} />
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
          
           <Input  />
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
          <InputNumber min={0} max={100} />
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
              message: <FormattedMessage id="msg.step3.registrationEnd_msg" />,
            },
          ]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item
          name="fees"
          label={intl.formatMessage({
            id: "step3.label.fees",
            defaultMessage: "Fees",
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="msg.step1.fees_msg" />,
            },
          ]}
        >
          <Input prefix="¥" />
        </Form.Item>
        <Form.Item
          name="handling_charges"
          label={intl.formatMessage({
            id: "step3.label.handlingCharges",
            defaultMessage: "Handling Charges",
          })}
          rules={[
            {
              required: true,
              message: <FormattedMessage id="msg.step1.handlingcharges_msg" />,
            },
          ]}
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
    </>
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
    const { list } = testFormAndstepForm;
    return {
      list,
      data: testFormAndstepForm.step,
    };
  }
)(Step1);
