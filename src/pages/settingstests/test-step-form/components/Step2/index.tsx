import React, { useState, useEffect } from "react";
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
  Popconfirm,
  TimePicker,
  DatePicker,
  message,
} from "antd";

import {
  connect,
  Dispatch,
  FormattedMessage,
  useIntl,
  formatMessage,
} from "umi";
import { StateType } from "../../model";
import styles from "./index.less";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step2Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}
interface TableFormDateType {
  key: string;
  item?: string;
}

function onChangetime(time, timeString) {
  //  console.log(time, timeString);
}

function onChangedate(date, dateString) {
  //  console.log(date, dateString);
}

const Step2: React.FC<Step2Props> = (props) => {
  const { dispatch, data } = props;
  const intl = useIntl();
  const [form] = Form.useForm();
  const { questionsListPhysical } = props;
  const { questionsListPractical } = props;
  const [item, setItem] = useState<FormValueType>([{}]);
  const [item2, setItem2] = useState<FormValueType>([{}]);

  useEffect(() => {
    dispatch({
      type: "testFormAndstepForm/fetchQuestionsPractical",
    });
  }, [1]);

  useEffect(() => {
    dispatch({
      type: "testFormAndstepForm/fetchQuestionsPhysical",
    });
  }, [1]);

  const [data1, setData] = useState(item);
  const [data2, setData2] = useState(item2);
  const [index, setIndex] = useState(0);

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const getRowByKey2 = (key: string, newData2?: TableFormDateType[]) =>
    (newData2 || data2)?.filter((item) => item.key === key)[0];

  const removePhysical = (key: string) => {
    const newData = data1?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const removePractical = (key: string) => {
    const newData2 = data2?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData2(newData2);
    if (onChange) {
      onChange(newData2);
    }
  };

  const newMember = () => {
    const newData = data1?.map((item) => ({ ...item })) || [];

    let flag = true;

    if (Object.keys(newData).length) {
      for (var i = Object.keys(newData).length - 1; i >= 0; i--) {
        if (Object.keys(newData[i]).length == 0) {
          message.error(formatMessage({ id: "msg.step2.physical_msg" }));
          flag = false;
          return false;
        }
        //if(newData[i].id == ''){
        if (!("id" in newData[i])) {
          message.error(formatMessage({ id: "msg.step2.physical_msg" }));
          flag = false;
          return false;
        }
      }
    }
    //return false;
    if (flag == true) {
      newData.push({
        key: `NEW_TEMP_ID_${index}`,
        name: "",
        editable: true,
        isNew: true,
      });

      setIndex(index + 1);
      setData(newData);
      window.new_Data = newData;
    }
  };

  const newMember1 = () => {
    const newData1 = data2?.map((item) => ({ ...item })) || [];
    let flag1 = true;

    if (Object.keys(newData1).length) {
      for (var i = Object.keys(newData1).length - 1; i >= 0; i--) {
        if (Object.keys(newData1[i]).length == 0) {
          message.error(formatMessage({ id: "msg.step2.practical_msg" }));
          flag1 = false;
          return false;
        }
        if (!("id" in newData1[i])) {
          message.error(formatMessage({ id: "msg.step2.practical_msg" }));
          flag1 = false;
          return false;
        }
      }
    }

    //return false;
    if (flag1 == true) {
      newData1.push({
        key: `NEW_TEMPp_ID_${index}`,
        name: "",
        editable: true,
        isNew: true,
      });

      setIndex(index + 1);
      setData2(newData1);

      window.new_Data1 = newData1;
      window.new_Data2 = newData1;
    }
  };

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: "testFormAndstepForm/saveStepFormData",
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: "testFormAndstepForm/saveCurrentStep",
        payload: "info",
      });
    }
  };

  const onValidateForm = async () => {
    localStorage.setItem("stepTest", "doneTest");
    const values = await validateFields();

    let physical_arr1 = [];
    let practical_arr1 = [];

    for (var i = data1.length - 1; i >= 0; i--) {
      if (Object.keys(data1[i]).length) {
        questionsListPhysical.forEach((item) => {
          if (data1[i].id == item.id) {
            physical_arr1.push(item);
          }
        });
      }
    }

    for (var i = data2.length - 1; i >= 0; i--) {
      /*if(Object.keys(data2[i]).length){
        practical_arr1.push(data2[i]);
      }*/
      if (Object.keys(data2[i]).length) {
        questionsListPractical.forEach((item) => {
          if (data2[i].id == item.id) {
            practical_arr1.push(item);
          }
        });
      }
    }

    values["physical"] = physical_arr1;
    values["practical"] = practical_arr1;
    localStorage.setItem(
      "physicale_quetions_list",
      JSON.stringify(physical_arr1)
    );
    localStorage.setItem(
      "practicle_quetions_list",
      JSON.stringify(practical_arr1)
    );

    let flag = true;

    if (data.sections.indexOf("physical") > -1) {
      if (physical_arr1.length == 0) {
        flag = false;
        message.error(formatMessage({ id: "msg.step2.physical_msg" }));
      }
    }

    if (data.sections.indexOf("practical") > -1) {
      if (practical_arr1.length == 0) {
        flag = false;
        message.error(formatMessage({ id: "msg.step2.practical_msg" }));
      }
    }

    if (physical_arr1.length) {
      for (var i = physical_arr1.length - 1; i >= 0; i--) {
        if (Object.keys(physical_arr1[i]).length == 0) {
          message.error(formatMessage({ id: "msg.step2.physical_msg" }));
          flag = false;
          return false;
        }
        if (!("id" in physical_arr1[i])) {
          message.error(formatMessage({ id: "msg.step2.physical_msg" }));
          return false;
        }
      }
    }

    if (practical_arr1.length) {
      for (var i = practical_arr1.length - 1; i >= 0; i--) {
        if (Object.keys(practical_arr1[i]).length == 0) {
          message.error(formatMessage({ id: "msg.step2.practical_msg" }));
          flag = false;
          return false;
        }
        if (!("id" in practical_arr1[i])) {
          message.error(formatMessage({ id: "msg.step2.practical_msg" }));
          flag = false;
          return false;
        }
      }
    }

    if (flag == false) {
      return false;
    }

    if (dispatch) {
      dispatch({
        type: "testFormAndstepForm/saveStepFormData",
        payload: values,
      });

      dispatch({
        type: "testFormAndstepForm/saveCurrentStep",
        payload: "result",
      });

    }
  };

  function onChangeRadio(e) {
    //console.log(`checked:${e.target.value}`);
  }

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) => {

    const newData = [...(data1 as TableFormDateType[])];

    let flag2=true;
    for (var i = Object.keys(newData).length - 1; i >= 0; i--) {
        if(newData[i].id == e){
          message.error(formatMessage({ id: "personalInfo.msgduplicate.quetion" }));
          flag2 = false;
          return false;
        }
      }
    const target = getRowByKey(key, newData);
    if(flag2==true){
        if (target) {
          target[fieldName] = e;
          console.log(e);
          setData(newData);
        }
    }
  };

  const handleFieldChange2 = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) => {
    const newData2 = [...(data2 as TableFormDateType[])];
    const target2 = getRowByKey2(key, newData2);
    let flag3=true;
    for (var i = Object.keys(newData2).length - 1; i >= 0; i--) {
       if(newData2[i].id == e){
          message.error(formatMessage({ id: "personalInfo.msgduplicate.quetion" }));
          flag3 = false;
          return false;
        }
    }
    if(flag3==true){
      if (target2) {
        target2[fieldName] = e;
        setData2(newData2);
      }
    }
  };

  const physical_columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <span>
              <Select
                placeholder={intl.formatMessage({
                  id: "placeholder_name.step2.listlabelque.selectQue",
                  defaultMessage: "Select Question",
                })}
                style={{ width: "91%" }}
                onChange={(e) => handleFieldChange(e, "id", record.key)}
              >
                {questionsListPhysical?.map((item) => (

                  <Option value={item.id}>{item.que_name}</Option>
                ))}
              </Select>
              <Popconfirm
                title={intl.formatMessage({
                  id: "placeholder_name.step2.btn.deleteQues",
                  defaultMessage: "Confirm to to delete?",
                })}
                onConfirm={() => removePhysical(record.key)}
              >
                <a className={styles.spanLeft}>
                  {intl.formatMessage({
                    id: "placeholder_name.step2.btn.delete",
                    defaultMessage: "Delete",
                  })}
                </a>
              </Popconfirm>
            </span>
          );
        } else {
          return (
            <Select
              placeholder={intl.formatMessage({
                id: "placeholder_name.step2.listlabelque.selectQue",
                defaultMessage: "Select Question",
              })}
              style={{ width: "100%" }}
              onChange={(e) => handleFieldChange(e, "id", record.key)}
            >
              {questionsListPhysical?.map((item) => (
                <Option value={item.id}>{item.que_name}</Option>
              ))}
            </Select>
          );
        }
        return text;
      },
    },
  ];

  const practical_columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text: string, record: TableFormDateType) => {
        if (record.editable) {
          return (
            <span>
              <Select
                placeholder={intl.formatMessage({
                  id: "placeholder_name.step2.listlabelque.selectQue",
                  defaultMessage: "Select Question",
                })}
                style={{ width: "91%" }}
                onChange={(e) => handleFieldChange2(e, "id", record.key)}
              >
                {questionsListPractical?.map((item) => (
                  <Option value={item.id}>{item.que_name}</Option>
                ))}
              </Select>

              <Popconfirm
                title={intl.formatMessage({
                  id: "placeholder_name.step2.btn.deleteQues",
                  defaultMessage: "Confirm to to delete?",
                })}
                onConfirm={() => removePractical(record.key)}
              >
                <a className={styles.spanLeft}>
                  {intl.formatMessage({
                    id: "placeholder_name.step2.btn.delete",
                    defaultMessage: "Delete",
                  })}
                </a>
              </Popconfirm>
            </span>
          );
        } else {
          return (
            <Select
              placeholder={intl.formatMessage({
                id: "placeholder_name.step2.listlabelque.selectQue",
                defaultMessage: "Select Question",
              })}
              style={{ width: "100%" }}
              onChange={(e) => handleFieldChange2(e, "id", record.key)}
            >
              {questionsListPractical?.map((item) => (
                <Option value={item.id}>{item.que_name}</Option>
              ))}
            </Select>
          );
        }
        return text;
      },
    },
  ];

  const renderContent = () => {
    return (
      <>


              <div
                style={{
                  display:
                    data.sections.indexOf("written") > -1 ? "block" : "none",
                }}
              >
                <h4>
                  <b> <FormattedMessage id="select_type_written.step.list.TestName" /> : </b>{" "}
                </h4>

                {(() => {
                  if (data.sections.indexOf("written") > -1) {
                    return (
                      <Form.Item
                        name="testLength"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelname.TestLength",
                          defaultMessage: "Test Length",
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2.testLength_msg" />
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            id: "placeholder_name.step2.listlabelname.TestLength",
                            defaultMessage: "Test Length",
                          })}
                        />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        name="testLength"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelname.TestLength",
                          defaultMessage: "Test Length",
                        })}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            id: "placeholder_name.step2.listlabelname.TestLength",
                            defaultMessage: "Test Length",
                          })}
                        />
                      </Form.Item>
                    );
                  }
                })()}

                {(() => {
                  if (data.sections.indexOf("written") > -1) {
                    return (
                      <Form.Item
                        name="noofquestions"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.quetion",
                          defaultMessage: "No Of Quetions",
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2.noOfQue_msg" />
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            id: "placeholder_name.step2.listlabelque.quetion",
                            defaultMessage: "No Of Quetions",
                          })}
                        />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        name="noofquestions"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.quetion",
                          defaultMessage: "No Of Quetions",
                        })}
                      >
                        <Input
                          placeholder={intl.formatMessage({
                            id: "placeholder_name.step2.listlabelque.quetion",
                            defaultMessage: "No Of Quetions",
                          })}
                        />
                      </Form.Item>
                    );
                  }
                })()}

                {(() => {
                  if (data.sections.indexOf("written") > -1) {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "Required compliances rate",
                        })}
                        name="requiredcompliancesrate"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2_required_compliances_rate_msg" />
                            ),
                          },
                        ]}
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "Required compliances rate",
                        })}
                        name="requiredcompliancesrate"
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  }
                })()}
                {(() => {
                  if (data.sections.indexOf("written") > -1) {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.creditpoints",
                          defaultMessage: "Credit Points",
                        })}
                        name="written_credit"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2_required_compliances_rate_msg" />
                            ),
                          },
                        ]}
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.creditpoints",
                          defaultMessage: "Credit Points",
                        })}
                        name="written_credit"
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  }
                })()}
              </div>



              <div
                style={{
                  display:
                    data.sections.indexOf("physical") > -1 ? "block" : "none",
                }}
              >
                <h4>
                  <b> <FormattedMessage id="select_type_physical.step.list.TestName" />: </b>{" "}
                </h4>
                <Form.Item
                label={intl.formatMessage({
                  id: "test.label.add.questions",
                  defaultMessage: "Add Question",
                })}
                >
                <Table<TableFormDateType>
                  columns={physical_columns}
                  dataSource={data1}
                  pagination={false}
                  rowClassName={(record) =>
                    record.editable ? styles.editable : ""
                  }
                  className={styles.tableHead}
                />
                <Button
                  style={{ width: " 100%", marginTop: 16, marginBottom: 8 }}
                  type="dashed"
                  onClick={newMember}
                >
                  <PlusOutlined />
                  {intl.formatMessage({
                    id: "placeholder_name.step2.listlabelque.addMore",
                    defaultMessage: "Add More",
                  })}
                </Button>
                </Form.Item>
                {(() => {
                  if (data.sections.indexOf("physical") > -1) {
                    return (
                      <Form.Item
                        name="physical_req_rate"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "",
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2_required_compliances_rate_msg" />
                            ),
                          },
                        ]}
                      >
                        <InputNumber onChange={onChange} />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        name="physical_req_rate"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "No Of Quetions",
                        })}
                      >
                        <InputNumber onChange={onChange} />
                      </Form.Item>
                    );
                  }
                })()}
                {(() => {
                  if (data.sections.indexOf("physical") > -1) {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.creditpoints",
                          defaultMessage: "Credit Points",
                        })}
                        name="physical_credit"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2_required_compliances_rate_msg" />
                            ),
                          },
                        ]}
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.creditpoints",
                          defaultMessage: "Credit Points",
                        })}
                        name="physical_credit"
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  }
                })()}
              </div>

              <div
                style={{
                  display:
                    data.sections.indexOf("practical") > -1 ? "block" : "none",
                }}
              >
                <h4>
                  <b><FormattedMessage id="select_type_practicle.step.list.TestName" /> : </b>{" "}
                </h4>
                <Form.Item
                label={intl.formatMessage({
                  id: "test.label.add.questions",
                  defaultMessage: "Add Question",
                })}
                >
                <Table <TableFormDateType>
                  columns={practical_columns}
                  dataSource={data2}
                  pagination={false}
                  rowClassName={(record) =>
                    record.editable ? styles.editable : ""
                  }
                  className={styles.tableHead}
                />
                <Button
                  style={{ width: " 100%", marginTop: 16, marginBottom: 8 }}
                  type="dashed"
                  onClick={newMember1}
                >
                  <PlusOutlined />
                  {intl.formatMessage({
                    id: "placeholder_name.step2.listlabelque.addMore",
                    defaultMessage: "Add More",
                  })}
                </Button>
                </Form.Item>
                {(() => {
                  if (data.sections.indexOf("practical") > -1) {
                    return (
                      <Form.Item
                        name="practical_req_rate"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "Required compliances rate",
                        })}
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2_required_compliances_rate_msg" />
                            ),
                          },
                        ]}
                      >
                        <InputNumber onChange={onChange} />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        name="practical_req_rate"
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.requiredcompliancesrate",
                          defaultMessage: "Required compliances rate",
                        })}
                      >
                        <InputNumber onChange={onChange} />
                      </Form.Item>
                    );
                  }
                })()}
                {(() => {
                  if (data.sections.indexOf("practical") > -1) {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.creditpoints",
                          defaultMessage: "Credit Points",
                        })}
                        name="practical_credit"
                        rules={[
                          {
                            required: true,
                            message: (
                              <FormattedMessage id="msg.step2_required_compliances_rate_msg" />
                            ),
                          },
                        ]}
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  } else {
                    return (
                      <Form.Item
                        label={intl.formatMessage({
                          id: "placeholder_name.step2.listlabelque.creditpoints",
                          defaultMessage: "Credit Points",
                        })}
                        name="practical_credit"
                      >
                        <InputNumber min={0} max={100} />
                      </Form.Item>
                    );
                  }
                })()}
              </div>

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
                <Button
                  type="primary"
                  style={{ marginLeft: 8 }}
                  onClick={onValidateForm}
                >
                  <FormattedMessage id="msg.step2.next.btn" />
                </Button>
              </Form.Item>
      </>
    );
  };

  return (
    <>
      <Form {...formItemLayout} initialValues={data}  form={form} className={styles.stepForm}>
        {renderContent()}
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
    const { questionsListPractical } = testFormAndstepForm;
    const { questionsListPhysical } = testFormAndstepForm;

    return {
      questionsListPractical,
      questionsListPhysical,
      loading: loading.models.scheduleAndAvailForm,
      data: testFormAndstepForm.step,
    };
  }
)(Step2);
