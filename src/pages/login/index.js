import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import {PwaInstaller} from '../../components/widget';
import './index.less';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.goLogin(values.userName,values.password)
            }
        });
    }
    //第三方登录待完成
    gitHub=()=>{
        window.location.href='https://github.com/login/oauth/authorize?client_id=Iv1.948e8fbade4c5ce2&redirect_uri=http://localhost:2019/&scope=user&state=reactAdmin';
    }
    componentDidUpdate(nextProps){
        console.log('update')
        const {history,userInfo,location}=this.props;
        // console.log(this.props)
        if(userInfo&&userInfo.token&&userInfo.role){
            const checkedIdStr=JSON.stringify(userInfo)
            sessionStorage.setItem('userInfo',checkedIdStr);
            // sessionStorage.setItem('Token',userInfo.token);
            let RedirectUrl=location.state?'/':'/app/home/index';
            // debugger;
            history.push(RedirectUrl);
        }

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='login'>
                <div className='login-form'>
                    <div className='login-logo'>
                        <span>小黄鸭ADMIN</span>
                        <PwaInstaller/>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth:'300px'}} >
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入账号!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float:'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span >或 现在就去注册!</span>
                            <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                        </p>
                        </FormItem>
                    </Form>

                </div>
            </div>
        );
    }
}

const mapState=state=>({
    userInfo:state.getIn(['login','userInfo'])
});
const mapDispatch=(dispatch)=>({
        goLogin(account,password){
            dispatch(actionCreators.Login(account,password))
        }
});

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default connect(mapState,mapDispatch)(WrappedNormalLoginForm);