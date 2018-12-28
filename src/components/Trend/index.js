import React from 'react';
import { Icon } from 'antd';
import './index.less';

const Trend = ({ colorful = true, reverseColor = false, flag, children, className='', ...rest }) => {
  return (
    <div {...rest} className={[`trendItem ${className} ${!colorful?'trendItemGrey':''} ${!(reverseColor && colorful)?'reverseColor':''}`]} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && (
        <span className={flag}>
          <Icon type={`caret-${flag}`} />
        </span>
      )}
    </div>
  );
};

export default Trend;
