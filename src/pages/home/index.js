import React, {Component} from 'react';
import {Row, Col, Card, Timeline, Icon} from 'antd';
import BreadcrumbCustom from '../../components/BreadCrumb';
import EchartsProjects from './components/EchartsPro';
// import Calendar from './components/calendar';
import {updateRecords} from '../../apis';
import moment from 'moment';
import './index.less';

class Home extends Component {
    constructor(props) {
        super(props);
        this.sync = React.createRef();
    }

    //相对时间
    relativeDate = (historyDate) => (
        //相对时间
        moment(historyDate, "YYYYMMDDhhmmss").fromNow()
    )
    state = {
        updateRecord: [],
        loaded: true
    }
    format = (data) => {
        if (data) {
            const historyDate = moment().format(data, 'YYYYMMDDhhmmss').toString();
            const fromNow = this.relativeDate(historyDate);
            return fromNow
        }

    }

    getUpdateRecords() {
        if (this.state.updateRecord.length) {
            return this.state.updateRecord.map((item) => {
                return <Timeline.Item color={item.color} key={item.status}
                                      dot={item.iconsType ? <Icon type={item.iconsType}/> : null}>
                    {item.subs.map((child) => {
                        return <p key={child.desc}><a target='_blank'
                                                      href={child.url}
                                                      rel="noopener noreferrer">
                            {child.desc}
                            <span className='pull-right'>{this.format(child.date)}</span>
                        </a></p>
                    })}
                </Timeline.Item>

            })
        }
    }

    componentWillMount() {
        this.updateRecords();
    }

    updateRecords() {
        updateRecords().then(res => {
            if (res.code === 0) {
                this.setState({
                    updateRecord: res.data,
                    loaded: true
                })
            }
        })
    }

    handleUpdateRecord = () => {
        // let spinIcon=document.getElementById('spinIcon');
        // let originAngle=spinIcon.style.transform.replace(/[^0-9]/ig,'');
        // if(originAngle){
        //     originAngle=parseInt(originAngle,10)
        // }else{
        //     originAngle=0
        // }
        // spinIcon.style.transform='rotate('+(originAngle+360)+'deg)';
        this.setState({
            loaded: false
        })
        this.updateRecords();
    }

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
                                <EchartsProjects/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={8}>
                        {/*<Calendar/>*/}
                        <div className="gutter-box">
                            <Card title='最近更新'
                                  extra={<a onClick={this.handleUpdateRecord} ref='spinLink'><Icon type="sync"
                                                                                                   id='spinIcon'
                                                                                                   className={this.state.loaded ? '' : 'spin'}/></a>}>
                                <Timeline>
                                    {this.getUpdateRecords()}
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>

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