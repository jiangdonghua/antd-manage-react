import React, {PureComponent} from 'react';
import {weather} from '../../apis/index'
import moment from 'moment'
import BMap from 'BMap';
class Location extends PureComponent {
    state = {
        city: '北京'
    }
    componentWillMount(){
       this.timer= setInterval(()=>{
            let sysTime=moment().format('YYYY-MM-DD HH:mm:ss');
            this.setState({
                sysTime
            })
        },1000)
        this.getWeatherAPIData();
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getWeatherAPIData(){
        //ip定位 单纯获取城市速度最快
        let myFun=(result)=>{
            this.setState({
                city: result.name
            })
            if(result.name){
                weather(this.state.city).then(res=>{
                    if(res.status==='success'){
                        // console.log(res)
                        let data=res.results[0].weather_data[0];
                        // console.log(moment().hour())
                        let PictureUrl= Number(24)>Number(moment().hour())>Number(18)?data.nightPictureUrl:data.dayPictureUrl;
                        this.setState({
                            dayPictureUrl:PictureUrl,
                            weather:data.weather
                        })
                    }
                })
            }
        }
        const myCity = new BMap.LocalCity();
        myCity.get(myFun);
    }
    componentDidMount() {
        //  const BMAP_STATUS_SUCCESS = 0; //检索成功。对应数值“0”。

        // h5定位 貌似有问题
        // if (navigator.geolocation)
        // {
        //     navigator.geolocation.getCurrentPosition((res)=>{
        //         console.log(res)
        //     });
        // }
        // else{console.log("Geolocation is not supported by this browser.")}


        //浏览器定位
        // let geolocation = new BMap.Geolocation();
        // //定位SDK辅助定位
        // geolocation.enableSDKLocation();
        // geolocation.getCurrentPosition(function (r) {
        //     if (this.getStatus() === BMAP_STATUS_SUCCESS) {
        //         console.log(r.address);
        //         //获取地址
        //         // // 创建地理编码实例
        //         // let myGeo = new BMap.Geocoder();
        //         // // 根据坐标得到地址描述
        //         // myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
        //         //     if (result) {
        //         //         console.log(result)
        //         //     }
        //         // });
        //     } else {
        //         alert('获取当前位置失败,请确定您开启了定位服务');
        //     }
        // },{enableHighAccuracy: true});




    }

    render() {
        return (
            <div className="address pull-right" id="address">
                <span className='current-city'>{this.state.city}</span>
                <span className="current-data">{this.state.sysTime}</span>
                <span className='current-week'>{moment().format('dddd')}</span>
                <span className="weather-img"><img src={this.state.dayPictureUrl} alt="" /></span>
                <span className="weather-detail">{this.state.weather}</span>
            </div>
        )
    }
}

export default Location;



    // var currentLang = 'zh-cn',
    //     snippets = [];
    //
    // function updateSnippets () {
    //     var i;
    //
    //     moment.locale(currentLang);
    //
    //     for (i = 0; i < snippets.length; i++) {
    //         snippets[i].render();
    //     }
    // }
    //
    // function updateClock(){
    //     var now = moment(),
    //         second = now.seconds() * 6,
    //         minute = now.minutes() * 6 + second / 60,
    //         hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;
    //
    //     $('#hour').css("transform", "rotate(" + hour + "deg)");
    //     $('#minute').css("transform", "rotate(" + minute + "deg)");
    //     $('#second').css("transform", "rotate(" + second + "deg)");
    // }
    //
    // function spaces (length) {
    //     var out = "";
    //     while (out.length < length) {
    //         out += " ";
    //     }
    //     return out;
    // }
    //
    // function Snippet (el) {
    //     var longest = 0,
    //         i,
    //         text  = this.text  = el.text().split('\n'),
    //         html  = this.html  = el.html().split('\n'),
    //         evals = this.evals = [];
    //
    //     this.el = el;
    //
    //     for (i = 0; i < text.length; i++) {
    //         longest = Math.max(text[i].length, longest);
    //         evals[i] = new Function('return ' + text[i]);
    //     }
    //
    //     for (i = 0; i < text.length; i++) {
    //         html[i] += spaces(longest - text[i].length);
    //     }
    // }
    //
    // Snippet.prototype.render = function () {
    //     var output = [],
    //         i;
    //
    //     for (i = 0; i < this.html.length; i++) {
    //         output[i] = this.html[i];
    //         output[i] += '<span class="comment"> // ';
    //         output[i] += this.evals[i]();
    //         output[i] += '</span>';
    //     }
    //
    //     this.el.html(output.join('\n'));
    // };
    //
    //
    // function timedUpdate () {
    //     updateClock();
    //     updateSnippets();
    //     setTimeout(timedUpdate, 1000);
    // }
    //
    // $('.page-moment-index code').each(function () {
    //     snippets.push(new Snippet($(this)));
    // });
    //
    // timedUpdate();
    //
    // $(document).on('click', '[data-locale]', function(){
    //     var dom = $(this);
    //     currentLang = dom.data('locale');
    //     $('[data-locale]').removeClass('active');
    //     dom.addClass('active');
    //     updateSnippets();
    // });

