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
  Col,
} from "antd";

import { connect, Dispatch, FormattedMessage } from "umi";
import { StateType } from "../../model";
import styles from "./index.less";

const { Option } = Select;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
};
interface Step1Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;
  const { question } = props;
  const [form] = Form.useForm();
  function useQuery() {
    return new URLSearchParams(window.location.search);
  }
  let get_question_id = useQuery().get("id");

  useEffect(() => {
    dispatch({
      type: "questionEditFormAndstepForm/fetchQuestion",
      payload: {
        question_id: get_question_id,
      },
    });
  }, [1]);

  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onValidateForm = async () => {
    localStorage.removeItem("stepEditQues");

    const values = await validateFields();
    //  console.log(values);
    //console.log(dispatch);
    if (dispatch) {
      dispatch({
        type: "questionEditFormAndstepForm/saveStepFormData",
        payload: values,
      });
      dispatch({
        type: "questionEditFormAndstepForm/saveCurrentStep",
        payload: "confirm",
      });
    }
  };

  function onChangeRadio(e) {
    //console.log(`checked:${e.target.value}`);
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  async function timeSensativeAction() {
    //must be async func
    await delay(3000);
  }

  return (
    <>
      <Row gutter={24}>
       <Col span={4} offset={10}>
          {timeSensativeAction() &&
          question &&
          question.id == get_question_id ? (
            <Form
              {...formItemLayout}
              form={form}
              layout="horizontal"
              className={styles.stepForm}
              hideRequiredMark
              initialValues={question}
            >
              <Form.Item
                name="type"
                rules={[{ required: true, message: "Please pick an item!" }]}
              >
                 <Radio.Group
                    defaultValue={question.type}
                    buttonStyle="solid"
                    size="medium"
                    onChange={onChangeRadio}
                  >
                    <Radio.Button
                      className={styles.radioButton}
                      value="written"
                    >
                      {" "}
                      <FormattedMessage
                        id="settingstests.questions.modal.radio.knowledgeQuestions"
                        defaultMessage="Knowledge Question"
                        name="knowledgeQuestions"
                      />
                    </Radio.Button>
                    <br />

                    <Radio.Button
                      className={styles.radioButton}
                      value="physical"
                    >
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

              <Form.Item >
                <Button type="primary" onClick={onValidateForm}>
                  <FormattedMessage
                    id="btn.next"
                    name="Next"
                    defaultMessage="Next"
                  />
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div>Loading...</div>
          )}
        </Col>
       
      </Row>
    </>
  );
};

export default connect(
  ({
    questionEditFormAndstepForm,
    loading,
  }: {
    questionEditFormAndstepForm: {};
    loading: any;
  }) => {
    const { question } = questionEditFormAndstepForm;
    return {
      question,
      data: questionEditFormAndstepForm.step,
    };
  }
)(Step1);
