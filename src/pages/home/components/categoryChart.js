import React, {memo} from 'react';
import {  Card, Radio } from 'antd';
import Pie from './PieChart';
import numeral from 'numeral';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;
const categorySales=({dropdownGroup, salesType, loading, salesPieData, handleChangeSalesType})=>(
    <Card
        loading={loading}
        bordered={false}
        title={"销售额类别占比"}
        extra={
            <div className='salesCardExtra'>
            {dropdownGroup}
            <div className='salesTypeRadio'>
            <Radio.Group defaultValue="all" buttonStyle="solid" onChange={handleChangeSalesType} value={salesType}>
            <Radio.Button value="all">全部渠道</Radio.Button>
            <Radio.Button value="online">线上</Radio.Button>
            <Radio.Button value="stores">门店</Radio.Button>
            </Radio.Group>
            </div>
            </div>
        }
        bodyStyle={{ padding: [24, 24 ,40 ,24] }}
    >
        <div style={{minHeight: 400,paddingBottom:20}}>
            <h4>销售额</h4>
            <Pie data={salesPieData}
                 total={()=>yuan(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                />
        </div>
    </Card>
)

export default memo(categorySales);