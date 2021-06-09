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
  Drawer,Descriptions
} from "antd";

import { findDOMNode } from "react-dom";
import { PageContainer } from "@ant-design/pro-layout";
import { connect, Dispatch, FormattedMessage,formatMessage, useIntl, Link, history } from "umi";
import moment from "moment";
import { StateType } from "./model";
import { BasicListItemDataType } from "./data.d";
import styles from "./style.less";
import ProDescriptions from "@ant-design/pro-descriptions";
import { statusArr } from '@/utils/options';
import { testarr } from '@/utils/options';
import { weekdays } from '@/utils/options';
import { weekfrequency } from '@/utils/options';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface BasicListProps {
  testView: StateType;
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
    testList,
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
      type: "testView/fetch",
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
      type: "testView/submit",
      payload: { id, ...values },
    });
  };
  return (
    
    <div>
    
      <PageContainer  onBack={() => history.push('/settingstests/tab/tests/')
 }  title={ <FormattedMessage
        id="testView.list.testdetail"
        defaultMessage="Test Details" />}>
                  <Card bordered={true} title={<FormattedMessage
                          id="testView.list.basicinfo"
                          defaultMessage="Basic Information"
                        />}className={styles.marginBottom15}>
                    <Descriptions  >
                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.testName"
                          defaultMessage="Test Name"
                        />}>  {testList?.name}</Descriptions.Item>
                      
                      <Descriptions.Item label=<FormattedMessage
                          id="testView.list.fees"
                          defaultMessage="Fees"
                        /> >  ¥ {testList?.fees}</Descriptions.Item>

                       <Descriptions.Item label=<FormattedMessage
                          id="testView.list.handling_charges"
                          defaultMessage="Fees"
                        /> >  ¥ {testList?.handling_charges}</Descriptions.Item>

                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.startDate"
                          defaultMessage="Start Date"
                        />}>  {testList?.start_date}</Descriptions.Item>

                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.startTime"
                          defaultMessage="Start Time"
                        />}>  {testList?.start_time}</Descriptions.Item>
                     
                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.registrationStartOn"
                          defaultMessage="Registration start before"
                        />}>  {testList?.registration_open_days} <FormattedMessage
                          id="testView.list.days"
                          defaultMessage="Days"
                        /> </Descriptions.Item>
                      
                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.registrationEndOn"
                          defaultMessage="Registration end before"
                        />}>  {testList?.registration_close_days} <FormattedMessage
                          id="testView.list.days"
                          defaultMessage="Days"
                        /> </Descriptions.Item>

                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.monthFrequency"
                          defaultMessage="Month Frequency"
                        />}>  {testList?.month}</Descriptions.Item>
                       
                      <Descriptions.Item label={<FormattedMessage
                          id="testView.list.weekFrequency"
                          defaultMessage="Week Frequency"
                        />}>  {weekfrequency[testList?.week]} </Descriptions.Item>
                       
                       <Descriptions.Item label={<FormattedMessage
                          id="testView.list.dayFrequency"
                          defaultMessage="Day Frequency"
                        />}> {weekdays[testList?.day]}</Descriptions.Item>

                    </Descriptions>

                     </Card>
                    {testList?.sections?.map(item => (
                      <> <br/>
                        <Card bordered={true} title={testarr[item]} className={styles.marginBottom15}>  
                        <Descriptions>
                            {(() => { 
                              if(item == 'written'){
                                  return(
                                    <>
                                    <Card bordered={true}>
                                    <Row gutter={24}>    
                                       <Col span={24} >
                                       <p> <FormattedMessage
                                            id="testView.list.testLength"
                                            defaultMessage="Test Length IN minutes"
                                          /> 
                                        : {testList?.testLength} 
                                        </p>
                                        <p> <FormattedMessage
                                            id="testView.list.noofquetions"
                                            defaultMessage=" No Of Quetions Ask"
                                          /> 
                                          : {testList?.noofquestions} 
                                        </p>
                                       
                                        <p> <FormattedMessage
                                            id="testView.list.requiredCompliancesRate"
                                            defaultMessage="Required compliances rate"
                                          />
                                         : {testList?.requiredcompliancesrate} %
                                        </p>
                                          <p> <FormattedMessage
                                            id="step2.listlabelque.creditpoints"
                                            defaultMessage="step2.listlabelque.creditpoints"
                                          />
                                         : {testList?.written_credit} %
                                        </p>
                                      </Col>
                                    </Row>
                                  </Card>
                                  </>  
                                  )
                                }

                                if(item == 'physical'){
                                  return(
                                    <>
                                    <Card bordered={true}>
                                      <Row gutter={24}>    
                                        <Col span={24} >
                                          {testList?.physicals?.map(itemphysical => (
                                            <p> 
                                              <FormattedMessage
                                                id="testView.list.quetions"
                                                defaultMessage="Quetions"
                                              /> : {itemphysical?.que_name} 
                                            </p>

                                          ))} 
                                          <p><FormattedMessage
                                            id="testView.list.requiredCompliancesRate"
                                            defaultMessage="Required compliances rate"
                                          /> : {testList?.physical_req_rate} %
                                          </p>
                                           <p> <FormattedMessage
                                            id="step2.listlabelque.creditpoints"
                                            defaultMessage="step2.listlabelque.creditpoints"
                                          />
                                         : {testList?.physical_credit} %
                                        </p>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </>
                                  )
                                }
                                 if(item == 'practical'){
                                  return(
                                    <>

                                    <Card bordered={true}>
                                      <Row gutter={24}>    
                                        <Col span={24} >
                                          {testList?.practicals?.map(itempractical => (
                                            <p> <FormattedMessage
                                            id="testView.list.quetions"
                                            defaultMessage="Quetions"
                                          />  : {itempractical?.que_name} 
                                            </p>

                                          ))} 
                                          <p><FormattedMessage
                                            id="testView.list.requiredCompliancesRate"
                                            defaultMessage="Required compliances rate"
                                          /> : {testList?.practical_req_rate} %
                                          </p>
                                           <p> <FormattedMessage
                                            id="step2.listlabelque.creditpoints"
                                            defaultMessage="step2.listlabelque.creditpoints"
                                          />
                                         : {testList?.racticle_credit} %
                                        </p>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </>
                                  )
                                }

                            })()}
                       </Descriptions>
                       </Card>
                       </>
                    ))}
                   
                </PageContainer>
     
    </div>
    
  );
};

export default connect(

({
    testView,
    loading,
  }: {
    testView: {
    };
    loading: any;
  }) => {
    const { testList } = testView;
    return {
      testList,
      loading: loading.models.testView,
      
    };
  },
)(BasicList);