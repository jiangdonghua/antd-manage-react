import React,{Component} from 'react';
import {Route,Switch,Redirect,withRouter} from "react-router-dom";
import AllComponents from '../pages';
import routesConfig from './config';
import {connect} from 'react-redux';

import queryString from 'query-string';


class CRouter extends Component{
    // requireAuth=()=>{  //鉴权待完成
    //
    // }
    state={
        login:true
    }
    requireLogin=(component,permission)=>{
        console.log(this.props)
        const {userInfo}=this.props;
        if(permission){}
        return component
    }
    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        routesConfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];

                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={props => {

                                            const reg = /\?\S*/g;
                                            // 匹配?及其以后字符串
                                            const queryParams = window.location.hash.match(reg);
                                            // 去除?的参数
                                            const { params } = props.match;
                                            Object.keys(params).forEach(key => {
                                                params[key] = params[key] && params[key].replace(reg, '');
                                            });
                                            props.match.params = { ...params };
                                            const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                                            return this.state.login ? <Component {...merge} /> : this.requireLogin(<Component {...merge} />)
                                        }}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }

}
// redux拿到token并挂载到App的props上面
const mapState=state=>({
    userInfo:state.getIn(['login','userInfo'])
});


export default withRouter(connect(mapState,null)(CRouter));