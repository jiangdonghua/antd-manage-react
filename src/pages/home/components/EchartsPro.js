import React from 'react';
import ReactEcharts from 'echarts-for-react';

let xAxisData = [];
let data1 = [];
let data2 = [];
for (var i = 0; i < 50; i++) {
    xAxisData.push(i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push(Math.ceil((Math.cos(i / 5) * (i / 5 ) + i / 6) * 5)+10);
}

const option = {
    title: {
        text: '最近50天运动曲线',
        left:'center',
        textStyle:{
            color:'#ccc',
            fontSize:12
        }
    },
    legend: {
        data: ['工作量', '休息时间'],
        align: 'auto',
        left:20,
        textStyle:{
            color:'#ccc',
            fontSize:12
        },

    },
    backgroundColor: '#08263a',
    toolbox: {
        // y: 'bottom',
        feature: {
            magicType: {
                type: ['stack', 'tiled'],
                iconStyle:{
                    color:'#ccc'
                }
            },
            dataView: {
                iconStyle:{
                    color:'#ccc'
                }
            },
            saveAsImage: {
                pixelRatio: 2,
                iconStyle:{
                    color:'#ccc'
                },
                backgroundColor:'#ccc'
            }
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        splitLine: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#ccc'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#08263f'
            }
        },
        axisTick: {
            show: false
        }
    },
    visualMap:{
        min:0,max:50,
        dimension:0,
        inRange:{
            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'],
        }
    },
    series: [{
        name: '休息时间',
        type: 'line',
        data: data2,
        showSymbol: true,
        lineStyle: {
            normal: {
                color: 'transparent'
            }
        },
        areaStyle: {
            normal: {
                color: '#08263a',
                shadowBlur: 50,
                shadowColor: '#000'
            }
        },

        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: '工作量',
        type: 'bar',
        data: data2,
       z:3,
        animationDelay: function (idx) {
            return idx * 10 + 100;
        },
        itemStyle: {
            normal: {
                barBorderRadius: 5
            }
        }
    }],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
        return idx * 5;
    }
};
const EchartsProjects=()=>(
    <ReactEcharts option={option}  style={{height: '228px', width: '100%'}} lazyUpdate={true} className={'react_for_echarts'}/>
)
export default EchartsProjects;