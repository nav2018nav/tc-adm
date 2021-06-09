import React, { Component } from "react";
import { FormattedMessage, Dispatch, connect } from "umi";
import { Menu,Card } from "antd";
import QuestionsView from "./components/questions";

import styles from "./style.less";

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
}

type SettingsStateKeys = "tests" | "questions";

class Settings extends Component<SettingsProps> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      tests: (
        <FormattedMessage id="settingstests.tab.tests" defaultMessage="Tests" />
      ),
      questions: (
        <FormattedMessage
          id="settingstests.tab.questions"
          defaultMessage="Questions"
        />
      ),
    };
    this.state = {
      mode: "inline",
      menuMap,
      selectKey: "questions",
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "settingstests/fetchCurrent",
    });
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: "inline" | "horizontal" = "inline";
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }
      this.setState({
        mode,
      });
    });
  };

  

  render() {
    return (
      
        <>
          <QuestionsView />;
        </>
      
    );
  }
}

export default connect(
  ({
    settingstestsQuestions,
  }: {
    settingstestsQuestions: { currentUser: CurrentUser };
  }) => ({
    currentUser: settingstestsQuestions.currentUser,
  })
)(Settings);
