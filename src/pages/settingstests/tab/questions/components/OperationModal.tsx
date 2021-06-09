import React, { FC, useRef, useState, useEffect } from "react";
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import { BasicListItemDataType } from '../data.d';
import styles from '../style.less';
import { useIntl,FormattedMessage,connect,Dispatch } from 'umi';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
}

const { TextArea } = Input;
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  const { list } = props;
  const { dispatch } = props;


  const intl = useIntl();

  const onDone1 = () =>{
    //console.log("done");
    window.location.reload();
  }

  useEffect(() => {
    dispatch({
      type: "settingstestsQuestions/fetch",
      // payload: {
      //   count: 5,
      // },
    });
  }, [1]);

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as BasicListItemDataType);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: 
            <FormattedMessage 
            id="settingstests.questions.button.ok" 
            defaultMessage="Ok" 
            />, 
            onOk: handleSubmit, 
            onCancel 
      };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title=<FormattedMessage 
            id="settingstests.questions.success.title" 
            defaultMessage="Successful operation" 
            />
          subTitle=<FormattedMessage 
            id="settingstests.questions.success.subTitle" 
            defaultMessage="Successfully submited data" 
            />
          extra={
            <Button type="primary" onClick={onDone1}>
              <FormattedMessage 
            id="settingstests.questions.success.button.done" 
            defaultMessage="Done" 
            />
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="que_name"
          label=
            <FormattedMessage 
            id="settingstests.questions.questionName" 
            defaultMessage="Question Name" 
            />
          rules={[{ required: true, message: <FormattedMessage 
            id="settingstests.questions.validate.questionName" 
            defaultMessage="Please enter question name" 
            /> }]}
        >
          <Input placeholder={intl.formatMessage({
              id: 'settingstests.questions.placeholder.questionName',
              defaultMessage: 'Please enter question name',
            })} />
        </Form.Item>
        
        <Form.Item name="category_id" label="Test Categories">

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

        <Form.Item
          name="type"
          label=
            <FormattedMessage 
            id="settingstests.questions.questionType" 
            defaultMessage="Question Type" 
            />
          rules={[{ required: true, message: <FormattedMessage 
            id="settingstests.questions.validate.questionType" 
            defaultMessage="Please enter question type" 
            /> }]}
        >
          <Select placeholder=<FormattedMessage 
            id="settingstests.questions.placeholder.questionType" 
            defaultMessage="Please enter question type" 
            />>
            <Select.Option value="test44">test44</Select.Option>
            <Select.Option value="1">test55</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title=<FormattedMessage 
            id="settingstests.questions.title" 
            defaultMessage="Questions" 
            />
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};


export default connect(
  ({
    settingstestsQuestions,
    loading,
  }: {
    settingstestsQuestions: {};
    loading: any;
  }) => {
    const { list } = settingstestsQuestions;
    return {
      list
    };
  }
)(OperationModal);
