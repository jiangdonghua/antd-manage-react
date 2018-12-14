import React,{Component} from 'react';
import {Layout} from 'antd';
import MHeader from './components/Layout/Header';
import MFooter from './components/Layout/Footer';
import NavLeft from './components/Layout/NavLeft';
import {connect} from "react-redux";
 import Routes from './routes';
import './components/Layout/index.less';
import * as actionCreators from "./pages/login/store/actionCreators";
import {actionCreators as actionCreators1} from "./components/Layout/store";
// import { withRouter } from 'react-router-dom';
const {Content}=Layout;
 class Admin extends Component{
     state = {
         collapsed: false,
     };
     toggle=()=>{
        this.setState({
            collapsed:!this.state.collapsed
        })
    }
     getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
         let clientWidth = window.innerWidth;
         let status=(clientWidth<=992)?true:false;
         this.props.responsive(status)

     };
     componentWillMount() {
         if(!this.props.userInfo.token){
             this.props.LoadUserInfo()
         }
         this.getClientWidth();
         window.onresize=()=>{
             this.getClientWidth()
         }
     }
     render() {
        return (
            <Layout>
                {!this.props.isMobile &&  <NavLeft  collapsed={this.state.collapsed} />}
                <Layout style={{flexDirection:'column'}}>
                    <MHeader toggle={this.toggle} collapsed={this.state.collapsed}/>
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                        <Routes/>
                        <MFooter/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
 }

const mapState=state=>({
    userInfo:state.getIn(['login','userInfo']),
    isMobile: state.getIn(['layout','isMobile'])
});
const mapDispatch=(dispatch)=>({
    LoadUserInfo(){
        dispatch(actionCreators.LoadUserInfo())
    },
    responsive(status){
        dispatch(actionCreators1.Responsive(status))
    }
});
export default connect(mapState,mapDispatch)(Admin);