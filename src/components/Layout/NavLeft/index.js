import React, {Component, Fragment} from 'react';
import {Layout} from 'antd';
import {Link, withRouter} from "react-router-dom";
import routers from '../../../routes/config';
import SiderMenu from './SiderMenu';

const {Sider} = Layout;

class NavLeft extends Component {
    state = {
        openKey: '',
        selectedKey: '',
        mode: 'inline',
        firstHide: false, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        theme: 'dark',
        collapsed: false,
    }
    //替换componentWillReceiveProps
    static getDerivedStateFromProps(props, state) {
        // console.log('props');
        // console.log(props);
        // console.log('state');
        // console.log(state);
        if (props.collapsed !== state.collapsed) {
            const state1 = NavLeft.setMenuOpen(props);
            const state2 = NavLeft.onCollapse(props.collapsed);
            console.log(props.collapsed !== state.collapsed)
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            }
        }
        return null;
    }

    static onCollapse = (collapsed) => {
        return {
            collapsed,
           // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };
    componentDidMount() {
        // withRouter带来的props
        const state = NavLeft.setMenuOpen(this.props);
        setTimeout(() => {
            this.setState(state);
        }, 0)
    }
    static setMenuOpen = props => {
        const {pathname} = props.location;
        // console.log(pathname)
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname,
        }
    }
    menuClick = e => {
        //首页之类没有children,不是由SubMenu组成的菜单，单独处理
        let firstHide;
        e.keyPath.length===1? firstHide=true:firstHide=false;
        this.setState({selectedKey: e.key,firstHide:firstHide});
    }
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    }

    render() {
        return (
            <Fragment>
                <Sider trigger={null}
                       breakpoint='lg'
                       collapsed={this.props.collapsed}
                       style={{ overflowY: 'auto' }}
                >
                    <div className="logo">
                        <Link id="logo" to="/index">
                            <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" title='admin'/>
                            {
                                this.state.collapsed?null: <img src="../../images/logo.svg" alt="" className='svg-logo'/>
                            }
                        </Link>
                    </div>
                    <SiderMenu
                        mode='inline'
                        theme='dark'
                        onClick={this.menuClick}
                        menus={routers.menus}
                        selectedKeys={[this.state.selectedKey]}
                        openKeys={this.state.firstHide ? null : [this.state.openKey]}
                        onOpenChange={this.openMenu}
                        defaultOpenKeys={[this.state.openKey]}
                        defaultSelectedKeys={[this.state.selectedKey]}
                    />
                </Sider>
            </Fragment>
        )
    }
}

export default withRouter(NavLeft);