import React, { FC, useEffect } from 'react';
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
  const intl = useIntl();
  const { list } = props;
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: "settingstestsTests/fetch",
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

  const onDone1 = () =>{
    //console.log("done");
    window.location.reload();
  }

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: 
            <FormattedMessage 
            id="settingstests.tests.button.ok" 
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
            id="settingstests.tests.success.title" 
            defaultMessage="Successful operation" 
            />
          subTitle=<FormattedMessage 
            id="settingstests.tests.success.subTitle" 
            defaultMessage="Successfully submited data" 
            />
          extra={
            <Button type="primary" onClick={onDone1}>
              <FormattedMessage 
            id="settingstests.tests.success.button.done" 
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
          name="name"
          label=
            <FormattedMessage 
            id="settingstests.tests.testName" 
            defaultMessage="Test Name" 
            />
          rules={[{ required: true, message: <FormattedMessage 
            id="settingstests.tests.validate.testName" 
            defaultMessage="Please enter testname" 
            /> }]}
        >
          <Input placeholder={intl.formatMessage({
              id: 'settingstests.tests.placeholder.testName',
              defaultMessage: 'Please enter testname',
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

      </Form>
    );
  };

  return (
    <Modal
      title=<FormattedMessage 
            id="settingstests.tests.title" 
            defaultMessage="Test" 
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
    settingstestsTests,
    loading,
  }: {
    settingstestsTests: {};
    loading: any;
  }) => {
    const { list } = settingstestsTests;
    return {
      list
    };
  }
)(OperationModal);
