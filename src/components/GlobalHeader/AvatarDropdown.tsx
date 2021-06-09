import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import React from "react";
import { history, ConnectProps, connect, FormattedMessage } from "umi";
import { ConnectState } from "@/models/connect";
import { CurrentUser } from "@/models/user";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;

    if (key === "logout") {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: "login/logout",
        });
      }

      return;
    }

    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const {
      currentUser = {
        avatar: "",
        name: "",
      },
      menu,
    } = this.props;

    /* const { menu } = this.props;

    const currentUser = {
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      name: "Serati Ma",
    };*/
    //console.log(currentUser);

    const menuHeaderDropdown = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
        {/* {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />} */}

        <Menu.Item key="logout">
          <LogoutOutlined />
          <FormattedMessage id="login.text.signout" defaultMessage="Sign Out" />
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {(() => {
            if (currentUser.avatar != null) {
              return (
                <>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src={currentUser.avatar}
                    alt="avatar"
                  />
                </>
              );
            } else {
              return (
                <>
                  <Avatar
                    size="small"
                    className={styles.avatar}
                    src="https://api-tc.glendot.com/default-avatar.jpg"
                    alt="avatar"
                  />
                </>
              );
            }
          })()}
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
