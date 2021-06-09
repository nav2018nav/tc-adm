import {
  Button,
  Result,
  Descriptions,
  Table,
  Statistic,
  Image,
  Form,
  Select,
  Input,
  Row,
  Col,
  Checkbox,
  Popconfirm,
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
import { statusArr } from '@/utils/options';
let chk_val;

interface Step3Props {
  datatwo?: StateType["step"];
  dispatch?: Dispatch<any>;
}

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

function onChange(value) {
  //console.log("changed", value);
}

function onChangeOne(e) {
  let chk_val = e.target.checked;
  //console.log(`checked = ${e.target.checked}`);
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
  const { datatwo, dispatch, list } = props;
  const intl = useIntl();
  const [data, setData] = useState(item);
  const [form] = Form.useForm();

  console.log(list);
  const { validateFields, getFieldsValue } = form;
  const [index, setIndex] = useState(0);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];
    // console.log(newData);

    let written_arr1 = [];
    let flag = true;

    if (Object.keys(newData).length) {
      for (var i = Object.keys(newData).length - 1; i >= 0; i--) {
        if (Object.keys(newData[i]).length == 0) {
          message.error(formatMessage({ id: "msg.step3.answer_msg" }));
          flag = false;
          return false;
        }
        if (newData[i].id == "" || !("id" in newData[i])) {
          // if(!('id' in newData[i])){
          message.error(formatMessage({ id: "msg.step3.answer_msg" }));
          flag = false;
          return false;
        }
      }
    }

    if (flag == true) {
      newData.push({
        key: `NEW_TEMP_ID_${index}`,
        id: "",
        editable: true,
        isNew: true,
        answer: chk_val,
      });

      setIndex(index + 1);
      setData(newData);
    }

    //console.log("after");
    //console.log(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
    //console.log(newData);
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) => {
    //  console.log('hello');

    const newData = [...(data as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    // console.log(target);
    // console.log(fieldName);
    // console.log(e);
    if (target) {
      //console.log(fieldName);
      target[fieldName] = e.target.value;
      //target[fieldName] = e;
      setData(newData);
    }
  };

  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) => {
    const newData = [...(data as TableFormDateType[])];

    const target = getRowByKey(key, newData);
    //console.log(fieldName);

    if (target) {
      //console.log(fieldName);
      target[fieldName] = e.target.checked;
      //target[fieldName] = e;
      setData(newData);
    }
    let new_data = newData;
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

  if (!datatwo) {
    return null;
  }

  const {
    type,
    que_name,
    score_operator,
    instruction,
    score,
    category_id,
    media_files,
    ques_type,
    tick_answer,
    ans_options,
    measure1,
    measure1_maxscore,
    measure2,
    measure2_maxscore,
    measure3,
    measure3_maxscore,
    measure4,
    measure4_maxscore,
  } = datatwo;
  let tick_answer_val = "";
  if (tick_answer == "1") {
    tick_answer_val = "true";
  } else {
    tick_answer_val = "false";
  }
  console.log(measure4_maxscore);
  console.log(ans_options.id);
  const { payAccount, receiverAccount, receiverName, amount } = datatwo;
  const onFinish = async () => {
    //console.log("finish call");
    // const values = await validateFields();
    //let values={};
    console.log(datatwo);
    //return false;

    // console.log(values);
    // return false;

    if (dispatch) {
      dispatch({
        type: "questionFormAndstepForm/submitStepForm",
        payload: {
          ...datatwo,
        },
      });
    }

    //const { step, component } = getCurrentStepAndComponent(0);
    localStorage.setItem("step", "done");
    localStorage.removeItem("written_quetions_list");
    localStorage.removeItem("media_quetions_list");

    const timeout = setTimeout(() => {
      history.push("/settingstests/tab/questions");
      //history.push('/settingstests/tab/questions');
      //location.replace("/settingstests/tab/questions");
    }, 3000);

    message.success(
      formatMessage({ id: "quetion.tests.success.subTitle" })
    );
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: "questionFormAndstepForm/saveStepFormData",
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: "questionFormAndstepForm/saveCurrentStep",
        payload: "confirm",
      });
    }
  };


  const renderContent = () => {
    if (datatwo.ques_type == 1 && type == "written") {
      return (
        <>
<Form.Item>
<h4>
  <b> <FormattedMessage id="select_type_basic_info.step.list.TestName" /> : </b>{" "}
</h4>
<Divider />
{(() => {
  if (type == "written") {
    return (
      <>
      
        <FormattedMessage
          id="settingstests.tests.quetion_cateory_lbl"
          defaultMessage="Category"
        />
        : <Descriptions.Item>{type}</Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.quetion_que_name_lbl"
          defaultMessage="Question Name"
        />
        : <Descriptions.Item>{que_name}</Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.test_category"
          defaultMessage="Test Category"
        />
        :
        {list.list?.map((item) => {
          return item.id == category_id ? (
            <Descriptions.Item>{item.name}</Descriptions.Item>
          ) : (
            ""
          );
        })}
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.quetion_que_type_lbl"
          defaultMessage="Question Type"
        />
        :{" "}
        <Descriptions.Item>
          {" "}
          <FormattedMessage
            id="settingstests.tests.trueorfalse"
            defaultMessage="True Or False"
          />{" "}
        </Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.answer"
          defaultMessage="Question list"
        />
        :{" "}
        <Descriptions.Item>{tick_answer_val} </Descriptions.Item>
        <br />
        <br />
        {(() => {
          if (media_files != "") {
            return (
              <>
                <FormattedMessage
                  id="settingstests.tests.image"
                  defaultMessage="Images"
                />
                :
                <Descriptions.Item>
                  <div className={styles.divclass}>
                    {(() => {
                      let obj = JSON.parse(
                        localStorage.getItem(
                          "media_quetions_list"
                        )
                      );

                      return (
                        <>
                          {obj?.map((item) => (
                            <>
                              <Image
                                width={50}
                                src={item.response}
                              />
                            </>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </Descriptions.Item>
              </>
            );
          }
        })()}
      </>
    );
  }
})()}

</Form.Item>

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
                <Button onClick={onPrev}><FormattedMessage id="settingstests.tests.modal.button.back" /></Button>

                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                <FormattedMessage id="settingstests.questions.success.button.done" />
                </Button>
              </Form.Item>
        </>
      );
    }
    if (datatwo.ques_type == 0 && type == "written") {
      return (
        <>
<Form.Item>
{(() => {
  if (type == "written") {
    return (
      <>
        <FormattedMessage
          id="settingstests.tests.quetion_cateory_lbl"
          defaultMessage="Category"
        />
        : <Descriptions.Item>{statusArr[type]} </Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.test_category"
          defaultMessage="Test Category"
        />
        :
        {list.list?.map((item) => {
          return item.id == category_id ? (
            <Descriptions.Item>{item.name}</Descriptions.Item>
          ) : (
            ""
          );
        })}
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.quetion_que_name_lbl"
          defaultMessage="Question Name"
        />
        : <Descriptions.Item>{que_name}</Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.quetion_que_type_lbl"
          defaultMessage="Question Type"
        />
        :{" "}
        <Descriptions.Item>
          {" "}
          <FormattedMessage
            id="settingstests.tests.Multiplechoice"
            defaultMessage="Multiple Choice"
          />{" "}
        </Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="settingstests.tests.quetion_que_type_list"
          defaultMessage="Question list"
        />
        :{" "}
        <Descriptions.Item>
          <div className={styles.divclass}>
            {(() => {
              let obj = JSON.parse(
                localStorage.getItem("written_quetions_list")
              );

              return (
                <>
                  {obj?.map((item) => (
                    <>
                      <p>{item.id} </p>
                    </>
                  ))}
                </>
              );
            })()}
          </div>
        </Descriptions.Item>
        <Divider />
        <FormattedMessage
          id="settingstests.tests.answer"
          defaultMessage="Answer"
        />
        :{" "}
        <Descriptions.Item>
          <div className={styles.divclass}>
            {datatwo.ans_options?.map((ansOption) => {
              if (ansOption.answer) {
                return (
                  <>
                    <p> {ansOption.id} </p>
                  </>
                );
              }
            })}
          </div>
        </Descriptions.Item>
        <Divider />
        <br />
        {(() => {
          if (media_files != "") {
            return (
              <>
                <FormattedMessage
                  id="settingstests.tests.image"
                  defaultMessage="Image"
                />
                :{" "}
                <Descriptions.Item>
                  <div className={styles.divclass}>
                    {(() => {
                      let obj = JSON.parse(
                        localStorage.getItem(
                          "media_quetions_list"
                        )
                      );

                      return (
                        <>
                          {obj?.map((item) => (
                            <>
                              <Image
                                width={50}
                                src={item.response}
                              />
                            </>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                </Descriptions.Item>
              </>
            );
          }
        })()}
        <br />
      </>
    );
  }
})()}
</Form.Item>

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
                <Button onClick={onPrev}><FormattedMessage id="settingstests.tests.modal.button.back" /></Button>
                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="settingstests.questions.success.button.done" />
                </Button>
              </Form.Item>
        </>
      );
    }
    if (datatwo.type == "physical") {
      return (
        <>
<Form.Item>
<h4>
 <b> <FormattedMessage id="select_type_basic_info.step.list.TestName" /> : </b>{" "}
</h4>
<Divider />
<FormattedMessage
  id="settingstests.tests.quetion_cateory_lbl"
  defaultMessage="Category"
/>
: <Descriptions.Item>{statusArr[type]} </Descriptions.Item>
<br />
<br />
<FormattedMessage
  id="label.quetionName"
  defaultMessage="Category"
/>
: <Descriptions.Item>{que_name}</Descriptions.Item>
<br />
<br />
<FormattedMessage
  id="label.category_name"
  defaultMessage="Category"
/>
:
{list.list?.map((item) => {
  return item.id == category_id ? (
    <Descriptions.Item>{item.name}</Descriptions.Item>
  ) : (
    ""
  );
})}
<br />
<br />
<FormattedMessage
  id="label.score_operator"
  defaultMessage="Category"
/>
: <Descriptions.Item>{score_operator}</Descriptions.Item>
<br />
<br />
<FormattedMessage
  id="label.score_operator"
  defaultMessage="Category"
/>
: <Descriptions.Item>{score}</Descriptions.Item>
<br />
<br />
<FormattedMessage
  id="label.gradeinstruction"
  defaultMessage="Category"
/>
: <Descriptions.Item>{instruction}</Descriptions.Item>
</Form.Item>
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
                
                <Button onClick={onPrev}><FormattedMessage id="settingstests.tests.modal.button.back" /></Button>

                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="settingstests.questions.success.button.done" />
                </Button>
              </Form.Item>
        </>
      );
    }
    if (datatwo.type == "practical") {
      return (
        <>
        <h4>
        <b> <FormattedMessage id="select_type_basic_info.step.list.TestName" /> : </b>{" "}
        </h4>
        <Divider />
        <FormattedMessage
          id="settingstests.tests.quetion_cateory_lbl"
          defaultMessage="Category"
        />
        : <Descriptions.Item>{statusArr[type]} </Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="label.quetionName"
          defaultMessage="Category"
        />
        : <Descriptions.Item>{que_name}</Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="label.category_name"
          defaultMessage="Category"
        />
        :
        {list.list?.map((item) => {
          return item.id == category_id ? (
            <Descriptions.Item>{item.name}</Descriptions.Item>
          ) : (
            ""
          );
        })}
        <br />
        <br />
        <FormattedMessage id="label.measure1" defaultMessage="Category" />
        : <Descriptions.Item>{measure1}</Descriptions.Item>
        <br />
        <br />
        <FormattedMessage
          id="label.measure1maxscore"
          defaultMessage="Category"
        />

        : <Descriptions.Item>{measure1_maxscore}</Descriptions.Item>
        {(() => {
          if(measure2)
            return (
            <>
              <br />
              <br />
              <FormattedMessage id="label.measure2" defaultMessage="Category" />
              : <Descriptions.Item>{measure2}</Descriptions.Item>
              <br />
              <br />
              <FormattedMessage
                id="label.measure2_maxscore"
                defaultMessage="Category"
              />
              : <Descriptions.Item>{measure2_maxscore}</Descriptions.Item>
             </>
              );
         })()}
        {(() => {
          if(measure3)
            return (
            <>
            <br />
            <br />
              <FormattedMessage id="label.measure3" defaultMessage="Category" />
              : <Descriptions.Item>{measure3}</Descriptions.Item>
              <br />
              <br />
              <FormattedMessage
                id="label.measure3_maxscore"
                defaultMessage="Category"
              />
              : <Descriptions.Item>{measure3_maxscore}</Descriptions.Item>
            </>
              );
         })()}
      {(() => {
          if(measure4)
            return (
               <>
                 <br />
                 <br />
        <FormattedMessage id="label.measure4" defaultMessage="Category" />
        : <Descriptions.Item>{measure4}</Descriptions.Item>
        <br />
        <br />

                <FormattedMessage
                  id="label.measure4_maxscore"
                  defaultMessage="Category"
                />
                : <Descriptions.Item>{measure4_maxscore}</Descriptions.Item>

              </>
              );
         })()}
        <br />
        <br />
        <FormattedMessage
          id="label.placeholder.grade"
          defaultMessage=""
        />
        : <Descriptions.Item>{instruction}</Descriptions.Item>
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
        <Button onClick={onPrev}><FormattedMessage id="settingstests.tests.modal.button.back" /></Button>
          
          <Button
            type="primary"
            onClick={onFinish}
            style={{ marginLeft: 8 }}
          >
            <FormattedMessage id="label.donebtn" defaultMessage="" />
          </Button>
        </Form.Item>
        </>
      );
    }
  };

  return (
    <Form {...formItemLayout} form={form} layout="horizontal" className={styles.stepForm} >
      {renderContent()}
    </Form>
  );
};

export default connect(
  ({
    questionFormAndstepForm,
    loading,
  }: {
    questionFormAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    list: questionFormAndstepForm,

    submitting: loading.effects["questionFormAndstepForm/submitStepForm"],
    datatwo: questionFormAndstepForm.step,
  })
)(Step3);
