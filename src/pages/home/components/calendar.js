import React, {Component} from 'react';
import {Calendar} from 'antd';

class aCalendar extends Component{
    render() {
        return (
            <div style={{  border: '1px solid #ccc', borderRadius: 4 ,background:'#fff',color:'#ccc'}}>
            <Calendar fullscreen={false}   >
            </Calendar>
            </div>
        );
    }
}
export default aCalendar;