import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

const option= {
};

class Pie extends PureComponent {
    state = {
        option:option,
        legendData:[]
    };

    getOption(obj,title){
        return {
            title: {
                text: title,
            },
            xAxis: {
                data: obj.dataAxis,
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: 'rgba(0,0,0,.65)'
                    }
                },
                boundaryGap:true,
                axisTick: {
                    show: true,
                    alignWithLabel:true,
                    lineStyle:{
                        color:'rgba(0,0,0,.65)'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'rgba(0,0,0,.65)'
                    }
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                    data: obj.barData,
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#188df0'
                        },
                        emphasis: {
                            color: '#2378f7'
                        }
                    },
                    data: obj.barData
                }
            ]
        }
    }
    setOption(data,title){
        let obj={
            dataAxis:[],barData:[]
        };
        data.map((item)=>{
            obj.dataAxis.push(item.x);
            obj.barData.push(item.y);
            return obj;
        })

        this.setState({
            option:this.getOption(obj,title)
        })
    }
    componentDidMount() {
        const {data,title}=this.props;
        this.setOption(data,title)

    }

    componentDidUpdate(preProps) {
        const { data,title} = this.props;
        if (data !== preProps.data) {
            // because of charts data create when rendered
            // so there is a trick for get rendered time
            //this.getLegendData();
            this.setOption(data,title)
        }
    }

    render() {
        return <ReactEcharts option={this.state.option}  lazyUpdate={true} style={{minHeight: 300,}}/>
    }
}

export default Pie;
