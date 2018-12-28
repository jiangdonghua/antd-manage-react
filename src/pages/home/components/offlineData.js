import React, { memo } from 'react';
import { Card, Tabs, Row, Col,Progress  } from 'antd';
import NumberInfo from '../../../components/NumberInfo';
import TimelineChart from './TimelineChart';

const  CustomTab=({data,currentTabKey:currentKey})=>(
    <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
            <NumberInfo
            title={data.name}
            subTitle="转化率"
            gap={2}
            total={`${data.cvr*100}%`}
           // theme={currentKey!==data.name&&'light'}
            />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
            <Progress type="circle" percent={data.cvr*100} width={80}/>
        </Col>
    </Row>

)
const TabPane = Tabs.TabPane;

const OfflineData=({activeKey, loading, offlineData, offlineChartData, handleTabChange})=>(
    <Card
        loading={loading}
        className="offlineCard"
        bordered={false}
    >
        <Tabs activeKey={activeKey} onChange={handleTabChange}>
            {
                offlineData.map(item=>(

                    <TabPane tab={<CustomTab currentTabKey={activeKey} data={item}/>} key={item.name}>
                        <div style={{ padding: '0 24px',maxWidth:800,margin:'0 auto' }}>
                            <TimelineChart data={offlineChartData}/>
                        </div>
                    </TabPane>
                ))
            }
        </Tabs>
    </Card>
)



export default memo(OfflineData);