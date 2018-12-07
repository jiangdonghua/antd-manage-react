import React,{Component} from 'react';
import { Menu, Icon, Layout, Badge, } from 'antd';
import screenfull from 'screenfull';
import {PwaInstaller} from '../../widget';
const {Header}=Layout;
const SubMenu=Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MHeader extends Component{
    state = {
        current: 'mail',
    }
    menuClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    screenFull=()=>{
        if(screenfull.enabled){
            screenfull.toggle()
        }
    }
    render() {
        return (
            <Header className='custom-theme header'>
                <Icon
                    className="header__trigger custom-trigger"
                    type={this.props.collapsed?'menu-unfold':'menu-fold'}
                    onClick={this.props.toggle}
                />
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
                    <SubMenu title={<span className="avatar"><img src="../../images/gaga.gif" alt="头像"/> <i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - </Menu.Item>
                            <Menu.Item key="setting:2"><Icon type="user" />个人信息</Menu.Item>
                            <Menu.Item key="logout"><span><Icon type="logout" />退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3"><Icon type="setting" />个人设置</Menu.Item>
                            <Menu.Item key="setting:4"><Icon type="setting" />系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}
export default MHeader;