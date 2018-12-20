import React from 'react';
import { Icon } from 'antd';
import './index.less'

const NumberInfo = ({ title, subTitle, total, subTotal, status, suffix, gap, ...rest }) => (
  <div {...rest} className='numberInfo'>
    {title && (
      <div className="numberInfoTitle" title={typeof title === 'string' ? title : ''}>
        {title}
      </div>
    )}
    {subTitle && (
      <div
        className="numberInfoSubTitle"
        title={typeof subTitle === 'string' ? subTitle : ''}
      >
        {subTitle}
      </div>
    )}
    <div className="numberInfoValue" style={gap ? { marginTop: gap } : null}>
      <span>
        {total}
        {suffix && <em className="suffix">{suffix}</em>}
      </span>
      {(status || subTotal) && (
        <span className="subTotal">
          {subTotal}
          {status && <Icon type={`caret-${status}`} />}
        </span>
      )}
    </div>
  </div>
);

export default NumberInfo;
