import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import menus from "./config";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

interface MenuModel {
  text: string;
  path?: string;
  type?: string;
  children?: MenuModel[];
}

type State = {
  menus: MenuModel[];
  defaultOpenKeys: string[];
  selectedKeys: string[];
  pageHeaders: string[];
};

@(withRouter as any)
export default class MenuLayout extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      defaultOpenKeys: [],
      selectedKeys: [],
      pageHeaders: [],
      menus
    };
  }

  componentDidMount(): void {
    const { defaultOpenKeys } = this.state;
    this.state.menus.forEach((_item, index) => {
      defaultOpenKeys.push(`${index}`);
    });
    this.setState({
      defaultOpenKeys
    });
    this.setSelectedKeys(this.props);
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<any>,
    nextContext: any
  ): void {
    this.setSelectedKeys(nextProps);
  }

  setSelectedKeys(props: any) {
    const { menus } = this.state;
    let pathName = props.location.pathname;
    let selectedKey = "";
    menus.forEach((item, index) => {
      if (item.path === pathName) {
        selectedKey = `${index}`;
      } else if (item.children) {
        item.children.forEach((child, childIndex) => {
          if (child.path === pathName) {
            selectedKey = MenuLayout.getSubKeyByIndexAndChildIndex(
              index,
              childIndex
            );
          }
        });
      }
    });
    const pageHeaders: any = this.getPageHeaders(menus, pathName);
    console.log(pageHeaders);
    this.setState({
      selectedKeys: [selectedKey],
      pageHeaders: Array.isArray(pageHeaders) ? pageHeaders : []
    });
  }

  getPageHeaders = (menus: any, pathName: any, pageHeaders: any = []) => {
    for (let i = 0; i < menus.length; i++) {
      let item = menus[i];
      if (~pathName.indexOf(item.path)) {
        pageHeaders = [
          ...pageHeaders,
          {
            path: item.path,
            text: item.text
          }
        ];
        return pageHeaders;
      } else if (item.children) {
        const result: any = this.getPageHeaders(item.children, pathName, [
          ...pageHeaders,
          {
            path: item.path,
            text: item.text
          }
        ]);
        if (result !== true) {
          return result;
        }
      }
    }
    return true;
  };

  itemRender(curRoute: any, headers: any) {
    const first = headers[0].text === curRoute.text;
    const last = headers[headers.length - 1].text === curRoute.text;
    if (headers.length === 0) {
      return null;
    }
    return first || last ? (
      <span
        style={{
          color: last ? "#1890ff" : ""
        }}
      >
        {curRoute.text}
      </span>
    ) : (
      <Link to={curRoute.path}>{curRoute.text}</Link>
    );
  }

  render() {
    const { menus, defaultOpenKeys, selectedKeys, pageHeaders } = this.state;
    return (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <div className="logo" style={{ color: "#fff" }} />
          <Menu
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={selectedKeys}
            theme="dark"
            mode="inline"
          >
            {menus.map((menu, index) =>
              menu.children
                ? this.renderSubMenu(menu, index)
                : this.renderMenuItem(menu, index)
            )}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, minHeight: "100vh" }}>
          <Header
            style={{
              background: "#fff",
              padding: 0,
              position: "fixed",
              top: 0,
              left: 200,
              right: 0,
              zIndex: 999
            }}
          >
            <Breadcrumb
              style={{ height: 64, lineHeight: "64px", paddingLeft: 16 }}
            >
              {pageHeaders.map((item, index) => (
                <Breadcrumb.Item key={item}>
                  {this.itemRender(item, pageHeaders)}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </Header>
          <Content
            style={{
              margin: "88px 16px 0",
              overflow: "initial",
              minHeight: "calc(100% - 160px)"
            }}
          >
            <div
              style={{
                padding: 24,
                background: "#fff",
                zIndex: 100,
                minHeight: "100%"
              }}
            >
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>浙北到家</Footer>
        </Layout>
      </Layout>
    );
  }

  renderSubMenu(menu: MenuModel, index: number) {
    return (
      <SubMenu
        key={`${index}`}
        title={
          <span>
            <Icon theme="filled" type={menu.type} />
            <span>{menu.text}</span>
          </span>
        }
      >
        {menu.children &&
          menu.children.map((child: MenuModel, childIndex: number) => (
            <Menu.Item
              onClick={this.onClickMenuItem.bind(this, child.path)}
              key={MenuLayout.getSubKeyByIndexAndChildIndex(index, childIndex)}
            >
              {child.text}
            </Menu.Item>
          ))}
      </SubMenu>
    );
  }

  private renderMenuItem(menu: MenuModel, index: number) {
    return (
      <Menu.Item key={`${index}`}>
        <Icon type={menu.type} />
        <span className="nav-text">{menu.text}</span>
      </Menu.Item>
    );
  }

  onClickMenuItem(path: any) {
    this.props.history.push(path);
  }

  static getSubKeyByIndexAndChildIndex(index: number, childIndex: number) {
    return `sub-${index}-${childIndex}`;
  }
}
