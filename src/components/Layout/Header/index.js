import React,{Component} from 'react';
import { Menu, Icon, Layout, Badge, Popover} from 'antd';
import screenfull from 'screenfull';
import {PwaInstaller} from '../../widget';
import {connect} from "react-redux";
import * as actionCreators from "../../../pages/login/store/actionCreators";
import NavLeft from '../NavLeft'
import {Redirect} from "react-router-dom";
const {Header}=Layout;
const SubMenu=Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MHeader extends Component{
    state = {
        current: 'mail',
        user:{},
        isMobile:true
    }
    menuClick = (e) => {
        //console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    screenFull=()=>{
        if(screenfull.enabled){
            screenfull.toggle()
        }
    }
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    logout=()=>{
        sessionStorage.removeItem("userInfo");
        this.props.logout('admin')
    }
    requireLogin=()=>{
        return <Redirect to={'/login'} />
    }
    componentWillMount() {
        if(!this.props.userInfo){
            this.requireLogin()
        }
    }

    componentDidMount() {
        // const userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
        //判断是否页面有被人为刷新，将导致redux store清空，需要从缓存中恢复store
       // if(this.props.user.size===0&&userInfo){
       //
       // }
        //我这里用size===0 是因为我的redux数据都用了immutable data
        // if(this.props.userInfo.size === 0 && userInfo) {
        //     this.props.userInfo(userInfo)
        // }
        // const Token=sessionStorage.getItem('Token');

        // console.log(userInfo)
        // this.setState({
        //     user:userInfo
        // })

    }

    render() {
        const {userInfo,path}=this.props;

        return (
            <Header className='custom-theme header'>
                {
                    this.props.isMobile? <Popover content={<NavLeft path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                        <Icon type="bars" className="header__trigger custom-trigger" />
                    </Popover>:(<Icon
                    className="header__trigger custom-trigger"
                    type={this.props.collapsed?'menu-unfold':'menu-fold'}
                    onClick={this.props.toggle}
                    />)
                }
                {/*<Icon*/}
                    {/*className="header__trigger custom-trigger"*/}
                    {/*type={this.props.collapsed?'menu-unfold':'menu-fold'}*/}
                    {/*onClick={this.props.toggle}*/}
                {/*/>*/}
                <Menu
                    onClick={this.menuClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ lineHeight: '73px', float: 'right' }}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller/>
                    </Menu.Item>
                    <Menu.Item key="full" >
                        <Icon type="arrows-alt"  onClick={this.screenFull}/>
                    </Menu.Item>
                    <Menu.Item key="1" >
                        <Badge count={25} overflowCount={10} style={{marginLeft:10}}>
                        <Icon type="notification" /></Badge>
                    </Menu.Item>
                    {
                        userInfo?<SubMenu title={<span className="avatar"><img src={userInfo&&userInfo.role==='admin'?'../../images/gaga.gif':userInfo.avatar} alt="头像"/> <i className="on bottom b-white" /></span>}>
                            <MenuItemGroup title="用户中心">
                                <Menu.Item key="setting:1">你好 - {userInfo.cname}</Menu.Item>
                                <Menu.Item key="setting:2"><Icon type="user" />个人信息</Menu.Item>
                                <Menu.Item key="logout"><span onClick={this.logout}><Icon type="logout" />退出登录</span></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="设置中心">
                                <Menu.Item key="setting:3"><Icon type="setting" />个人设置</Menu.Item>
                                <Menu.Item key="setting:4"><Icon type="setting" />系统设置</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>:<SubMenu title={<span className="avatar"><img src="../../images/gaga.gif" alt="头像"/> <i className="on bottom b-white" /></span>}>
                            <MenuItemGroup title="用户中心">
                                <Menu.Item key="setting:1">你好 - 游客}</Menu.Item>
                                <Menu.Item key="setting:2"><Icon type="user" />个人信息</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="设置中心">
                                <Menu.Item key="setting:3"><Icon type="setting" />个人设置</Menu.Item>
                                <Menu.Item key="setting:4"><Icon type="setting" />系统设置</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    }

                </Menu>
            </Header>
        )
    }
}
const mapState=state=>({
    userInfo:state.getIn(['login','userInfo']),
    isMobile: state.getIn(['layout','isMobile'])
});
const mapDispatch=(dispatch)=>({
    logout(userName){
        dispatch(actionCreators.Logout(userName))
    }
});
export default connect(mapState,mapDispatch)(MHeader);