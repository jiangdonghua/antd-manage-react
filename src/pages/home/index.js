import React, {Component, Suspense} from 'react';
import {Row, Col, Card, Timeline, Icon, Menu, Dropdown, Spin} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';
import {getTimeDistance} from '../../util'
import {actionCreators} from './store';
import {updateRecords} from '../../apis';
import './index.less';

import BreadcrumbCustom from '../../components/BreadCrumb';
import EchartsProjects from './components/EchartsPro';

const TopSearch = React.lazy(() => import('./components/TopSearch'));
const CategoryChart = React.lazy(() => import('./components/categoryChart'));
const OfflineData = React.lazy(() => import('./components/offlineData'));
const SalesCard = React.lazy(() => import('./components/salesCard'));
const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));

class Home extends Component {
    state = {
        updateRecord: [],
        loaded: true,
        currentTabKey:'',
        salesType: 'all',
        rangePickerValue:getTimeDistance('year')
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
//激活的日期
    isActive=type=>{
        const {rangePickerValue}=this.state;

        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return 'currentDate';
        }
        return '';
    }
    //日期改变
    handleRangePickerChange=rangePickerValue=>{
        this.setState({
            rangePickerValue
        })
        //fetchSalesData操作
    }
    selectDate = type => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        });

        //fetchSalesData操作
    };

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
        //这个最好也放进store方法同fetch_chart_data
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
    //销售额类别占比切换
    handleChangeSalesType=(e)=>{
        this.setState({
            salesType:e.target.value
        })
    }
    //转化率
    handleTabChange=(key)=>{
        this.setState({
            currentTabKey:key
        })
    }


    render() {
        const {salesType,currentTabKey,rangePickerValue}=this.state;
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
        let salesPieData;

        if(salesType==='all'){
            salesPieData=salesTypeData;
        }else{
            salesPieData=salesType==='online'?salesTypeDataOnline:salesTypeDataOffline
        }
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
        const activeKey =offlineData? currentTabKey || (offlineData[0] && offlineData[0].name):currentTabKey;
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
                                    <Timeline.Item> 10个已经完成，2个待完成，1个正在进行中</Timeline.Item>
                                    {this.getUpdateRecords()}
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>

                        <div className="gutter-box">

                            <Suspense fallback={<div style={{ paddingTop: 100, textAlign: 'center' }}> <Spin size="large" />
                            </div>}>
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
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Suspense fallback={null}>
                                <CategoryChart
                                    loading={loading}
                                    dropdownGroup={dropdownGroup}
                                    salesType={salesType}
                                    salesPieData={salesPieData}
                                    handleChangeSalesType={this.handleChangeSalesType}
                                />
                            </Suspense>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row">
                        <div className="gutter-box1">
                    <Suspense fallback={<div style={{ paddingTop: 100, textAlign: 'center' }}> <Spin size="large" />
                    </div>}>
                        <IntroduceRow loading={loading} visitData={visitData} />
                    </Suspense>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row">
                        <div className="gutter-box1">
                    <Suspense fallback={<Spin size="large" />}>
                        {
                            offlineData?<OfflineData
                                activeKey={activeKey}
                                loading={loading}
                                offlineData={offlineData}
                                offlineChartData={offlineChartData}
                                handleTabChange={this.handleTabChange}
                            />:null
                        }

                    </Suspense>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row">
                        <div className="gutter-box1">
                <Suspense fallback={<Spin size="large" />}>
                    {
                        salesData?<SalesCard
                            rangePickerValue={rangePickerValue}
                            salesData={salesData}
                            isActive={this.isActive}
                            handleRangePickerChange={this.handleRangePickerChange}
                            loading={loading}
                            selectDate={this.selectDate}
                        />:null
                    }

                </Suspense></div>
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