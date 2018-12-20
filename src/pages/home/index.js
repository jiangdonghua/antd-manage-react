import React, {Component, Suspense} from 'react';
import {Row, Col, Card, Timeline, Icon, Menu, Dropdown, Table} from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store';

import BreadcrumbCustom from '../../components/BreadCrumb';
import EchartsProjects from './components/EchartsPro';
// import Calendar from './components/calendar';
import moment from 'moment';
import {updateRecords} from '../../apis';
import './index.less';
import Trend from "../../components/Trend";

const TopSearch = React.lazy(() => import('./components/TopSearch'));
const columns = [
    {
        title: 'Rank',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: 'Search keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>
    },
    {
        title: 'Users',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: 'right'
    },
    {
        title: 'Weekly',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
            <Trend flag={record.status === 1 ? 'down' : 'up'}>
                <span style={{marginRight: 4}}>{text}%</span>
            </Trend>
        ),
        align: 'right'
    }
]

class Home extends Component {
    state = {
        updateRecord: [],
        loaded: true,
    }
    //相对时间
    relativeDate = (historyDate) => (
        moment(historyDate, "YYYYMMDDhhmmss").fromNow()
    )

    // 格式化时间
    format = (data) => {
        if (data) {
            const historyDate = moment().format(data, 'YYYYMMDDhhmmss').toString();
            const fromNow = this.relativeDate(historyDate);
            return fromNow
        }
    }

    //获取更新记录
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
        //cancelAnimationFrame(this.reqRef);
        this.props.fetch_chart_data();
    }

    componentDidMount() {
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

//手动刷新更新纪录
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

    selectDate = type => {
    }

    render() {
        const {chart, loading} = this.props;

        const {
            visitData,
            visitData2,
            salesData,
            searchData,
            offlineData,
            offlineChartData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline,
        } = chart.toJS();
        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        );
        const dropdownGroup = (
            <span>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis"/>
        </Dropdown>
      </span>
        );
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
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Suspense fallback={null}>
                                <TopSearch
                                    loading={loading}
                                    visitData2={visitData2}
                                    selectDate={this.selectDate}
                                    searchData={searchData}
                                    dropdownGroup={dropdownGroup}
                                />
                            </Suspense>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        222
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapState = state => ({
    chart: state.getIn(['home', 'chart']),
    loading: state.getIn(['home', 'loading']),
});
const mapDispatch = (dispatch) => ({
    fetch_chart_data() {
        dispatch(actionCreators.Fetch_chart_data())
    }
});

export default connect(mapState, mapDispatch)(Home);