import React,{Component} from 'react';
import {Breadcrumb} from 'antd';
import { Link } from 'react-router-dom';
import Location from './location'
import './index.less';
class BreadCrumber extends Component{
    render() {
        const first=<Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <div className='clear'>
                <Breadcrumb className='Breadcrumb pull-left'>
                    <Breadcrumb.Item><Link to={'/app/home'}>首页</Link></Breadcrumb.Item>
                    {first}
                    {second}
                </Breadcrumb>
                <Location/>
            </div>
        )
    }
}
export default BreadCrumber;