import React, { FC, useRef, useState, useEffect } from "react";
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
  Drawer,
  Tag,
  message,
} from "antd";

import { findDOMNode } from "react-dom";
import { connect, Dispatch, FormattedMessage, Link, formatMessage } from "umi";
import { statusArr } from '@/utils/options';
import OperationModal from "./OperationModal";
import { StateType } from "./model";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { queryRule, updateStatusAction } from "../service";
import ProDescriptions from "@ant-design/pro-descriptions";


interface BasicListProps {
  settingstestsTests: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

export const BasicList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    settingstestsTests: { list },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] =
    useState<Partial<BasicListItemDataType> | undefined>(undefined);
  const [row, setRow] = useState<TableListItem>();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    dispatch({
      type: "settingstestsTests/fetch",
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
      message.success(formatMessage({ id: "examiners.message.updateStatus.success" }));
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
    console.log(currentItem);

    if (key === "inactive") {
      Modal.confirm({
        content: ( formatMessage({ id: "settingstests.modal.deactive.msg" }) ),
        okText: ( formatMessage({ id: "settingstests.list.button.update" }) ),
        cancelText: ( formatMessage({ id: "settingstests.list.button.cancel" })

        ),
        onOk: () => updateStatus(currentItem.id, 'inactive'),
      });
    }

    if (key === "active") {
      Modal.confirm({
        content: ( formatMessage({ id: "settingstests.modal.active.msg" }) ),
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
      type: "settingstestsTests/submit",
      payload: { id, ...values },
    });
  };

  const setStepEditTest = async () => {
    localStorage.setItem("stepEditTest", "first");
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.testName"
          defaultMessage="Test Name"
        />
      ),
      dataIndex: "name",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "规则名称为必填项",
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },

    {
      title: (
        <FormattedMessage
          id="settingstests.tests.category"
          defaultMessage="Category"
        />
      ),
       hideInSearch: true,
      dataIndex: "category_name",
      hideInForm: true,
    },
    {
      title: (
        <FormattedMessage id="settingstests.tests.fees" defaultMessage="fees" />
      ),
      dataIndex: "fees",
      hideInForm: true,
       hideInSearch: true,
      render: (fees) => <span>￥ {fees} </span>,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.status"
          defaultMessage="Status"
        />
      ),
      dataIndex: "status",
      hideInForm: true,
       hideInSearch: true,
      render: (status) => <Tag>{statusArr[status]}</Tag>
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.sectionName"
          defaultMessage="Section Name"
        />
      ),
      dataIndex: "sections_name",
      hideInForm: true,
       hideInSearch: true,
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.written"
          defaultMessage="Written"
        />
      ),
      dataIndex: "written",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.physical"
          defaultMessage="Physical"
        />
      ),
      dataIndex: "physical",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.practical"
          defaultMessage="Practical"
        />
      ),
      dataIndex: "practical",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.physicalReqRate"
          defaultMessage="Physical Req Rate"
        />
      ),
      dataIndex: "physical_req_rate",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.practicalReqRate"
          defaultMessage="Practical Req Rate"
        />
      ),
      dataIndex: "practical_req_rate",
      hideInForm: true,
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="settingstests.tests.operation"
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
              to={"/settingstests/testView?id=" + record.id + "&page_type=view"}
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
                      "/settingstests/testView?id=" +
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
                      "/settingstests/test-step-form-edit?id=" +
                      record.id +
                      "&page_type=edit"
                    }
                    onClick={() => setStepEditTest()}
                  >
                    <FormattedMessage
                      id="students.list.button.edit"
                      defaultMessage="Edit"
                    />
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
                      "/settingstests/testView?id=" +
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
                      "/settingstests/test-step-form-edit?id=" +
                      record.id +
                      "&page_type=edit"
                    }
                    onClick={() => setStepEditTest()}
                  >
                    <FormattedMessage
                      id="students.list.button.edit"
                      defaultMessage="Edit"
                    />
                  </Link>
                  <Divider type="vertical" />
                  <Link onClick={({ key }) => editAndDelete("active", record)}>
                    <FormattedMessage
                      id="students.profile.active"
                      defaultMessage="Active"
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

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  return (

      <>
        <ProTable<TableListItem>
          rowKey="key"
          headerTitle={false}
          search={true}
          toolBarRender={() => [ ]}
          options={false}
          actionRef={actionRef}
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
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
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
    settingstestsTests,
    loading,
  }: {
    settingstestsTests: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    settingstestsTests,
    loading: loading.models.settingstestsTests,
  })
)(BasicList);
