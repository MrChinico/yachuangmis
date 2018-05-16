import React from 'react';
// import lodashget from 'lodash.get';
// import moment from 'moment';

const InfoNorecords = (props)=>{
  const {btntitle,onClickNew} = props;
  return (<div className="lapseto center">
    <p>暂无记录,点击这里新建噢</p>
    {
      !!onClickNew &&  (<button  onClick={
            ()=>{
              onClickNew();
            }
          } className="ant-btn"><img src="add.png" alt=""/>新建
          {btntitle}</button>)
    }
  </div>);

}

export default InfoNorecords;
