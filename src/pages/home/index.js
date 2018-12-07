import React, {Component} from 'react';

import BreadcrumbCustom from '../../components/BreadCrumb';


class Home extends Component{
    render() {
        return (
           <div className='gutter-example button-demo'>
               <BreadcrumbCustom/>
           </div>
        );
    }
}
export default Home;