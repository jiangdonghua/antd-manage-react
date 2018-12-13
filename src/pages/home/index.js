import React, {Component} from 'react';
import {Row,Col,Card,Timeline,Icon} from 'antd';
import BreadcrumbCustom from '../../components/BreadCrumb';
import EchartsProjects from './components/EchartsPro';
import Calendar from './components/calendar';
import './index.less';
class Home extends Component{
    render() {
        return (
           <div className='gutter-example button-demo'>
               <BreadcrumbCustom/>
               <Row gutter={16}>
                   <Col md={4} className="gutter-row">
                       <div className="gutter-box">
                           <Card
                               hoverable
                               bordered={false}
                           >
                               <div className='clear y-center'>
                                   <div className="pull-left mr-m">
                                       <Icon type='user' className='text-2x text-info'/>
                                   </div>
                                   <div className="clear">
                                       <div className="text-muted">用户量</div>
                                       <h2>13231</h2>
                                   </div>
                               </div>
                           </Card>
                       </div>
                       <div className="gutter-box">
                           <Card
                               hoverable
                               bordered={false}
                           >
                               <div className='clear y-center'>
                               <div className="pull-left mr-m">
                                   <Icon type='like' className='text-2x text-danger'/>
                               </div>
                               <div className="clear">
                                   <div className="text-muted">觉得牛</div>
                                   <h2>3433</h2>
                               </div>
                               </div>
                           </Card>
                       </div>
                   </Col>
                   <Col md={4} className="gutter-row">
                       <div className="gutter-box">
                           <Card
                               hoverable
                               bordered={false}
                           >
                               <div className='clear y-center'>
                                   <div className="pull-left mr-m">
                                       <Icon type='gift' className='text-2x text-success'/>
                                   </div>
                                   <div className="clear">
                                       <div className="text-muted">礼物</div>
                                       <h2>1343</h2>
                                   </div>
                               </div>
                           </Card>
                       </div>
                       <div className="gutter-box">
                           <Card
                               hoverable
                               bordered={false}
                           >
                               <div className='clear y-center'>
                                   <div className="pull-left mr-m">
                                       <Icon type='heart' className='text-2x'/>
                                   </div>
                                   <div className="clear">
                                       <div className="text-muted">收藏量</div>
                                       <h2>2343</h2>
                                   </div>
                               </div>
                           </Card>
                       </div>
                   </Col>
                   <Col className="gutter-row" md={16}>
                       <div className="gutter-box">
                           <Card bordered={false} className={'no-padding'}>
                               <EchartsProjects />
                           </Card>
                       </div>
                   </Col>
               </Row>
               <Row gutter={16}>
                   <Col className="gutter-row" md={8}>
                       {/*<Calendar/>*/}
                       <div className="gutter-box">
                           <Card title='最近更新' extra={<a href="#"><Icon type="sync" /></a>}>
                               <Timeline>
                                   <Timeline.Item>更新版本</Timeline.Item>
                                   <Timeline.Item color='#108ee9'>
                                       <p>完成初版</p>
                                       <p>联调接口</p>
                                       <p>功能验收</p></Timeline.Item>
                                   <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">
                                       <p><a href="https://github.com/jiangdonghua/antd-manage-react/commit/93d175d59d1a8e1d544dc1c805924900ba3a3256" target='_blank'>优化左侧菜单  Dec 12, 2018</a></p>
                                       <p> <a
                                           href="https://github.com/jiangdonghua/antd-manage-react/commit/b7ffd59c70a584be1a7929e0c5508793a57687b0" target='_blank'>外层骨架完工，后续功能在优化增加 <br/>  Dec 11, 2018</a></p>
                                      </Timeline.Item>
                                   <Timeline.Item color="green">
                                       <p><a target='_blank' href="https://github.com/jiangdonghua/antd-manage-react/commit/1b6dde4697ca42e05e8f944137a281f554dd89c7">Update README.md   Nov 29, 2018</a></p>
                                       <p><a target='_blank' href="https://github.com/jiangdonghua/antd-manage-react/commit/b7ffd59c70a584be1a7929e0c5508793a57687b0">基本骨架搭建 Dec 7, 2018</a></p>
                                       <p>登录功能</p>
                                       <p>权限验证</p>
                                       <p>页面结构</p>
                                   </Timeline.Item>
                               </Timeline>
                           </Card>
                       </div>
                   </Col>
                   <Col className="gutter-row" md={8}>
111
                   </Col>
                   <Col className="gutter-row" md={8}>
222
                   </Col>
               </Row>
           </div>
        );
    }
}
export default Home;