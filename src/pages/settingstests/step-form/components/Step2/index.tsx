import React, { FC, useRef, useState, useEffect } from "react";
import {
  Form,
  Alert,
  Button,
  Descriptions,
  Divider,
  Statistic,
  Input,
  Select,
  Upload,
  Table,
  InputNumber,
  Row,
  Col,
  Radio,
  Checkbox,
  message,
  Popconfirm,
} from "antd";

import {
  connect,
  Dispatch,
  useIntl,
  formatMessage,
  FormattedMessage,
} from "umi";
import { StateType } from "../../model";
import styles from "./index.less";
import { PlusOutlined } from "@ant-design/icons";

let chk_val;
const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
  span: 19,
},
};
interface Step2Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}
function handleChange(value) {
  //console.log(`selected ${value}`);
}
interface TableFormDateType {
  key: string;
  item?: string;
}
const Step2: React.FC<Step2Props> = (props) => {
  const [item, setItem] = useState<FormValueType>([
    {
      name: "",
      key: "",
    },
  ]);
  const intl = useIntl();
  const { dispatch, data } = props;
  const [form] = Form.useForm();
  const { list } = props;
  const [value, setValue] = React.useState(1);
  //console.log(data);
  const [data1, setData] = useState(item);
  if (!data) {
    return null;
  }
  const [index, setIndex] = useState(0);
  const { validateFields, getFieldsValue } = form;
  const [fileList, setFileList] = useState([]);
  let upload_lable=  <FormattedMessage
                      id="settingstests.questions.list.modal.False"
                      defaultMessage="False"
                    />
  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const newMember = () => {
    const newData = data1?.map((item) => ({ ...item })) || [];
    // console.log(newData);

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
    const newData = data1?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChangecheckbox(newData);
    }
    //console.log(newData);
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) => {
    //  console.log('hello');

    const newData = [...(data1 as TableFormDateType[])];
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
    const newData = [...(data1 as TableFormDateType[])];

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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  function onChangeremove(value) {
    //console.log("changed", value);

  }

  function onChangecheckbox(value) {
      //console.log("changed", value);
  }
  const onChangecheckboxradio = (e) => {

    setValue(e.target.value);
    console.log(e.target.value);
  }

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onPrev = () => {
    //console.log("called");
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
        payload: "info",
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: "questionFormAndstepForm/fetch",
    });
  }, [1]);

  const onValidateForm = async () => {
    localStorage.setItem("step", "done");
    const values = await validateFields();
    if (data.type == "written") {
      values["media_files"] = fileList;
    }

    const newData = [...(data1 as TableFormDateType[])];
    //console.log(data);
    //console.log(newData);
    values["ans_options"] = newData;
    //return false;
    //  values["ques_type"] = data;
    //console.log(values.ques_type);
    //console.log(values.ans_options.answers);
    if (values.ques_type == "1" && typeof values.tick_answer === "undefined") {
      message.error(
        formatMessage({ id: "settingstests.question..msg.selectItem" })
      );

      return false;
    }

    console.log(newData.ques_type);
    if (values.ques_type == "0") {
      let answer_arr1 = [];

      for (var i = newData.length - 1; i >= 0; i--) {
        if (Object.keys(newData[i]).length) {
          answer_arr1.push(newData[i]);
        }
      }

      values["ans_options"] = answer_arr1;
      //console.log(values["ans_options"]);
      // return false;
      //localStorage.setItem('written_quetions_list',JSON.stringify(values["ans_options"]));
      let flag = true;

      if (values.ques_type == 0) {
        if (answer_arr1.length == 0) {
          flag = false;
          message.error(formatMessage({ id: "msg.step3.answer_msg" }));
        }
      }
      console.log(answer_arr1.length);
      let flag1 = true;
      if (answer_arr1.length) {
        for (var i = answer_arr1.length - 1; i >= 0; i--) {
          if (Object.keys(answer_arr1[i]).length == 0) {
            message.error(formatMessage({ id: "msg.step3.answer_msg" }));
            flag = false;
            return false;
          }

          /*if (answer_arr1[i].id == "" || !("id" in answer_arr1[i])) {
            message.error(formatMessage({ id: "msg.step3.answer_msg" }));
            return false;
          }*/

          if (answer_arr1[i].answer == true) {
            flag1 = false;
          }
        }
      }
      if (flag1 == true) {
        message.error(formatMessage({ id: "msg.step3.answer_msg" }));
        return false;
      }
      if (flag == false) {
        return false;
      }
    }

    localStorage.setItem(
      "written_quetions_list",
      JSON.stringify(values.ans_options)
    );
    localStorage.setItem(
      "media_quetions_list",
      JSON.stringify(values.media_files)
    );

    if (dispatch) {
      dispatch({
        type: "questionFormAndstepForm/saveStepFormData",
        payload: values,
      });
      dispatch({
        type: "questionFormAndstepForm/saveCurrentStep",
        payload: "result",
      });
    }
  };

  const onChangeradio = (e) => {
    let msg = "";
    let req = "false";
    //console.log('radio checked', e.target.value);
    setValue(e.target.value);
    if (e.target.value == "0") {
      document.getElementById("quetion_type2").style.display = "block";
      document.getElementById("quetion_type1").style.display = "none";
    }
    if (e.target.value == "1") {
      document.getElementById("quetion_type2").style.display = "none";
      document.getElementById("quetion_type1").style.display = "block";
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <span>
              <Checkbox
                onChange={(e) => handleCheckChange(e, "answer", record.key)}
              />
              <Input
              placeholder={intl.formatMessage({
                id: "label.placeholder.answer",
                defaultMessage: "the answer",
              })}
                onChange={(e) => handleFieldChange(e, "id", record.key)}
              />
              <Popconfirm
                title="Confirm to to delete？"
                onConfirm={() => remove(record.key)}
              >
                <a className={styles.spanLeft}>Delete</a>
              </Popconfirm>
            </span>
          );
        } else {
          return (
            <>
            <Checkbox
              onChange={(e) => handleCheckChange(e, "answer", record.key)}
            />
            <Input
            placeholder={intl.formatMessage({
              id: "label.placeholder.answer",
              defaultMessage: "the answer",
            })}
              onChange={(e) => handleFieldChange(e, "id", record.key)}
            />
            </>
          );
        }
        return text;
      },
    },
  ];

  const renderContent = () => {
    if (data.type == "written") {
      return (
        <>
              <Form.Item
                label={intl.formatMessage({
                  id: "label.quetionName",
                  defaultMessage: "Question name",
                })}
                name="que_name"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="msg.step2.queName_msg" />,
                  },
                ]}
              >
                <TextArea rows={4} placeholder={intl.formatMessage({
                  id: "label.quetionName",
                  defaultMessage: "Question name",
                })} />
              </Form.Item>

              <Form.Item
                name="category_id"
                label={intl.formatMessage({
                  id: "label.category_name",
                  defaultMessage: "Test Categories",
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.testCategory_msg" />
                    ),
                  },
                ]}
              >
                <Select>
                  {list?.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Divider />

              <Form.Item
                label={intl.formatMessage({
                  id: "label.que_type",
                  defaultMessage: "Question Type",
                })}
                name="ques_type"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="msg.step2.queType_msg" />,
                  },
                ]}
              >
                <Radio.Group onChange={onChangeradio}>
                  <Radio value="0">
                    <FormattedMessage
                      id="settingstests.questions.list.modal.multipleChoices"
                      defaultMessage="Multiple choices"
                    />
                  </Radio>
                  <Radio value="1">
                    {" "}
                    <FormattedMessage
                      id="settingstests.questions.list.modal.trueOrFalse"
                      defaultMessage="true or false"
                    />
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <div
                id="quetion_type2"
                className={styles.mtop_30}
                style={{ display: "none" }}
              >
                <Table<TableFormDateType>
                  columns={columns}
                  dataSource={data1}
                  pagination={false}
                  rowClassName={(record) =>
                    record.editable ? styles.editable : ""
                  }
                  className={styles.tableHead}
                />

                <Button
                  style={{
                        width: "42%",
                        marginTop: 12,
                      marginBottom: 8,
                      marginLeft: 216
                  }}
                  type="dashed"
                  onClick={newMember}
                >
                  <PlusOutlined />

                    <FormattedMessage
                      id="settingstests.addmore.btn"
                      defaultMessage="Add More"
                    />
                </Button>
              </div>

              <div
                id="quetion_type1"
                className={styles.mtop_20}
                style={{ display: "none" }}
              >
                <Form.Item
                  name="tick_answer"
                  label={intl.formatMessage({
                    id: "label.tick_answer",
                    defaultMessage: "",
                  })}
                >
                <Radio.Group onChange={onChangecheckboxradio}>
                  <Radio value="1">
                    <FormattedMessage
                      id="settingstests.questions.list.modal.True"
                      defaultMessage="True"
                    />
                  </Radio>
                  <Radio value="0">
                    {" "}
                    <FormattedMessage
                      id="settingstests.questions.list.modal.False"
                      defaultMessage="False"
                    />
                  </Radio>

                   </Radio.Group>
                </Form.Item>
              </div>
              <Divider />
              <Form.Item
                label={intl.formatMessage({
                  id: "label.image",
                  defaultMessage: "Image and videos",
                })}
                name="media_files"
              >
                <Upload
                  action={API_URL+"/api/upload-avatar" }
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 10 && "+" }
                </Upload>

                <span className={styles.spanLeft}>

                   <FormattedMessage id="label.max10images" defaultMessage="(Max 10 images or 1 video)" />
                </span>
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
                <Button onClick={onPrev}>
                  <FormattedMessage id="label.backbtn" defaultMessage="Back" />
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 8 }}
                  onClick={onValidateForm}
                >
                  <FormattedMessage id="label.nextbtn" defaultMessage="Next" />
                </Button>
              </Form.Item>
        </>
      );
    }
    if (data.type == "physical") {
      return (
        <>
              <Form.Item
                name="que_name"
                label={intl.formatMessage({
                  id: "label.quetionName",
                  defaultMessage: "Question name",
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="msg.step2.queName_msg" />,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="category_id"
                label={intl.formatMessage({
                  id: "label.category_name",
                  defaultMessage: "Test Categories",
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.testCategory_msg" />
                    ),
                  },
                ]}
              >
                <Select>
                  {list?.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="score_operator"
                label={intl.formatMessage({
                  id: "label.score_operator",
                  defaultMessage: "Required scores",
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.required_score_operator_msg" />
                    ),
                  },
                ]}
              >
                <Select
                  defaultValue={intl.formatMessage({
                    id: "label.placeholder.score_type",
                    defaultMessage: "Please select score type",
                  })}
                      onChange={handleChange}
                >
                  <Option value="<"> {"<"} </Option>
                  <Option value=">">{">"}</Option>

                  <Option value="=">{"="}</Option>
                </Select>
              </Form.Item>

              <Form.Item
                type="number"
                name="score"
                label={intl.formatMessage({
                  id: "label.score",
                  defaultMessage: "Required scores",
                })}
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[0-9]+$/),

                    message: (
                      <FormattedMessage id="msg.step2.required_score_msg" />
                    ),
                  },
                ]}
              >
                <Input
                maxLength={5}
                placeholder={intl.formatMessage({
                  id: "label.placeholder.maxscore",
                  defaultMessage: "max score",
                })}
                />
              </Form.Item>

              <Form.Item
                name="instruction"
                label={intl.formatMessage({
                  id: "label.gradeinstruction",
                  defaultMessage: "Grade Instruction",
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.grade_instruction_msg" />
                    ),
                  },
                ]}
              >
                <TextArea
                  placeholder={intl.formatMessage({
                    id: "label.placeholder.enter_grade",
                    defaultMessage: "Enter Grade Instruction",
                  })}
                />
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
                <Button onClick={onPrev}>
                  <FormattedMessage id="label.backbtn" defaultMessage="Back" />
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 8 }}
                  onClick={onValidateForm}
                >
                  <FormattedMessage id="label.nextbtn" defaultMessage="Next" />
                </Button>
              </Form.Item>
        </>
      );
    }
    if (data.type == "practical") {
      return (
        <>
              <Form.Item
                name="que_name"
                label={intl.formatMessage({
                  id: "label.quetionName",
                  defaultMessage: "Question name",
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="msg.step2.queName_msg" />,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="category_id"
                label={intl.formatMessage({
                  id: "label.category_name",
                  defaultMessage: "Test Categories",
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.testCategory_msg" />
                    ),
                  },
                ]}
              >
                <Select>
                  {list?.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="measure1"
                label={intl.formatMessage({
                  id: "label.measure1",
                  defaultMessage: "Measure 1",
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="msg.step2.measure1_msg" />,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="measure1_maxscore"
                label={intl.formatMessage({
                  id: "label.measure1maxscore",
                  defaultMessage: "Measure 1 Max Score",
                })}
                rules={[
                  {
                      pattern: new RegExp(/^[0-9]+$/),
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.measure1_score_msg" />
                    ),
                  },
                ]}
              >
                <Input
                  maxLength={5}
                  placeholder={intl.formatMessage({
                    id: "label.placeholder.maxscore",
                    defaultMessage: "max score",
                  })}
                />
              </Form.Item>
              <Form.Item
                name="measure2"
                label={intl.formatMessage({
                  id: "label.measure2",
                  defaultMessage: "Measure 2",
                })}
              
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="measure2_maxscore"
                label={intl.formatMessage({
                  id: "label.measure2_maxscore",
                  defaultMessage: "Measure 2 Max Score",
                })}

              >
                <Input
                placeholder={intl.formatMessage({
                  id: "label.placeholder.maxscore",
                  defaultMessage: "max score",
                })}
                />
              </Form.Item>

              <Form.Item
                name="measure3"
                label={intl.formatMessage({
                  id: "label.measure3",
                  defaultMessage: "Measure 3",
                })}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="measure3_maxscore"
                label={intl.formatMessage({
                  id: "label.measure3_maxscore",
                  defaultMessage: "Measure 3 Max Score",
                })}

              >
                <Input
                  placeholder={intl.formatMessage({
                    id: "label.placeholder.maxscore",
                    defaultMessage: "max score",
                  })}
                />
              </Form.Item>

              <Form.Item
                name="measure4"
                label={intl.formatMessage({
                  id: "label.measure4",
                  defaultMessage: "Measure 4",
                })}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                name="measure4_maxscore"
                label={intl.formatMessage({
                  id: "label.measure4_maxscore",
                  defaultMessage: "Measure 4 Max Score",
                })}
            
              >
                <Input
                  placeholder={intl.formatMessage({
                    id: "label.placeholder.maxscore",
                    defaultMessage: "max score",
                  })}
                />
              </Form.Item>

              <Form.Item
                name="instruction"
                label={intl.formatMessage({
                  id: "label.gradeinstruction",
                  defaultMessage: "Grade Instruction",
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="msg.step2.grade_instruction_msg" />
                    ),
                  },
                ]}
              >
                <TextArea
                  placeholder={intl.formatMessage({
                    id: "label.placeholder.grade_instruction",
                    defaultMessage: "Enter Grade Instruction",
                  })}
                />
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
                <Button onClick={onPrev}>
                  <FormattedMessage id="label.backbtn" defaultMessage="Back" />
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 8 }}
                  onClick={onValidateForm}
                >
                  <FormattedMessage id="label.nextbtn" defaultMessage="Next" />
                </Button>
              </Form.Item>
        </>
      );
    }
  };

  return (
    <>
      <Form  {...formItemLayout} initialValues={data} form={form} layout="horizontal" className={styles.stepForm}>
        {renderContent()}
      </Form>
    </>
  );
};

export default connect(
  ({
    questionFormAndstepForm,
    loading,
  }: {
    questionFormAndstepForm: {};
    loading: any;
  }) => {
    const { list } = questionFormAndstepForm;
    return {
      list,
      data: questionFormAndstepForm.step,
    };
  }
)(Step2);
