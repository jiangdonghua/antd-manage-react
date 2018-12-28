import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
const option = {

};

class TimelineChart extends PureComponent {
    state = {
        option:option,
        legendData:[]
    };
    getOption(obj){
        return {
            title : {
                text: '客流量与支付笔数关系图',
                subtext: '数据来自模拟',
                x: 'center',
                align: 'right'
            },
            grid: {
                bottom: 100
            },

            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                data:['客流量','支付笔数'],
                x: 'left'
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 65,
                    end: 85
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 65,
                    end: 85,
                }
            ],
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    data : obj.xAxisData
                }
            ],
            yAxis: [
                {
                    name: '',
                    type: 'value',
                    max: obj.max,
                    axisLine : {
                        show: false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        lineStyle:{
                            type:'dashed'
                        }
                    }

                },
                {
                    name: '',
                    nameLocation: 'start',
                    max: obj.max,
                    type: 'value',
                    axisLabel:{
                        show:false
                    },
                    axisLine : {
                        show: false
                    },
                    axisTick:{
                        show:false
                    },
                    splitLine:{
                        show: false
                    }
                }
            ],
            series: [
                {
                    name:'客流量',
                    type:'line',
                    animation: false,
                    data:obj.seriesData1,
                    color:[
                        'rgb(24, 144, 255)',
                    ]
                },
                {
                    name:'支付笔数',
                    type:'line',
                    yAxisIndex:1,
                    animation: false,
                    data: obj.seriesData2,
                    color:[
                        'rgb(47, 194, 91)',
                        ]
                },

            ]
        }
    }
    setOption(data){
        //console.log(data)
        let obj={
            xAxisData:[],
            seriesData1:[],
            seriesData2:[],
            max1:0,
            max2:0
        };
        data.map(item=>{
            let maxData=[];
            obj.xAxisData.push(moment.unix(item.x).format('HH:mm'));
            obj.seriesData1.push(item.y1);
            obj.seriesData2.push(item.y2);
            obj.max1=Math.max.apply(null, obj.seriesData1);
            obj.max2=Math.max.apply(null, obj.seriesData2);
            maxData.push(obj.max1)
            maxData.push(obj.max2)
            obj.max=Math.max.apply(null, maxData)+10;
            return obj;
        })
       // console.log(obj)
        this.setState({
            option:this.getOption(obj)
        })
    }
    componentDidMount() {
        const {data}=this.props;
        this.setOption(data)
    }

    componentDidUpdate(preProps) {
        const { data} = this.props;
        if (data !== preProps.data) {
            // because of charts data create when rendered
            // so there is a trick for get rendered time
            //this.getLegendData();
            this.setOption(data)
        }
    }

    render() {
        return <ReactEcharts option={this.state.option}  lazyUpdate={true} style={{minHeight: 400,}}/>
    }
}

export default TimelineChart;
