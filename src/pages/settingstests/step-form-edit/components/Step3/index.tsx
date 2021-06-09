import {
  Button,
  Result,
  Descriptions,
  Table,
  Statistic,
  Form,
  Select,
  Input,
  Row,
  Col,
  Checkbox,
  Popconfirm,
  message,
  Divider,
  Image,
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
import { testarr } from '@/utils/options';
let chk_val;

interface Step3Props {
  datatwo?: StateType["step"];
  dispatch?: Dispatch<any>;
}

const formItemLayout = {
  labelCol: {
    span: 6,
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
  const { datatwo, dispatch } = props;
  const { question } = props;
  const { list } = props;
  const intl = useIntl();
  function useQuery() {
    return new URLSearchParams(window.location.search);
  }
  let question_id = useQuery().get("id");

  console.log(question);

  /* let main_ans_arr = [];

  for (var i = question?.ans_options?.length - 1; i >= 0; i--) {

    main_ans_arr.push({
      key: question.ans_options[i].id,
      name: question.ans_options[i].id,
      editable: true,
      isNew: true,
      id: question.ans_options[i].id,
      answer:question.ans_options[i].answer,
    });
  }

  const [data, setData] = useState(main_ans_arr);

  console.log(main_ans_arr);

  window.new_Data = main_ans_arr;*/

  // const [data, setData] = useState(item);
  const [form] = Form.useForm();

  //console.log(datatwo);
  const { validateFields, getFieldsValue } = form;
  const [index, setIndex] = useState(0);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  /*const newMember = () => {
    const newData = data?.map((item) => ({ ...item })) || [];
   // console.log(newData);


   let flag = true;

    if(Object.keys(newData).length){
      for (var i = Object.keys(newData).length - 1; i >= 0; i--) {
        if(Object.keys(newData[i]).length == 0){
          message.error(formatMessage({ id: "msg.step3.answer_msg" }));
          flag = false;
          return false;
        }
        if(newData[i].id == '' || (!('id' in newData[i]))){
       // if(!('id' in newData[i])){
          message.error(formatMessage({ id: "msg.step3.answer_msg" }));
          flag = false;
          return false;
        }
      }
    }
    if(flag == true){
         newData.push({
          key: `NEW_TEMP_ID_${index}`,
          name: "",
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
      target['name'] = e.target.value;
      target['key'] = e.target.value;
      //target[fieldName] = e;
      setData(newData);
    }
     window.new_Data = newData;

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

  };*/

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
    payAccount,
    receiverAccount,
    receiverName,
    amount,
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
  console.log(question);

  const onFinish = async () => {
    const values = await validateFields();
    //values["ans_options"] = data;
    //values['question_id'] = question_id;
    console.log(values);
    //return false;
    /*if(datatwo.ques_type == '0'){
      let answer_arr1 = [];

      for (var i = data.length - 1; i >= 0; i--) {
          if(Object.keys(data[i]).length){
            answer_arr1.push(data[i]);
          }
       }

      values["ans_options"] = answer_arr1;

      let flag = true;

       if (datatwo.ques_type == 0) {
          if(answer_arr1.length == 0){
            flag = false;
            message.error(formatMessage({ id: "msg.step3.answer_msg" }));

          }
       }

       if(answer_arr1.length){
        for (var i =answer_arr1.length - 1; i >= 0; i--) {
          if(Object.keys(answer_arr1[i]).length == 0){
            message.error(formatMessage({ id: "msg.step3.answer_msg" }));
            flag = false;
            return false;
          }

          if(answer_arr1[i].id == '' || (!('id' in answer_arr1[i]))){

         // if(!('id' in answer_arr1[i])){
            message.error(formatMessage({ id: "msg.step3.answer_msg" }));
            return false;
          }
        }
      }

      if(flag == false){
        return false;
      }
   }*/
    dispatch({
      type: "questionEditFormAndstepForm/submitStepForm",
      payload: {
        ...datatwo,
        ...values,
      },
    });

    /*if (dispatch) {
      dispatch({
        type: "questionEditFormAndstepForm/submitStepForm",
        payload: {
          ...datatwo,
          ...values,
        },
      });
      }*/

    localStorage.setItem("stepEditQues", "done");
    localStorage.removeItem("written_quetions_list");
    localStorage.removeItem("media_quetions_list");

    message.success(
      formatMessage({ id: "settingstests.tests.success.subTitle" })
    );

    const timeout = setTimeout(() => {
      history.push("/settingstests/tab/questions");
      //history.push("/settingstests/tab/questions");
      //window.location.href='/settingstests/tab/questions';
      //location.replace("/settingstests/tab/questions");
    }, 3000);
  };

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: "questionEditFormAndstepForm/saveStepFormData",
        payload: {
          //...data,
          ...values,
        },
      });
      dispatch({
        type: "questionEditFormAndstepForm/saveCurrentStep",
        payload: "confirm",
      });
    }
  };

  /*const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="付款账户"> {payAccount}</Descriptions.Item>
        <Descriptions.Item label="收款账户">
          {" "}
          {receiverAccount}
        </Descriptions.Item>
        <Descriptions.Item label="收款人姓名">
          {" "}
          {receiverName}
        </Descriptions.Item>
        <Descriptions.Item label="转账金额">
          <Statistic value={amount} suffix="元" />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );*/
  const extra = (
    <>
      <Button type="primary" onClick={onFinish}>
        再转一笔
      </Button>
      <Button>查看账单</Button>
    </>
  );

  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text: string, record: TableFormDateType) => {
        console.log(record);
        if (record.editable) {
          return (
            <Row gutter={24}>
              <Col span={6}> </Col>
              <Col span={12}>
                <span>
                  <Checkbox
                    checked={record.answer}
                    onChange={(e) => handleCheckChange(e, "answer", record.key)}
                  />
                  <Input
                    placeholder="# of questions"
                    onChange={(e) => handleFieldChange(e, "id", record.key)}
                    style={{ width: "80%", marginLeft: 8, marginRight: 5 }}
                    value={record.id}
                  />
                  <Popconfirm
                    title="Confirm to to delete？"
                    onConfirm={() => remove(record.key)}
                  >
                    <a className={styles.spanLeft}>
                      {" "}
                      <FormattedMessage
                        id="lable.delete.btn"
                        defaultMessage="Delete"
                      />
                    </a>
                  </Popconfirm>
                </span>
              </Col>
              <Col span={6}> </Col>
            </Row>
          );
        } else {
          return (
            <>
              <Row gutter={24}>
                <Col span={6}> </Col>
                <Col span={12}>
                  <Checkbox
                    onChange={(e) => handleCheckChange(e, "answer", record.key)}
                  />
                  <Input
                    placeholder="# of questions"
                    onChange={(e) => handleFieldChange(e, "id", record.key)}
                    style={{ width: "90%", marginLeft: 10 }}
                  />
                </Col>
                <Col span={6}> </Col>
              </Row>
            </>
          );
        }
        return text;
      },
    },
  ];

  const renderContent = () => {
    if (datatwo.ques_type == 1) {
      return (
        <>
          <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12}>
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
                        id="settingstests.tests.test_category"
                        defaultMessage="Test Category"
                      />
                      :
                      {list?.map((item) => {
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
                      <FormattedMessage
                        id="settingstests.tests.image"
                        defaultMessage="Images"
                      />
                      :{" "}
                      <Descriptions.Item>
                        <div className={styles.divclass}>
                          {(() => {
                            let obj = JSON.parse(
                              localStorage.getItem("media_quetions_list")
                            );

                            return (
                              <>
                                {obj?.map((item) => (
                                  <>
                                    <Image width={50} src={item.response} />
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
            </Col>

            <Col span={6}> </Col>
            <Divider />
            <Col span={6}> </Col>
            <Col span={12} className={styles.textCenteralign}>
              <Form.Item>
                <Button onClick={onPrev}>
                  <FormattedMessage id="settingstests.tests.modal.button.back" />
                </Button>

                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="settingstests.tests.modal.button.done" />
                </Button>
              </Form.Item>
            </Col>
            <Col span={6}> </Col>
          </Row>
        </>
      );
    }
    if (datatwo.ques_type == 0) {
      return (
        <>
          <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12}>
              {(() => {
                if (type == "written") {
                  return (
                    <>
                      <FormattedMessage
                        id="settingstests.tests.quetion_cateory_lbl"
                        defaultMessage="Exam unit"
                      />
                      : <Descriptions.Item>{testarr[type]}</Descriptions.Item>
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
                      {list?.map((item) => {
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
                      <br />
                      <Divider />
                      <FormattedMessage
                        id="settingstests.tests.image"
                        defaultMessage="Images"
                      />
                      :{" "}
                      <Descriptions.Item>
                        <div className={styles.divclass}>
                          {(() => {
                            let obj = JSON.parse(
                              localStorage.getItem("media_quetions_list")
                            );

                            return (
                              <>
                                {obj?.map((item) => (
                                  <>
                                    <Image width={50} src={item.response} />
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
            </Col>
            <Col span={6}> </Col>
            </Row>
            <Row>
            <Col span={8} offset={8} className={styles.textCenteralign}>
              <Form.Item

              >
                <br />
                <Button onClick={onPrev}>
                  <FormattedMessage id="settingstests.tests.modal.button.back" />
                </Button>

                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="settingstests.tests.modal.button.done" />
                </Button>
              </Form.Item>
            </Col>

          </Row>
        </>
      );
    }
    if (datatwo.type == "physical") {
      return (
        <>
          <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12}>
              <h4>
                <b> Basic Information : </b>{" "}
              </h4>
              <Divider />
              <FormattedMessage
                id="settingstests.tests.quetion_cateory_lbl"
                defaultMessage="Category"
              />
              : <Descriptions.Item>{testarr[type]}</Descriptions.Item>
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
              {list?.map((item) => {
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
              <br />
              <br />
            </Col>
            <Col span={6}> </Col>
            </Row>
             <Row>

            <Col span={8} offset={8} className={styles.textCenteralign}>
              <Form.Item>
                <Button onClick={onPrev}>
                  <FormattedMessage id="settingstests.tests.modal.button.back" defaultMessage="" />
                </Button>
                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="settingstests.tests.modal.button.done" defaultMessage="" />
                </Button>
              </Form.Item>
            </Col>

          </Row>
        </>
      );
    }
    if (datatwo.type == "practical") {
      return (
        <>
          <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12}>
              <h4>
                <b> Basic Information : </b>{" "}
              </h4>
              <Divider />
              <FormattedMessage
                id="settingstests.tests.quetion_cateory_lbl"
                defaultMessage="Category"
              />
              : <Descriptions.Item>{testarr[type]}</Descriptions.Item>
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
              {list?.map((item) => {
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

              <br />
              <br />
              <FormattedMessage
                id="label.placeholder.grade"
                defaultMessage=""
              />
              : <Descriptions.Item>{instruction}</Descriptions.Item>
              <br />
              <br />
            </Col>
            <Col span={6}> </Col>
             </Row>
            <Row>

            <Col span={8} offset={8} className={styles.textCenteralign}>
              <Form.Item >
                <Button onClick={onPrev}>
                  <FormattedMessage id="settingstests.tests.modal.button.back" />
                </Button>
                <Button
                  type="primary"
                  onClick={onFinish}
                  style={{ marginLeft: 8 }}
                >
                  <FormattedMessage id="settingstests.tests.modal.button.done" />
                </Button>
              </Form.Item>
            </Col>
           </Row>

        </>
      );
    }
  };

  return (
    <Form {...formItemLayout} form={form} initialValues={question}>
      {renderContent()}
    </Form>
  );
};

export default connect(
  ({
    questionEditFormAndstepForm,
    loading,
  }: {
    questionEditFormAndstepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => {
    const { question } = questionEditFormAndstepForm;
    const { list } = questionEditFormAndstepForm;
    return {
      question,
      list,
      submitting: loading.effects["questionEditFormAndstepForm/submitStepForm"],
      datatwo: questionEditFormAndstepForm.step,
    };
  }
)(Step3);
