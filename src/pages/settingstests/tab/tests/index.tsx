import React, { Component } from "react";

import { FormattedMessage, Dispatch, connect } from "umi";
import { Menu } from "antd";
import TestsView from "./components/tests";


const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
}

type SettingsStateKeys = "tests" | "questions";
interface SettingsState {
  mode: "inline" | "horizontal";
  menuMap: {
    [key: string]: React.ReactNode;
  };
  selectKey: SettingsStateKeys;
}

class Settings extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);
    const menuMap = {
      tests: (
        <FormattedMessage id="accounts.tab.tests" defaultMessage="tests" />
      ),
      questions: (
        <FormattedMessage
          id="accounts.tab.questions"
          defaultMessage="Questions"
        />
      ),
    };
    this.state = {
      mode: "inline",
      menuMap,
      selectKey: "tests",
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
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
          <TestsView />
      </>

    );
  }
}

export default connect(
  ({
    settingstestsTests,
  }: {
    settingstestsTests: { currentUser: CurrentUser };
  }) => ({
    currentUser: settingstestsTests.currentUser,
  })
)(Settings);
