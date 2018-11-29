import React,{Component} from 'react';
import {Row,Col} from 'antd';
import Header from './Header';
import Footer from './Footer';
import NavLeft from './NavLeft';
import './index.less'
 class Layout extends Component{
    render() {
        return (
            <Row className="container">
                <Col span='4' className='nav-left'>
                    <NavLeft />
                </Col>
                <Col span='20' className='main'>
                    <Header/>
                    <Row className='content'>
                        content121
                    </Row>
                    <Footer/>
                </Col>

            </Row>
        )
    }
 }
export default Layout;