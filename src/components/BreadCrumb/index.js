import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import { Link } from 'react-router-dom';

class BreadCrumb extends Component{
    render() {
        const first=<Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <Breadcrumb style={{margin:'12px 0'}}>
                <Breadcrumb.Item><Link to={'/app/home'}>首页</Link></Breadcrumb.Item>
                {first}
                {second}
            </Breadcrumb>
        )
    }
}
export default BreadCrumb;