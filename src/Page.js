import React,{Component} from 'react';
import {Layout} from 'antd';
import MHeader from './components/Layout/Header';
import MFooter from './components/Layout/Footer';
import NavLeft from './components/Layout/NavLeft';
import {connect} from "react-redux";
 import Routes from './routes';
import './components/Layout/index.less';
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
    render() {
        return (
            <Layout>
                <NavLeft  collapsed={this.state.collapsed} />
                <Layout style={{flexDirection:'column'}}>
                    <MHeader toggle={this.toggle} collapsed={this.state.collapsed}/>
                    <Content>
                        <Routes/>
                    </Content>
                    <MFooter/>
                </Layout>
            </Layout>
        )
    }
 }
export default connect(null,null)(Admin);