import React, { FC, useRef, useState, useEffect } from "react";
import {

  Modal,
  Progress,
  Divider,
  Tag,
  Drawer,
  message,
} from "antd";

import { findDOMNode } from "react-dom";
import { connect, Dispatch, FormattedMessage, Link, formatMessage } from "umi";
import OperationModal from "./OperationModal";
import { StateType } from "../model";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { queryRule , updateStatusAction} from "../service";
import ProDescriptions from "@ant-design/pro-descriptions";
import { testarr } from '@/utils/options';
import { statusArr } from '@/utils/options';

interface BasicListProps {
  settingstestsQuestions: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

export const BasicList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    settingstestsQuestions: { list },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] =
    useState<Partial<BasicListItemDataType> | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(false);
  const [row, setRow] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    dispatch({
      type: "settingstestsQuestions/fetch",
      payload: {
        count: 5,
      },
    });
  }, [1]);


    const updateStatus = async (id: string,status:string) => {
    try {
      let response = await updateStatusAction({
        id: id,
        status: status,
      });
      let result = await response;
      message.success(formatMessage({ id: "questions.message.updateStatus.success" }));
      if(result ){
        actionRef.current.reloadAndRest();
      }
      return true;
    } catch (error) {

      message.error(error);
      return false;
    }
  };

  const editAndDelete = (key: string, currentItem: BasicListItemDataType) => {
    if (key === "inactive") {
      Modal.confirm({
        content: ( formatMessage({ id: "settingsquestions.modal.deactive.msg" }) ),
        okText: ( formatMessage({ id: "settingstests.list.button.update" }) ),
        cancelText: ( formatMessage({ id: "settingstests.list.button.cancel" }) ),
        onOk: () => updateStatus(currentItem.id, 'inactive'),
      });
    }

    if (key === "active") {
      Modal.confirm({
        content: ( formatMessage({ id: "settingsquestions.modal.active.msg" }) ),
        okText: ( formatMessage({ id: "settingstests.list.button.update" }) ),
        cancelText: ( formatMessage({ id: "settingstests.list.button.cancel" })),
        onOk: () => updateStatus(currentItem.id, 'active'),
      });
    }
  };



  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    window.location.reload();
    setAddBtnblur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const setStepEditQuestion = async () => {
    localStorage.setItem("stepEditQues", "first");
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    const id = current ? current.id : "";
    setAddBtnblur();
    setDone(true);
    dispatch({
      type: "settingstestsQuestions/submit",
      payload: { id, ...values },
    });
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="settingstests.questions.questionName"
          defaultMessage=""
        />
      ),
      dataIndex: "que_name",
      hideInSearch: false,
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.questions.category"
          defaultMessage="Categories"
        />
      ),
      dataIndex: "category_name",
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.questions.questionType"
          defaultMessage="Question Type"
        />
      ),
      dataIndex: "type",
      hideInSearch: false,
      render: (type) => <Tag>{testarr[type]}</Tag>
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.questions.status"
          defaultMessage="Status"
        />
      ),
      dataIndex: "status",
      hideInSearch: true,
      render: (status) => <Tag>{statusArr[status]}</Tag>
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.questions.operation"
          defaultMessage="Operation"
        />
      ),
      dataIndex: "option",
      valueType: "option",
      render: (value, record) => {
        let login_type = localStorage.getItem("login_role");

        if (login_type == "user") {
          return (
            <Link
              to={
                "/settingstests/questionView?id=" +
                record.id +
                "&page_type=view"
              }
            >
              <FormattedMessage
                id="examiners.list.button.view"
                defaultMessage="view"
              />
            </Link>
          );
        }
        if (login_type == "admin") {
          if (record.status == "active") {
            return (
              <>
                <span>
                  <Link
                    to={
                      "/settingstests/questionView?id=" +
                      record.id +
                      "&page_type=view"
                    }
                  >
                    <FormattedMessage
                      id="students.list.button.view"
                      defaultMessage="View"
                    />
                  </Link>
                  <Divider type="vertical" />
                  <Link
                    to={
                      "/settingstests/step-form-edit?id=" +
                      record.id +
                      "&page_type=edit"
                    }
                  >
                    <FormattedMessage
                      id="students.list.button.edit"
                      defaultMessage="Edit"
                    />{" "}
                  </Link>
                  <Divider type="vertical" />
                  <Link
                    onClick={({ key }) => editAndDelete("inactive", record)}
                  >
                    <FormattedMessage
                      id="students.profile.inactive"
                      defaultMessage="Inactive"
                    />{" "}
                  </Link>
                </span>
              </>
            );
          }
          if (record.status == "inactive") {
            return (
              <>
                <span>
                  <Link
                    to={
                      "/settingstests/questionView?id=" +
                      record.id +
                      "&page_type=view"
                    }
                  >
                    <FormattedMessage
                      id="students.list.button.view"
                      defaultMessage="View"
                    />
                  </Link>

                  <Divider type="vertical" />
                  <a
                    src={
                      "/settingstests/step-form-edit?id=" +
                      record.id +
                      "&page_type=edit"
                    }
                  >
                    <FormattedMessage
                      id="students.list.button.edit"
                      defaultMessage="Edit"
                    />{" "}
                  </a>

                  <Divider type="vertical" />
                  <Link onClick={({ key }) => editAndDelete("active", record)}>
                    <FormattedMessage
                      id="students.profile.active"
                      defaultMessage="active"
                    />{" "}
                  </Link>
                </span>
              </>
            );
          }
        }
      },
    },
  ];

  return (
      <>
        <ProTable<TableListItem>
          rowKey="key"
          search={{
            labelWidth: "auto",
            collapsed,
          }}
          actionRef={actionRef}
          toolBarRender={() => [ ]}
          options={false}
          request={(params, sorter, filter) =>
            queryRule({ ...params, sorter, filter })
          }
          columns={columns}
        />

        <OperationModal
          done={done}
          current={current}
          visible={visible}
          onDone={handleDone}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />

        <Drawer
          width={600}
          visible={!!row}
          onClose={() => {
            setRow(undefined);
          }}
          closable={true}
        >
          {row?.que_name && (
            <ProDescriptions<TableListItem>
              column={2}
              title={row?.que_name}
              request={async () => ({
                data: row || {},
              })}
              params={{
                id: row?.que_name,
              }}
              columns={columns}
            />
          )}
        </Drawer>
     </>
  );
};

export default connect(
  ({
    settingstestsQuestions,
    loading,
  }: {
    settingstestsQuestions: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    settingstestsQuestions,
    loading: loading.models.settingstestsQuestions,
  })
)(BasicList);
