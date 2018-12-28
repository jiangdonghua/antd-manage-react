import React, { memo } from 'react';
import {Icon, Row, Col,Tooltip} from 'antd';
import numeral from 'numeral';
import Trend from '../../../components/Trend';
import Yuan from '../../../util/yuan';


import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import ChartCard from './ChartCard';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
};
const Field = ({ label, value, ...rest }) => (
    <div className='field' {...rest}>
        <span className='label'>{label}</span>
        <span className='number'>{value}</span>
    </div>
);

const IntroduceRow=({loading, visitData})=>(
    <Row gutter={24}>
        <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                loading={loading}
                title='总销售额'
                action={
                    <Tooltip title='Introduce'>
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={() => <Yuan>126560</Yuan>}
                footer={
                    <Field
                        label='日销售额'
                        value={`￥${numeral(12423).format('0,0')}`}
                    />
                }
                contentHeight={46}
            >
                <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比
                    <span className='trendText'>12%</span>
                </Trend>
                <Trend flag="down">
                    日同比
                    <span className='trendText'>11%</span>
                </Trend>
            </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                loading={loading}
                title="访问量"
                action={
                    <Tooltip title="Introduce">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={numeral(8846).format('0,0')}
                footer={
                    <Field
                        label="日访问量"
                        value={numeral(1234).format('0,0')}
                    />
                }
                contentHeight={46}
            >
                <MiniArea color="#975FE4" data={visitData} height={70}/>
            </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                loading={loading}
                title="支付笔数"
                action={
                    <Tooltip
                        title='Introduce'
                    >
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total={numeral(6560).format('0,0')}
                footer={
                    <Field
                        label="转化率"
                        value="60%"
                    />
                }
                contentHeight={46}
            >
                <MiniBar data={visitData} height={70} color="#975FE4"/>
            </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
            <ChartCard
                loading={loading}
                bordered={false}
                title='运营活动效果'
                action={
                    <Tooltip title="Introduce">
                        <Icon type="info-circle-o" />
                    </Tooltip>
                }
                total="78%"
                footer={
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        <Trend flag="up" style={{ marginRight: 16 }}>
                           周同比
                            <span className="trendText">12%</span>
                        </Trend>
                        <Trend flag="down">
                            日同比
                            <span className="trendText">11%</span>
                        </Trend>
                    </div>
                }
                contentHeight={46}
            >
                <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
        </Col>
    </Row>


)



export default memo(IntroduceRow);