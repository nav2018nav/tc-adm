import React, { FC, useRef, useState, useEffect } from "react";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Divider,
  Drawer,Descriptions,
  Image
} from "antd";


import { findDOMNode } from "react-dom";
import { PageContainer } from "@ant-design/pro-layout";
import { connect, Dispatch,history, FormattedMessage,formatMessage, useIntl, Link } from "umi";
import moment from "moment";
import { StateType } from "./model";
import { BasicListItemDataType } from "./data.d";
import styles from "./style.less";
import ProDescriptions from "@ant-design/pro-descriptions";
import { statusArr } from '@/utils/options';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface BasicListProps {
  questionView: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({
  data: { owner, createdAt, percent, status },
}: {
  data: BasicListItemDataType;
}) => (
  <div>
    <div>
      <span>Owner</span>
      <p>{owner}</p>
    </div>
    <div>
      <span>开始时间</span>
      <p>{moment(createdAt).format("YYYY-MM-DD HH:mm")}</p>
    </div>
    <div>
      <Progress
        percent={percent}
        status={status}
        strokeWidth={6}
        style={{ width: 180 }}
      />
    </div>
  </div>
);

export const BasicList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);

  const {
    loading,
    dispatch,
    questionList,
  } = props;

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<
    Partial<BasicListItemDataType> | undefined
  >(undefined);

  const [collapsed, setCollapsed] = useState(false);
  const [row, setRow] = useState<TableListItem>();

  function useQuery() {
         return new URLSearchParams(window.location.search);
  }

  let tid = useQuery().get('id');

  useEffect(() => {
    dispatch({
      type: "questionView/fetch",
      payload: {
        id:tid,
      },
    });
  }, [1]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const extraContent = (
    <div>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">等待中</RadioButton>
      </RadioGroup>
      <Search placeholder="请填写" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    const id = current ? current.id : "";

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: "questionView/submit",
      payload: { id, ...values },
    });
  };

  return (
    <PageContainer  onBack={() => history.push('/settingstests/tab/questions/')
 } title= <FormattedMessage
        id="questionView.heading"
        defaultMessage="Question Details" />>
    <div>
     <Card bordered={true}>      
              {(() => { 
                if(questionList?.type == 'written'){
                  return(
                    <>
                        <Row gutter={24}>    
                        
                           <Col span={24} className={styles.fontSizebold} >
                             <FormattedMessage
                              id="questionView.heading"
                              defaultMessage="Question Details" />
                           </Col>
                          <Divider/>
                          <Col span={3} >
                              <FormattedMessage
                                  id="questionView.list.quetionName"
                                  defaultMessage="Quetion Name"
                                /> 
                          </Col>
                          <Col span={21} >
                              {questionList?.que_name}
                          </Col>
                          <Divider/>

                          <Col span={3} >
                              <FormattedMessage
                                  id="questionView.list.category"
                                  defaultMessage="Category"
                                />
                          </Col>
                          <Col span={21} >
                              {questionList?.category_name}
                          </Col>
                          <Divider/>

                          <Col span={3} >
                             <FormattedMessage
                                  id="questionView.list.type"
                                  defaultMessage="Question Type"
                                />
                          </Col>
                          <Col span={21} >
                            {statusArr[questionList?.type]} 
                          </Col>

                          <Divider/>
                          {(() => {
                              if(questionList?.ques_type == '0'){
                                return(
                                    <>
                                 <Col span={3} >
                                       <FormattedMessage
                                        id="questionView.list.questionType"
                                        defaultMessage="Question Type"
                                      /> 
                                       </Col>
                                       <Col span={21} >
                                        : Multiple Choice
                                       </Col>
                                       <Divider/>
                                        {questionList?.ans_options?.map(ansOption => {
                                          if(ansOption.key){
                                            return(
                                             <>
                                              
                                               <Col span={3} >
                                                <FormattedMessage
                                                    id="questionView.list.quetions_list"
                                                    defaultMessage=""
                                                  />  
                                              </Col>
                                               <Col span={21} >  
                                                  {ansOption.id} 
                                               </Col>
                                              
                                              </>
                                            )
                                          }
                                        })} 
                                    </>
                                )
                              }else{
                                
                              }
                            })()}
                          

                           {(() => {
                              if(questionList?.ques_type == '0'){
                                return(
                                    <>
                                   
                                      
                                       <Divider/>
                                        {questionList?.ans_options?.map(ansOption => {
                                          if(ansOption.answer){
                                            return(
                                             <>
                                              
                                               <Col span={3} >
                                                <FormattedMessage
                                                    id="questionView.list.answer"
                                                    defaultMessage="Answer"
                                                  />  
                                              </Col>
                                             <Col span={21} >  
                                                {ansOption.id} 
                                             </Col>
                                              <Divider/>   
                                              </>
                                            )
                                          }
                                        })} 
                                    </>
                                )
                              }else{
                                return(
                                  <>
                                 
                                     <Col span={3} > <FormattedMessage
                                          id="questionView.list.questionType"
                                          defaultMessage="Question Type"
                                        />  :  </Col> 
                                    <Col span={21} >  True/False </Col>
                                    {(() => {

                                      if(questionList?.ans_boolean == '1'){
                                        return(
                                            <>
                                            <Divider/>
                                            <Col span={3} > <FormattedMessage
                                              id="questionView.list.answer"
                                              defaultMessage="Answer"
                                            />
                                         : </Col><Col span={21} >True </Col>
                                         <Divider/>
                                         </>

                                          )
                                      }else{
                                         return(
                                            <>
                                            <Divider/>
                                             <Col span={3} > <FormattedMessage
                                              id="questionView.list.answer"
                                              defaultMessage="Answer"
                                            /> : </Col><Col span={21} > False </Col>
                                            <Divider/>
                                            </>
                                          )
                                      }

                                    })()}
                                    
                                  </>
                                )
                              }
                            })()}
                            
                           
                          <Col span={24} >
                            {questionList?.media_files?.map(image => {
                              return(
                                <>
                                <span className={styles.marginRight10}>
                                  <Image src={image.response}  preview={true} height={100} width={100} className={styles.marginRight10}/>
                                  </span>
                                </>
                              )
                            })} 

                          </Col>
                        </Row>
                    </>
                  )
                }
              })()}

              {(() => { 
                if(questionList?.type == 'physical'){
                  return(
                    <>
                      <Row gutter={24}>
                      <Col span={24} className={styles.fontSizebold} >
                             <FormattedMessage
                              id="questionView.heading"
                              defaultMessage="Question Details" />
                           </Col>
                      <Divider/>
                      <Col span={3} >
                            <FormattedMessage
                                id="questionView.list.quetionName"
                                defaultMessage="Question Name"/>
                      </Col>
                       <Col span={21} >
                            {questionList?.que_name}
                      </Col>   
                      <Divider/>
                        <Col span={3} >
                            <FormattedMessage
                                  id="questionView.list.category"
                                  defaultMessage="Category"
                                /> 
                         </Col>
                          <Col span={21} >
                              {questionList?.category_name}
                          </Col>  
                           <Divider/>
                          <Col span={3} >
                            <FormattedMessage
                                  id="questionView.list.type"
                                  defaultMessage="Question Type"
                                />
                         </Col>
                          <Col span={21} >
                             {statusArr[questionList?.type]} 
                          </Col> 
                         <Divider/>
                          <Col span={3} >
                            <FormattedMessage
                                  id="questionView.list.requiredScore"
                                  defaultMessage="Required Score"
                                />  
                         </Col>
                          <Col span={21} >
                             {questionList?.score_operator} {questionList?.score}
                          </Col>   
                          <Divider/>
                           <Col span={3} >
                            <FormattedMessage
                                    id="questionView.list.gradeInstruction"
                                    defaultMessage="Grade Instruction"
                                  />
                          </Col>
                          <Col span={21} >
                              {questionList?.instruction}
                          </Col>
                        </Row>
                    </>
                  )
                }
              })()}

              {(() => { 
                if(questionList?.type == 'practical'){
                  return(
                    <>
                        <Row gutter={24}>    
                           <Col span={24} className={styles.fontSizebold} >
                             <FormattedMessage
                              id="questionView.heading"
                              defaultMessage="Question Details" />
                           </Col>
                          <Divider/>
                         
                          <Col span={3} >
                                <FormattedMessage
                                    id="questionView.list.quetionName"
                                    defaultMessage="Question Name"/>
                          </Col>
                           <Col span={21} >
                                {questionList?.que_name}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.category"
                                  defaultMessage="Category"
                                />
                          </Col>
                           <Col span={21} >
                                {questionList?.category_name}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.type"
                                  defaultMessage="Question Type"
                                />
                          </Col>
                           <Col span={21} >
                                {statusArr[questionList?.type]}
                          </Col>   
                          <Divider/>
                            <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.measure1"
                                  defaultMessage="Measure 1"
                                />
                          </Col>
                           <Col span={21} >
                                {questionList?.measure?.measure1}
                          </Col>   
                          
                          <Divider/>
                            <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.measure1MaxScore"
                                  defaultMessage="Measure 1 Max Score"
                                /> 
                          </Col>
                           <Col span={21} >
                                {questionList?.measure?.measure1_maxscore}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.measure2"
                                  defaultMessage="Measure 2"
                                /> 
                          </Col>
                           <Col span={21} >
                                {questionList?.measure?.measure2}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.measure2MaxScore"
                                  defaultMessage="Measure 2 Max Score"
                                />
                          </Col>
                           <Col span={21} >
                                {questionList?.measure?.measure2_maxscore}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.measure3"
                                  defaultMessage="Measure 3"
                                />
                          </Col>
                           <Col span={21} >
                                {questionList?.measure?.measure3}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                                <FormattedMessage
                                  id="questionView.list.measure3MaxScore"
                                  defaultMessage="Measure 3 Max Score"
                                />
                          </Col>
                           <Col span={21} >
                               {questionList?.measure?.measure3_maxscore}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                               <FormattedMessage
                                  id="questionView.list.measure4"
                                  defaultMessage="Measure 4"
                                />
                          </Col>
                           <Col span={21} >
                              {questionList?.measure?.measure4}
                          </Col>   
                          <Divider/>

                          <Col span={3} >
                              <FormattedMessage
                                  id="questionView.list.measure4MaxScore"
                                  defaultMessage="Measure 4 Max Score"
                                />
                          </Col>
                           <Col span={21} >
                              {questionList?.measure?.measure4_maxscore}
                          </Col>   
                          <Divider/>
                        </Row>
                    </>
                  )
                }
              })()}                  
      </Card>
    </div>
     </PageContainer>
  );
};

export default connect(

({
    questionView,
    loading,
  }: {
    questionView: {
    };
    loading: any;
  }) => {
    const { questionList } = questionView;
    return {
      questionList,
      loading: loading.models.questionView,
      
    };
  },
)(BasicList);