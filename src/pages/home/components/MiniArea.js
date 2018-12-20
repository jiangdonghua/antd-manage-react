import React from 'react';
import ReactEcharts from 'echarts-for-react';

const option= {
};

class MiniArea extends React.PureComponent {
    state={
        option:option
    }
    componentDidMount() {
        const {data}=this.props;
        this.setOption(data)
    }
    getOption(x,y){
        return {
            xAxis: {
                type: 'category',
                data: x,
                show:false,

            },
            yAxis: {
                type: 'value',
                show:false,

            },
            tooltip: {
                trigger: 'axis',
                textStyle:{
                    color:'rgba(255,255,255,0.8)'
                },
                padding:[5,10, 5 ,10],
                axisPointer: {
                    type: 'none',
                    shadowStyle:'rgba(24, 144, 255, 0.2)',
                    backgroundColor:'rgba(255,255,255,0.6)',
                    label: {
                        backgroundColor: '#6a7985',
                        formatter: function (params) {
                            return  params.value+' '
                                + (params.seriesData.length ?' '+ params.seriesData[0].data : '');
                        }
                    }
                }
            },
            series: [{
                data: y,
                type: 'line',
                smooth: true,
                showSymbol: false,
                areaStyle: {
                    origin:'start',
                    color : 'rgba(24, 144, 255, 0.2)',
                    //borderColor : '#1089ff',
                },
                itemStyle : {
                    normal : {
                        color:'#1089ff',
                        lineStyle:{
                            color:'#1089ff'
                        }
                    }
                },
            }]
        }
    }
    setOption(data){
        let xData=[] , SeriesData=[];
        data.map((item)=>{
            xData.push(item.x);
            SeriesData.push(item.y);
            return xData,SeriesData
        })

        this.setState({
            option:this.getOption(xData,SeriesData)
        })
    }
    render() {

        const {

            line,height
        } = this.props;
        return (
            <ReactEcharts option={this.state.option}  style={{height: height+10, width: '100%'}} notMerge={true} lazyUpdate={true} className={'react_for_echarts'}/>
        );
    }
}

export default MiniArea;
