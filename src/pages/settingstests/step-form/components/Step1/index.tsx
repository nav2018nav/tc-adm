import React from "react";
import {
  Form,
  Button,
  Divider,
  Input,
  Select,
  Card,
  Radio,
  Row,
  Col,
} from "antd";

import { connect, Dispatch, FormattedMessage } from "umi";
import { StateType } from "../../model";
import styles from "./index.less";
import { PageContainer } from "@ant-design/pro-layout";
const { Option } = Select;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
  span: 14,
},
};
interface Step1Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const [form] = Form.useForm();
  // console.log(data);

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    localStorage.setItem("step", "done");
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: "questionFormAndstepForm/saveStepFormData",
        payload: values,
      });
      dispatch({
        type: "questionFormAndstepForm/saveCurrentStep",
        payload: "confirm",
      });
    }
  };

  function onChangeRadio(e) {
    //console.log(`checked:${e.target.value}`);
  }

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
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 18, offset: 6 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
              name="type"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="settingstests.questions.modal.radio.slectmsg" />
                  ),
                },
              ]}
            >

                <Radio.Group
                  defaultValue="knowledgeQuestions"
                  buttonStyle="solid"
                  size="medium"
                  onChange={onChangeRadio}
                >
                  <Radio.Button className={styles.radioButton} value="written">
                    {" "}
                    <FormattedMessage
                      id="settingstests.questions.modal.radio.knowledgeQuestions"
                      defaultMessage="Knowledge Question"
                      name="knowledgeQuestions"
                    />
                  </Radio.Button>
                  <br />

                  <Radio.Button className={styles.radioButton} value="physical">
                    {" "}
                    <FormattedMessage
                      id="settingstests.questions.modal.radio.physicalCompliance"
                      defaultMessage="physicalCompliance"
                      name="knowledgeQuestions"
                    />
                  </Radio.Button>
                  <br />

                  <Radio.Button
                    className={styles.radioButton}
                    value="practical"
                  >
                    {" "}
                    <FormattedMessage
                      id="settingstests.questions.modal.radio.practicalCompliance"
                      defaultMessage="Practical Compliance"
                      name="practicalCompliance"
                    />
                  </Radio.Button>
                </Radio.Group>

            </Form.Item>
             <Form.Item
             style={{ marginBottom: 8 }}
             wrapperCol={{
               xs: { span: 18, offset: 6 },
               sm: {
                 span: formItemLayout.wrapperCol.span,
                 offset: formItemLayout.labelCol.span,
               },
             }}
             >
                <Button type="primary"  onClick={onValidateForm}>
                  <FormattedMessage
                    id="btn.next"
                    name="Next"
                    defaultMessage="Next"
                  />
                </Button>

            </Form.Item>

          </Form>
    </>
  );
};

export default connect(
  ({ questionFormAndstepForm }: { questionFormAndstepForm: StateType }) => ({
    data: questionFormAndstepForm.step,
  })
)(Step1);
