import React,{Component} from 'react';
import {Layout} from 'antd';
const {Footer}=Layout;
class mFooter extends Component{
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>
                React-Admin-manager ©{new Date().getFullYear()} Created by 861252878@qq.com
            </Footer>
        )
    }
}
export default mFooter;