import React, {memo} from 'react';
import numeral from 'numeral';
import {Card, Tabs, Row, Col, DatePicker} from 'antd';
import Bar from './BarChart';

const TabPane = Tabs.TabPane;
const RangePicker=DatePicker.RangePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title:'澳门路'+i+'号店',
        total: 323234+i*1452,
    });
}
const SalesCard = ({rangePickerValue, salesData, isActive, handleRangePickerChange, loading, selectDate}) => (
    <Card
        loading={loading}
        className="offlineCard"
        bordered={false}
        bodyStyle={{padding: 0}}
    >
        <div className="salesCard">
            <Tabs tabBarExtraContent={
                <div className="salesExtraWrap">
                    <div className="salesExtra">
                        <a className={isActive('today')} onClick={() => selectDate('today')}>今日</a>
                        <a className={isActive('week')} onClick={() => selectDate('week')}>本周</a>
                        <a className={isActive('month')} onClick={() => selectDate('month')}>本月</a>
                        <a className={isActive('year')} onClick={() => selectDate('year')}>全年</a>
                    </div>
                    <RangePicker
                        value={rangePickerValue}
                        onChange={handleRangePickerChange}
                        style={{ width: 256 }}
                    />
                </div>

            }
                  size="large"
                  tabBarStyle={{ marginBottom: 24 }}
                  defaultActiveKey="sales"
            >
                <TabPane
                    tab='销售额'
                    key="sales"
                >
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                            <div className='salesBar'>
                                <Bar
                                    height={295}
                                    title='销售额趋势'
                                    data={salesData}
                                />
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                            <div className='salesRank'>
                                <h4 className='rankingTitle'>
                                    门店销售额排名
                                </h4>
                                <ul className='rankingList'>
                                    {rankingListData.map((item, i) => (
                                        <li key={item.title}>
                        <span
                            className={`rankingItemNumber ${i < 3 ? 'active' : ''}`}
                        >
                          {i + 1}
                        </span>
                                            <span className='rankingItemTitle' title={item.title}>
                          {item.title}
                        </span>
                                            <span className='rankingItemValue'>
                          {numeral(item.total).format('0,0')}
                        </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane
                    tab="访问量"
                    key="views"
                >
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                            <div className='salesBar'>
                                <Bar
                                    height={292}
                                    title='访问量趋势'
                                    data={salesData}
                                />
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                            <div className='salesRank'>
                                <h4 className='rankingTitle'>
                                    门店访问量排名
                                </h4>
                                <ul className='rankingList'>
                                    {rankingListData.map((item, i) => (
                                        <li key={item.title}>
                        <span
                            className={` rankingItemNumber ${i < 3 ? 'active' : ''}`}
                        >
                          {i + 1}
                        </span>
                                            <span className='rankingItemTitle' title={item.title}>
                          {item.title}
                        </span>
                                            <span>{numeral(item.total).format('0,0')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>

    </Card>
)


export default memo(SalesCard);