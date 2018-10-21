import React from 'react'
import { connect } from 'react-redux'
import { Menu, Layout, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { reduce } from 'lodash'
import { setLayoutState } from 'ducks/app'
import { Scrollbars } from 'react-custom-scrollbars'
import { default as menuData } from './menuData'
import Avatar from 'components/CleanComponents/Avatar'
import { logout } from 'ducks/app'
import './style.scss'

const { Sider } = Layout
const SubMenu = Menu.SubMenu
const Divider = Menu.Divider

const mapStateToProps = ({ app, routing }, props) => {
  const { layoutState } = app
  return {
    pathname: routing.location.pathname,
    collapsed: layoutState.menuCollapsed,
    theme: layoutState.themeLight ? 'light' : 'dark',
    settingsOpened: layoutState.settingsOpened,
  }
}

const mapDispatchToProps = dispatch => ({
  logout: event => {
    event.preventDefault()
    dispatch(logout())
  },
})

@connect(mapStateToProps, mapDispatchToProps)

@withRouter
class MenuLeft extends React.Component {
  state = {
    pathname: this.props.pathname,
    collapsed: this.props.collapsed,
    theme: this.props.theme,
    selectedKeys: '',
    openKeys: [''],
    settingsOpened: this.props.settingsOpened,
  }

  handleClick = e => {
    const { dispatch, isMobile } = this.props
    if (isMobile) {
      // collapse menu on isMobile state
      dispatch(setLayoutState({ menuMobileOpened: false }))
    }
    if (e.key === 'settings') {
      // prevent click and toggle settings block on theme settings link
      dispatch(setLayoutState({ settingsOpened: !this.state.settingsOpened }))
      return
    }
    // set current selected keys
    this.setState({
      selectedKeys: e.key,
    })
  }

  onOpenChange = openKeys => {
    this.setState({
      openKeys: openKeys,
    })
  }

  getPath(data, id, parents = []) {
    const { selectedKeys } = this.state
    let items = reduce(
      data,
      (result, entry) => {
        if (result.length) {
          return result
        } else if (entry.url === id && selectedKeys === '') {
          return [entry].concat(parents)
        } else if (entry.key === id && selectedKeys !== '') {
          return [entry].concat(parents)
        } else if (entry.children) {
          let nested = this.getPath(entry.children, id, [entry].concat(parents))
          return nested ? nested : result
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : false
  }

  getActiveMenuItem = (props, items) => {
    const { selectedKeys, pathname } = this.state
    let { collapsed } = props
    let [activeMenuItem, ...path] = this.getPath(items, !selectedKeys ? pathname : selectedKeys)

    if (collapsed) {
      path = ['']
    }

    this.setState({
      selectedKeys: activeMenuItem ? activeMenuItem.key : '',
      openKeys: activeMenuItem ? path.map(entry => entry.key) : [],
      collapsed,
    })
  }

  generateMenuPartitions(items) {
    return items.map(menuItem => {
      if (menuItem.children) {
        let subMenuTitle = (
          <span className="menuLeft__title-wrap" key={menuItem.key}>
            <span className="menuLeft__item-title">{menuItem.title}</span>
            {menuItem.icon && <span className={menuItem.icon + ' menuLeft__icon'} />}
          </span>
        )
        return (
          <SubMenu title={subMenuTitle} key={menuItem.key}>
            {this.generateMenuPartitions(menuItem.children)}
          </SubMenu>
        )
      }
      return this.generateMenuItem(menuItem)
    })
  }

  generateMenuItem(item) {
    const { key, title, url, icon, disabled } = item
    const { dispatch } = this.props
    return item.divider ? (
      <Divider key={Math.random()} />
    ) : item.url ? (
      <Menu.Item key={key} disabled={disabled}>
        <Link
          to={url}
          onClick={
            this.props.isMobile
              ? () => {
                  dispatch(setLayoutState({ menuCollapsed: false }))
                }
              : undefined
          }
        >
          <span className="menuLeft__item-title">{title}</span>
          {icon && <span className={icon + ' menuLeft__icon'} />}
        </Link>
      </Menu.Item>
    ) : (
      <Menu.Item key={key} disabled={disabled}>
        <span className="menuLeft__item-title">{title}</span>
        {icon && <span className={icon + ' menuLeft__icon'} />}
      </Menu.Item>
    )
  }

  onCollapse = (value, type) => {
    const { dispatch } = this.props
    const { collapsed } = this.state
    if (type === 'responsive' && collapsed) {
      return
    }
    dispatch(setLayoutState({ menuCollapsed: !collapsed }))
  }

  componentDidMount() {
    this.getActiveMenuItem(this.props, menuData)
  }

  componentWillReceiveProps(newProps) {
    this.setState(
      {
        selectedKeys: '',
        pathname: newProps.pathname,
        theme: newProps.theme,
        settingsOpened: newProps.settingsOpened,
      },
      () => {
        if (!newProps.isMobile) {
          this.getActiveMenuItem(newProps, menuData)
        }
      },
    )
  }

  render() {
    const { logout } = this.props
    const { collapsed, selectedKeys, openKeys, theme } = this.state
    const { isMobile } = this.props
    const menuItems = this.generateMenuPartitions(menuData)
    const paramsMobile = {
      width: 256,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse,
    }
    const paramsDesktop = {
      width: 256,
      collapsible: true,
      collapsed: collapsed,
      onCollapse: this.onCollapse,
      breakpoint: 'lg',
    }
    const params = isMobile ? paramsMobile : paramsDesktop
    return (
      <Sider {...params} className="menuLeft">
        <div className="menuLeft__logo">
          {params.collapsed ? (
            <div className="menuLeft__logoContainer menuLeft__logoContainer--collapsed">
              <img src="resources/images/logo-inverse-mobile.png" alt="" />
            </div>
          ) : (
            <div className="menuLeft__logoContainer">
              <center><img src="resources/images/logo-inverse.png" alt="" style={{width:150}}/></center>
            </div>
          )}
        </div>
        {params.collapsed ? (
          <div/>)
          :(
            <div style={{textAlign:'center',marginTop:20}}>
            {/* <Avatar src={user.avatar} size="90" borderColor="white" border={true} /> */}
            <Avatar src="https://media1.s-nbcnews.com/j/newscms/2017_07/1195637/man-bangs-justin-bieber-today-170215_79fc3dae5e72e92dac91a9fc277ed1b4.fit-760w.jpg" size="90" borderColor="white" />
            <br />
            <strong>Jammy_white@aol.com</strong>
            <br />
            <span className="text-muted">Jammy White</span>
        </div>
          )}
        <Scrollbars
          autoHide
          style={{ height: isMobile ? 'calc(100vh - 64px)' : 'calc(100vh - 112px)' }}
        >
          <Menu
            theme={theme}
            onClick={this.handleClick}
            selectedKeys={[selectedKeys]}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            className="menuLeft__navigation"
          >
            {/* <Menu.Item key={'settings'}>
              <span className="menuLeft__item-title">Theme Settings</span>
              <span
                className={'icmn icmn-cog menuLeft__icon utils__spin-delayed--pseudo-selector'}
              />
            </Menu.Item> */}
            {menuItems}
          </Menu>
          
        </Scrollbars>
        <div style={{position:'absolute',bottom:30,padding:30,alignItems:'center',justifyContent:'center'}}>

        <a href="javascript: void(0);" onClick={logout}>
            <span className={'icmn icmn-exit'} style={{color:'#fff'}}/>
            <span style={{color:'#fff',marginLeft:50}}>SignOut</span>
        </a>
           
        </div>
      </Sider>
    )
  }
}

export { MenuLeft, menuData }
