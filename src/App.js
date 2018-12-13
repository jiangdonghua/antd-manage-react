import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import store from './store';
import {Provider} from 'react-redux';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Page from './Page';
import "./styles/index.less";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class App extends Component{

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/app/home/index" push />} />
                        <Route path="/app" component={Page} />
                        <Route path="/404" component={NotFound} />
                        <Route path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
export default App;