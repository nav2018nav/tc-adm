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
  Upload,Row,Col,
  InputNumber,Radio,Checkbox,Table,Popconfirm,message
} from "antd";

import { connect, Dispatch, FormattedMessage,useIntl ,formatMessage} from "umi";
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
 
};
interface TableFormDateType {
  key: string;
  item?: string;
}
interface Step2Props {
  data?: StateType["step"];
  dispatch?: Dispatch<any>;
}
function handleChange(value) {
  //console.log(`selected ${value}`);
}

const Step2: React.FC<Step2Props> = (props) => {

  function useQuery() {
    return new URLSearchParams(window.location.search);
  }
  let question_id = useQuery().get('id');
  
  const intl = useIntl();
  const { dispatch, data } = props;
  const [form] = Form.useForm();
  const { list } = props;
  const { question } = props;
  let main_img_arr = [];
  const [value, setValue] = React.useState(1);
  const [item, setItem] = useState<FormValueType>([
    {
      name: "",
      key: "",
    },
  ]);

   if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

   for (var i = question?.media_files?.length - 1; i >= 0; i--) {
      
      main_img_arr.push({
        uid: i,
        /*name: "image1.png",
        status: "done",*/
        url:question.media_files[i].response,
        response:question.media_files[i].response,
      });
    }

  const [fileList, setFileList] = useState(main_img_arr);

  let main_ans_arr = [];

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

  const [ data1, setData] = useState(main_ans_arr);

  window.new_Data = main_ans_arr;

  function onChangecheckbox(value) {

  }

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
        type: "questionEditFormAndstepForm/saveStepFormData",
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: "questionEditFormAndstepForm/saveCurrentStep",
        payload: "info",
      });
    }
  };

  useEffect(() => {
     if(question.ques_type=='1')
  {
   /* if(document.getElementById('quetion_type1'))
    {
     document.getElementById('quetion_type1').style.display = 'block';

    }*/
  //  console.log('hhhhhhhhhhhhhh');
    if(document.getElementById('quetion_type1'))
    {
       document.getElementById('quetion_type1').style.display = 'block';
    }

    if(document.getElementById('quetion_type2'))
    {
      document.getElementById('quetion_type2').style.display = 'none';
       
    }
  }

  else if (question.ques_type=='0')
  {
    //console.log('hggggggggggg');
    /*if(document.getElementById('quetion_type2'))
    {
     document.getElementById('quetion_type2').style.display = 'block';
     document.getElementById('quetion_type1').style.display = 'none';
    }*/
     if(document.getElementById('quetion_type1'))
    {
   
          document.getElementById('quetion_type1').style.display = 'none';
    }

    if(document.getElementById('quetion_type2'))
    {
      document.getElementById('quetion_type2').style.display = 'block';
       
    }
  }
    dispatch({
      type: "questionEditFormAndstepForm/fetch",
      
    });
  }, [1]);

 
  const onChangeradio = e => {
     // console.log('radio checked', e.target.value);
      setValue(e.target.value);
     //  console.log(e.target.value);
      if(e.target.value=='0')
      {
         // console.log( document.getElementById('quetion_type2'));
          document.getElementById('quetion_type2').style.display = 'block';
          document.getElementById('quetion_type1').style.display = 'none';
      }
      if(e.target.value=='1')
      {

          //document.getElementById('quetion_type2').classList.add('classdisplay_bolck_none');
         
          document.getElementById('quetion_type2').setAttribute('style', 'display:none !important'); 
          document.getElementById('quetion_type1').style.display = "block";
          //console.log( document.getElementById('quetion_type2'));
      }
  };

  const onValidateForm = async () => {
    let flag1=true;
    localStorage.removeItem('stepEditQues');
    const values = await validateFields();
    
    if(data.type == 'written'){
      values["media_files"] = fileList;
    }
    
    values["ans_options"] = data1;
    values['question_id'] = question_id;
   // console.log(values);
     if(values.ques_type=='1' && typeof values.tick_answer === "undefined")
      {
         message.error(formatMessage({ id: "settingstests.question..msg.selectItem" }));
         return false;
     }

         if (values.ques_type == 0) {
            if(data1.length == 0){
              flag = false;
              message.error(formatMessage({ id: "msg.step3.answer_msg" }));

            }
         
        //console.log(data1.length);
         
         if(data1.length){

          for (var i =data1.length - 1; i >= 0; i--) {
            if(Object.keys(data1[i]).length == 0){
              message.error(formatMessage({ id: "msg.step3.answer_msg" }));
              flag = false;
              return false;
            }

            if(data1[i].id == '' || (!('id' in data1[i]))){
              message.error(formatMessage({ id: "msg.step3.answer_msg" }));
              return false;
            }

            if(data1[i].answer == true ){
              flag1=false;
            }

          }
        }
        }
        if(flag1==true)
        {
          //  message.error(formatMessage({ id: "msg.step3.answer_msg" }));
          //  return false;
        }

     //return false;
    if (typeof values.measure1 === "undefined") {
      values['measure1']=question.measure.measure1;
    }
    if (typeof values.measure2 === "undefined") {
      values['measure2']=question.measure.measure2;
    }
    if (typeof values.measure3 === "undefined") {
      values['measure3']=question.measure.measure3;
    }
    if (typeof values.measure4 === "undefined") {
      values['measure4']=question.measure.measure4;
    }
    if (typeof values.measure1_maxscore === "undefined") {
      values['measure1_maxscore']=question.measure.measure1_maxscore;
    }
    if (typeof values.measure2_maxscore === "undefined") {
      values['measure2_maxscore']=question.measure.measure2_maxscore;
    }
    if (typeof values.measure3_maxscore === "undefined") {
      values['measure3_maxscore']=question.measure.measure3_maxscore;
    }
     if (typeof values.measure4_maxscore === "undefined") {
      values['measure4_maxscore']=question.measure.measure4_maxscore;
    }
    
    localStorage.setItem('written_quetions_list',JSON.stringify(values.ans_options));
    localStorage.setItem('media_quetions_list',JSON.stringify(values.media_files));
   // console.log(values);

    //return false;
    if (dispatch) {
      dispatch({
        type: "questionEditFormAndstepForm/saveStepFormData",
        payload: values,
      });
      dispatch({
        type: "questionEditFormAndstepForm/saveCurrentStep",
        payload: "result",
      });
    }
  };

  function onChangeRadio(e) {
    //console.log(`checked:${e.target.value}`);
  }

  var measure1 = question.measure.measure1;
  //console.log(measure1);
  var measure1_maxscore = question.measure.measure1_maxscore;

  var measure2 = question.measure.measure2;
  var measure2_maxscore = question.measure.measure2_maxscore;

  var measure3 = question.measure.measure3;
  var measure3_maxscore = question.measure.measure3_maxscore;

  var measure4 = question.measure.measure4;
  var measure4_maxscore = question.measure.measure4_maxscore;

  const [index, setIndex] = useState(0);
   
  if (!data) {
    return null;
  }

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || data1)?.filter((item) => item.key === key)[0];

  const newMember = () => {
  const newData = data1?.map((item) => ({ ...item })) || [];
   
   let flag = true;

    if(Object.keys(newData).length){
      for (var i = Object.keys(newData).length - 1; i >= 0; i--) {
        if(Object.keys(newData[i]).length == 0){
          message.error(formatMessage({ id: "msg.step3.answer_msg" }));
          flag = false;
          return false;
        }
        if(newData[i].id == '' || (!('id' in newData[i]))){
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
  };

  const remove = (key: string) => {
    const newData = data1?.filter(
      (item) => item.key !== key
    ) as TableFormDateType[];
    setData(newData);
    if (onChange) {
      onChangecheckbox(newData);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
  ) => {
   
    const newData = [...(data1 as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    
    if (target) {
     
      target[fieldName] = e.target.value;
      target['name'] = e.target.value;
      target['key'] = e.target.value;
      
      setData(newData);
    }
     window.new_Data = newData;
  };

  const handleCheckChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string
   ) => {
    
  const newData = [...(data1 as TableFormDateType[])];

  const target = getRowByKey(key, newData);
   
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
   
  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text: string, record: TableFormDateType) => {
        //console.log(record);
        if (record.editable) {
          return (
          <Row gutter={24}>   
            <Col span={6}> </Col>
            <Col span={12}> 
            <span>
              <Checkbox checked={record.answer}
                onChange={(e) => handleCheckChange(e, "answer", record.key)}
              
              />
              <Input
                placeholder="# of questions"
                onChange={(e) => handleFieldChange(e, "id", record.key)}
                style={{ width: "80%",marginLeft:8, marginRight:5 }}
                value={record.id}
              />
              <Popconfirm
                title="Confirm to to delete？"
                onConfirm={() => remove(record.key)}
              >
                <a className={styles.spanLeft}>Delete</a>
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
                style={{ width: "90%",marginLeft:10 }}
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
    if (data.type == 'written') {
      return (
        <>
          <Row gutter={24}>   
          <Col span={4}> </Col>
          <Col span={16}> 
          <Form.Item label="Test name" name="que_name" label={intl.formatMessage({
                              id: 'label.quetionName',
                              defaultMessage: 'Question name',
                              })}   rules={[{ required: true, message: <FormattedMessage id="msg.step2.queName_msg" /> }]}>
            <TextArea rows={4} placeholder="Question name" />
            
          </Form.Item>

          <Form.Item name="category_id" label={intl.formatMessage({
                              id: 'label.category_name',
                              defaultMessage: 'Question name',
                              })} rules={[{ required: true, message: <FormattedMessage id="msg.step2.testCategory_msg" /> }]}>
              <Select
                style={{ width: "100%" }}
              >
              {list?.map(item => (
                  
                  <Option value={item.id}>
                  {item.name}
                  </Option>
              ))}
              </Select>
          </Form.Item>


        
          <Divider/>
             <Form.Item label={intl.formatMessage({
                              id: 'label.que_type',
                              defaultMessage: 'Question Type',
                              })} name="ques_type" rules={[{ required: true, message: <FormattedMessage id="msg.step2.queType_msg" /> }]}>
             <Radio.Group defaultValue={question.ques_type} onChange={onChangeradio} >
                      <Radio value="0" ><FormattedMessage
                                    id="settingstests.questions.list.modal.multipleChoices"
                                    defaultMessage="Multiple choices"
                                  /></Radio>
                      <Radio value="1"> <FormattedMessage
                                    id="settingstests.questions.list.modal.trueOrFalse"
                                    defaultMessage="true or false"
                                  /></Radio>
               
              </Radio.Group>
            </Form.Item>

            <div id='quetion_type2' style={{ display: 'none' }}>

                   <Table<TableFormDateType>
                      columns={columns}
                      dataSource={data1}
                      pagination={false}
                      rowClassName={(record) => (record.editable ? styles.editable : "")}
                      className={styles.tableHead}
                   />

                    <Button
                      style={{width: "50%",
                      marginTop: 12,
                      marginBottom: 8,
                      marginLeft: 230
                      }} 
                      type="dashed"
                      onClick={newMember}
                     >
                        <PlusOutlined/>
                        Add More
                    </Button>

            </div>

            <div id='quetion_type1' style={{ display: 'none' }}>
                 
                 <Form.Item name="ans_boolean" label=<FormattedMessage
                                    id="lable.tick_answer"/>>
                
                    <Checkbox.Group style={{ width: "100%" }} onChangecheckbox={onChange}>
                      <Checkbox value="1">True</Checkbox>
                      <Checkbox value="0">False</Checkbox>
                    </Checkbox.Group>
              
              </Form.Item>

            </div>

          <Divider/>
          <Form.Item label={intl.formatMessage({
                              id: 'label.image',
                              defaultMessage: 'Image and videos',
                              })} name="media_files">
            <Upload
               action={API_URL+"/api/upload-avatar" }
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 10 && "+ Upload"}
            </Upload>

            <span className={styles.spanLeft}><FormattedMessage id="label.max10images" defaultMessage="(Max 10 images or 1 video)" /></span>
          </Form.Item>
          </Col>
            <Col span={6}> </Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12} className={styles.textCenteralign}>
              <Form.Item>
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
            </Col>
            <Col span={6}> </Col>
          </Row>
        </>
      );
    }
    if (data.type == 'physical') {
      return (
        <>
         <Row gutter={24}>   
            <Col span={4}> </Col>
            <Col span={16}> 
          <Form.Item name="que_name" label={intl.formatMessage({
                              id: 'label.quetionName',
                              defaultMessage: 'Question name',
                              })} rules={[{ required: true, message: <FormattedMessage id="msg.step2.queName_msg" /> }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category_id" label={intl.formatMessage({
                              id: 'label.category_name',
                              defaultMessage: 'Test Categories',
                              })} rules={[{ required: true, message: <FormattedMessage id="msg.step2.testCategory_msg" /> }]}>
                      <Select style={{ width: "100%" }} >
                          {list?.map(item => (
                              <Option value={item.id}>
                              {item.name}
                              </Option>
                          ))}
                      </Select>
        </Form.Item>

        <Form.Item name="score_operator" label={intl.formatMessage({
                              id: 'label.score_operator',
                              defaultMessage: 'Required scores',
                              })} >
                            <Select
                              defaultValue=">"
                              style={{ width: 80 }}
                              onChange={handleChange}
                            >
                              <Option value="<"> {"<"} </Option>
                              <Option value=">">{">"}</Option>

                              <Option value="=">{"="}</Option>
                            </Select>
          </Form.Item>

          <Form.Item name="score" label={intl.formatMessage({
                              id: 'label.score_operator',
                              defaultMessage: 'Required scores',
                              })}  rules={[{ required: true,pattern: new RegExp(/^[0-9]+$/), message: <FormattedMessage id="msg.step2.required_score_msg" /> }]}>
            <InputNumber min={0} max={100}  maxLength={5} step={1}  />
          </Form.Item>

          <Form.Item name="instruction" label={intl.formatMessage({
                              id: 'label.gradeinstruction',
                              defaultMessage: 'Grade Instruction',
                              })} >
            <TextArea placeholder="Enter Grade Instruction" />
          </Form.Item>
          </Col>
           <Col span={4}> </Col>
      </Row>
      

           <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12} className={styles.textCenteralign}>
              <Form.Item>
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
            </Col>
            <Col span={6}> </Col>
          </Row>
        </>
      );
    }
    if (data.type == 'practical') {
      return (
        <>
         <Row gutter={24}>   
            <Col span={4}> </Col>
            <Col span={16}> 
          <Form.Item name="que_name" label={intl.formatMessage({
                              id: 'label.quetionName',
                              defaultMessage: 'Question name',
                              })} rules={[{ required: true, message: <FormattedMessage id="msg.step2.queName_msg" /> }]}>
            <Input />
          </Form.Item>

          <Form.Item name="category_id" label={intl.formatMessage({
                              id: 'label.category_name',
                              defaultMessage: 'Test Categories',
                              })} rules={[{ required: true, message: <FormattedMessage id="msg.step2.testCategory_msg" /> }]}>
              <Select
                style={{ width: "100%" }}
              >
              {list?.map(item => (
                  
                  <Option value={item.id}>
                  {item.name}
                  </Option>
              ))}
              </Select>
          </Form.Item>

          <Form.Item name="measure1" label={intl.formatMessage({
                              id: 'label.measure1',
                              defaultMessage: 'Measure 1',
                              })}  >
            <Input style={{ width: "100%" }}  defaultValue={measure1}/>
          </Form.Item>

          <Form.Item name="measure1_maxscore" 
                     label={intl.formatMessage({
                                        id: 'label.measure1maxscore',
                                        defaultMessage: 'Measure 1 Max Score',
                                         })} 
                     
          >
            <Input
              style={{ width: "100%", marginLeft: 5 }}
              maxLength={5}
              placeholder="max score" defaultValue={measure1_maxscore}
            />
          </Form.Item>

          <Form.Item name="measure2"  label={intl.formatMessage({
                              id: 'label.Measure2',
                              defaultMessage: 'Measure 2',
                              })} >
            <Input style={{ width: "100%" }} defaultValue={measure2} />
          </Form.Item>

          <Form.Item name="measure2_maxscore" label={intl.formatMessage({
                              id: 'label.measure2_maxscore',
                              defaultMessage: 'Measure 2 Max Score',
                              })}  >
            <Input
              style={{ width: "100%", marginLeft: 5 }}
              placeholder="max score" defaultValue={measure2_maxscore}
            />
          </Form.Item>

          <Form.Item name="measure3"  label={intl.formatMessage({
                              id: 'label.Measure3',
                              defaultMessage: 'Measure 3',
                              })} >
            <Input style={{ width: "100%" }} defaultValue={measure3} />
          </Form.Item>
          <Form.Item name="measure3_maxscore" label={intl.formatMessage({
                              id: 'label.measure3_maxscore',
                              defaultMessage: 'Measure 3 Max Score',
                              })} >
              <Input 
              style={{ width: "100%", marginLeft: 5 }}
              placeholder="max score" defaultValue={measure3_maxscore}
            />
          </Form.Item>

          <Form.Item name="measure4"  label={intl.formatMessage({
                              id: 'label.Measure4',
                              defaultMessage: 'Measure 4',
                              })} >
            <Input style={{ width: "100%" }}  defaultValue={measure4}/>
          </Form.Item>

          <Form.Item name="measure4_maxscore" label={intl.formatMessage({
                              id: 'label.measure4_maxscore',
                              defaultMessage: 'Measure 4 Max Score',
                              })} >
            <Input
              style={{ width: "100%", marginLeft: 5 }}
              placeholder="max score" defaultValue={measure4_maxscore}
            />
          </Form.Item>

          <Form.Item name="instruction" label={intl.formatMessage({
                              id: 'settingstests.compliance.modal.gradeInstruction',
                              defaultMessage: 'Grade Instruction',
                              })}>
            <TextArea placeholder="Enter Grade Instruction" />
          </Form.Item>
           </Col>
            <Col span={6}> </Col>
          </Row>
      

          <Row gutter={24}>
            <Col span={6}> </Col>
            <Col span={12} className={styles.textCenteralign}>
              <Form.Item>
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
            </Col>
            <Col span={6}> </Col>
          </Row>
        </>
      );
    }
  };

     const delay = ms => new Promise(res => setTimeout(res, ms));
  async function timeSensativeAction(){ //must be async func
    await delay(3000);
  }
  
  return (
    <>
  { (timeSensativeAction() && question )?(
      <Form {...formItemLayout} form={form} initialValues={question}>
        {renderContent()}
      </Form>
    ):(
        <div>Loading...</div>
      ) }
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
    const { list } = questionEditFormAndstepForm;
    const { question } = questionEditFormAndstepForm;
    return {
      list,
      question,
      data: questionEditFormAndstepForm.step,
    };
  }
)(Step2);
