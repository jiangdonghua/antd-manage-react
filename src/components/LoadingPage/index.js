import React from 'react';
import {Spin,Alert,Skeleton} from "antd";
import './loadingPage.less';
const LoadingPage=({isLoading,error})=>{
    if(isLoading){
        return <div className='loading-page'>
            <div className="loading-body">
                <Spin size='large' tip='loading'>
                    <Skeleton avatar paragraph={{row:6}}/>
                </Spin>
            </div>
        </div>
    }else if(error){
        return <div className='loading-page loading-error'>
            <div className="loading-body">
                <Alert
                showIcon
                type='warning'
                message='加载错误'
                description='加载的页面中含有错误！'
                />
            </div>
        </div>
    }
};

export default LoadingPage;

