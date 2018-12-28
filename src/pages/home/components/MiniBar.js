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
    getOption(obj){
        return {
            xAxis: {
                type: 'category',
                data: obj.xData,
                show:false,

            },
            yAxis: {
                type: 'value',
                show:false,

            },
            grid:{
                left:0,
                right:0,
            },
            tooltip: {
                trigger: 'axis',
                textStyle:{
                    color:'rgba(0,0,0,0.65)'
                },
                position: function (pos, params, dom, rect, size) {
                    // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    var obj = {top: 10};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                    return obj;
                },
                backgroundColor:'rgba(255,255,255,0.85)',
                extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
                padding:[5,10, 5 ,10],
                axisPointer: {
                    type: 'none',
                    shadowStyle:'rgba(24, 144, 255, 0.1)',
                    label: {
                        formatter: function (params) {
                            console.log(params)
                            return  params.value;
                        }
                    }
                }
            },
            series: [{
                data: obj.SeriesData,
                type: 'bar',
                smooth: true,
                showSymbol: false,
                barWidth:8,
                barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
                barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
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
        let  obj={
            xData:[] ,
            SeriesData:[]
        };
        data.map((item)=>{
            obj.xData.push(item.x);
            obj.SeriesData.push(item.y);
            return obj;
        })
        //return 返回多个值最好用数组或者对象包裹，这里懒得改了
        this.setState({
            option:this.getOption(obj)
        })
    }
    render() {

        const {
            height
        } = this.props;
        return (
            <ReactEcharts option={this.state.option}  style={{height: height+10, width: '373'}} notMerge={true} lazyUpdate={true} className={'react_for_echarts'}/>
        );
    }
}

export default MiniArea;
