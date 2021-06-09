import React, { Component } from "react";

import { Input, Modal, Button, Card, Row, Col ,Divider} from "antd";
import { PageContainer , GridContent} from "@ant-design/pro-layout";
import { history } from "umi";
import { useIntl, FormattedMessage, Link } from "umi";
import styles from "./style.less";
interface SearchProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

class Search extends Component<SearchProps> {
  state = { visible: false };

  handleTabChange = (key: string) => {
    const { match } = this.props;
    const url = match.url === "/" ? "" : match.url;
    console.log(url);

    switch (key) {
      case "tests":
        history.push(`${url}/tests`);
        break;
      case "questions":
        history.push(`${url}/questions`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = (value: string) => {
    //    console.log(value);
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === "/" ? "" : match.path;
    const tabKey = location.pathname.replace(`${url}/`, "");
    if (tabKey && tabKey !== "/") {
      return tabKey;
    }
    return "tests";
  };

  setStep = async () => {
    localStorage.setItem("step", "first");
    window.location = "/settingstests/step-form";
  };

  setStepTest = async () => {
    localStorage.setItem("stepTest", "firstTest");
    window.location = "/settingstests/test-step-form";
  };

  render() {
    const tabList = [
      {
        key: "tests",
        tab: (
          <FormattedMessage
            id="settingstests.tab.tests"
            defaultMessage="Tests"
          />
        ),
      },
      {
        key: "questions",
        tab: (
          <FormattedMessage
            id="settingstests.tab.questions"
            defaultMessage="Questions"
          />
        ),
      },
    ];

    const viewModal = (
      <>
        {(() => {
          let login_type = localStorage.getItem("login_role");
          if (login_type == "admin") {
            return (
              <div className={styles.cardM}>
                <div className={styles.cardModal}>
                    <Button type="primary" onClick={() => this.setStepTest()}>
                      {<FormattedMessage
                        id="settingstests.tab.newtest"
                        defaultMessage="New Test"
                      />}
                    </Button>
                </div>
                <div className={styles.cardModal}>
                    <Button type="primary"  onClick={() => this.setStep()} >
                       <FormattedMessage
                        id="settingstests.tab.newquetion"
                        defaultMessage="New Quetions"
                      />
                    </Button>
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })()}
      </>
    );
    const { children } = this.props;
    return (
      <PageContainer
        content={viewModal}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
        title={<FormattedMessage
            id="settingstests.tab.main_title"
            defaultMessage=""
          />}
      >
       {children}
      </PageContainer>
    );
  }
}

export default Search;
