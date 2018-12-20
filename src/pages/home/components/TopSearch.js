import React, {memo} from 'react';
import { Row, Col, Table, Tooltip, Card, Icon } from 'antd';
import numeral from 'numeral';
import Trend from '../../../components/Trend';
import NumberInfo from '../../../components/NumberInfo';
import MiniArea from './MiniArea';
const columns=[
    {
        title:'排名',
        dataIndex:'index',
        key:'index'
    },
    {
        title:'用户关键词',
        dataIndex:'keyword',
        key:'keyword',
        render:text=> <a href="/">{text}</a>
    },
    {
        title:'用户数',
        dataIndex:'count',
        key:'count',
        sorter:(a,b)=>a.count-b.count,
        className:'right'
    },
    {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
            <Trend flag={record.status === 1 ? 'down' : 'up'}>
                <span style={{ marginRight: 4 }}>{text}%</span>
            </Trend>
        ),
        align: 'right'
    }
]


// const areEqual=(prevProps, nextProps)=>{
//     if(prevProps.seconds===nextProps.seconds){
//         return true
//     }else {
//         return false
//     }
//
// }
const TopSearch=({loading,visitData2,dropdownGroup,searchData})=>(
    <Card
        loading={loading}
          bordered={false}
          title={"线上热门搜索"}
          extra={dropdownGroup}
    >
        <Row gutter={68}>
            <Col sm={12} xs={24} style={{marginBottom:24}}>
                <NumberInfo

                subTitle={
                    <span>
                        搜索用户数
                        <Tooltip title="搜索用户数">
                         <Icon style={{ marginLeft: 8 }} type="info-circle-o"
                         /></Tooltip>
                    </span>
                }
                gap={8}
                total={numeral(32433).format('0,0')}
                subTotal={18.6}
                status='up'
                />
                <MiniArea line height={55} data={visitData2} />
            </Col>
            <Col sm={12} xs={24} style={{marginBottom:24}}>
                <NumberInfo

                    subTitle={
                        <span>
                           人均搜索次数
                        <Tooltip title="人均搜索次数">
                         <Icon style={{ marginLeft: 8 }} type="info-circle-o"
                         /></Tooltip>
                    </span>
                    }
                    gap={8}
                    total={2.6}
                    status="down"
                    subTotal={28.6}
                />
                <MiniArea line height={55} data={visitData2} />
            </Col>
        </Row>
        <Table
            rowKey={record => record.index}
            size="small"
            className='custom-table'
            columns={columns}
            dataSource={searchData}
            pagination={{
                style: { marginBottom: 0 },
                pageSize: 6,
            }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        console.log(record)
                    },       // 点击行
                    onMouseEnter: () => {},  // 鼠标移入行
                };
            }}
        />

    </Card>
)

export default memo(TopSearch);