import {
  DefaultFooter,
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from "@ant-design/pro-layout";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Link,
  SelectLang,
  useIntl,
  ConnectProps,
  connect,
  FormattedMessage,
} from "umi";
import React from "react";
import { ConnectState } from "@/models/connect";
import logo from "../assets/logo.svg";
import styles from "./UserLayout.less";

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: "",
    },
  } = props;
  const currentyear = new Date().getFullYear();
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="#">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>
                  <FormattedMessage
                    id="login.text.lbl.testcenter"
                    defaultMessage="Test Center"
                  />{" "}
                </span>
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
          <br />
          <p className={styles.txtcenter}> <FormattedMessage id="login.bylogintext.msg" defaultMessage="By login to this site, you agree" /></p>
          <p className={styles.txtcenter}>
            <a href="../others/termsOfUse">
              <FormattedMessage
                id="login.msg.termofuse"
                defaultMessage="Terms of use"
              />{" "}
            </a>
            <FormattedMessage id="login.text.msg" defaultMessage="and" />{" "}
            <a href="../others/privacyPolicy">
              <FormattedMessage
                id="login.msg.Privacypolicy"
                defaultMessage="Privacy policy"
              />{" "}
            </a>{" "}
            <FormattedMessage id="login.text.msg" defaultMessage="and" />{" "}
             <a href="../others/risk">
              <FormattedMessage
                id="login.msg.risk"
                defaultMessage="Risk"
              />{" "}
            </a>{" "}
          </p>
        </div>
        <div className={styles.txtcenter}>
          <p><FormattedMessage  id="login.msg.Copyright" defaultMessage="Copyright"/> © {currentyear} 北京微力方体育科技有限公司<br/>京ICP备19004639号-2</p>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(
  UserLayout
);
