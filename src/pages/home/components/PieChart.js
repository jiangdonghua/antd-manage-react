import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

const option= {
};

class Pie extends PureComponent {
    state = {
        option:option,
        legendData:[]
    };
    getOption(obj,total){
        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: ￥{c} ({d}%)",
            },
            legend: {
                orient: 'horizontal',
                data: obj.legendData,
                left:'center',
                bottom:'0',
                formatter: function(name) {
                    var index = 0;
                    obj.legendData.forEach(function(value,i){
                        if(value.name === name){
                            index = i;
                        }
                    });
                    return name + " | " + obj.legendData[index].value +"  "+obj.legendData[index].percent;
                }
            },
            graphic:{
                type:'text',
                left:'center',
                top:'30%',
              style:{
                  text:`本月业绩\r\n\r\n${typeof total === 'function' ? total() : total}`,
                  textAlign:'center',
                  fill:'#666',
                  fontSize:'22'
              }
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    center:['50%', '40%'],
                    avoidLabelOverlap: false,
                    selectedMode: 'single',
                    hoverAnimation:false,
                    label: {
                        normal: {
                            show: false,
                             position: 'inside',
                            formatter: '{d}%',
                            color: '#666',
                            fontSize: '22'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: "#FFFFFF", borderWidth: 3,
                        },label:{

                        }
                    },

                    data:obj.SeriesData,
                    color:['rgb(24, 144, 255)',
                        'rgb(19, 194, 194)',
                        'rgb(47, 194, 91)',
                        'rgb(250, 204, 20)',
                        'rgb(240, 72, 100)',
                        '#ca8622',
                        '#bda29a',
                        '#6e7074',
                        '#546570',
                        '#c4ccd3',
                        '#2f4554',]
                }
            ]
        }
    }
    setOption(data,total){
        let SeriesDataItem={},legendDataItem={},
        obj={
            legendData:[],
            SeriesData:[],
            Total:0
        };
        let Total=(typeof total === 'function' ? total() : total).substring(2).replace(",","")
obj.Total=Total;
        data.map((item,key)=>{
            SeriesDataItem[key]={
                value:item.y,
                name:item.x
            }
            legendDataItem[key]={
                icon:'circle',
                name:item.x,
                value:'￥'+item.y,
                percent:((item.y/Total)*100).toFixed(2)+'%',
                textStyle:{
                    borderRadius:3
                }
            }
            obj.legendData.push(legendDataItem[key])
            obj.SeriesData.push(SeriesDataItem[key])
            return obj;
        })

        this.setState({
            option:this.getOption(obj)
        })
    }
    componentDidMount() {
        const {data,total}=this.props;
        this.setOption(data,total)
    }

    componentDidUpdate(preProps) {
        const { data,total} = this.props;
        if (data !== preProps.data) {
            // because of charts data create when rendered
            // so there is a trick for get rendered time
            //this.getLegendData();
            this.setOption(data,total)
        }
    }

    render() {
        return <ReactEcharts option={this.state.option}  lazyUpdate={true} style={{minHeight: 400,}}/>
    }
}

export default Pie;
