/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  DefaultFooter,
} from "@ant-design/pro-layout";
import React, { useEffect, useMemo, useRef } from "react";
import { Link, useIntl, connect, Dispatch, history,FormattedMessage } from "umi";
import { GithubOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import Authorized from "@/utils/Authorized";
import RightContent from "@/components/GlobalHeader/RightContent";
import { ConnectState } from "@/models/connect";
import { getMatchMenu } from "@umijs/route-utils";
import logo from "../assets/logo.svg";
import styles from "./style.less";
import { menuSelected, menuSelectedOver } from "./menuActive";

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

const onMouseOver = (path) => {
  menuSelectedOver(path);
};
const onMouseLeave = () => {
  menuSelected(window.location.pathname);
};

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps["route"] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in "location"]: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 北京微力方体育科技有限公司 | 京ICP备19004639号-2`}
    links={[
      {
        key: "Boxing Organization",
        title: <FormattedMessage id="defaultfooter.label" defaultMessage="" />,
        href: "#",
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: "/",
    },
  } = props;
  const menuDataRef = useRef<MenuDataItem[]>([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "user/fetchCurrent",
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: "global/changeLayoutCollapsed",
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || "/", menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname]
  );
  const { formatMessage } = useIntl();
  menuSelected(window.location.pathname);
  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push("/")}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          let login_type = localStorage.getItem("login_role");

          if (login_type == "user") {
            if (
              menuItemProps.path == "/accounts/tab" ||
              menuItemProps.path == "/transactions"
            ) {
            } else {
              return (
                <Link
                  to={menuItemProps.path}
                  onMouseOver={() => onMouseOver(menuItemProps.path)}
                  onMouseLeave={() => onMouseLeave()}
                >
                  <span className={styles.menuActiveTest}> {defaultDom} </span>
                </Link>
              );
            }
          } else {
            return (
              <Link
                to={menuItemProps.path}
                onMouseOver={() => onMouseOver(menuItemProps.path)}
                onMouseLeave={() => onMouseLeave()}
              >
                <span className={styles.menuActiveTest}> {defaultDom} </span>
              </Link>
            );
          }
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: "/",
            breadcrumbName: formatMessage({
              id: "menu.home",
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
