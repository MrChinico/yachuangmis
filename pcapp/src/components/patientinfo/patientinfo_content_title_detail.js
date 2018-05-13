import React from 'react';
import lodashget from 'lodash.get';

const TitleDetail = (props)=>{
  const {curpaientinfo,db} = props;
  const {depats,beds} = db;
  console.log(curpaientinfo);
  return (<ul>
      <li>病人分类：<span className="on">{lodashget(curpaientinfo,'In_diagnosis','')}</span></li>
      <li>病人姓名：{lodashget(curpaientinfo,'Patientname','')}</li>
      <li>性别：{lodashget(curpaientinfo,'SexString','男')}</li>
      <li>住院时间：{lodashget(curpaientinfo,'In_date','')}</li>
      <li>床号：{lodashget(beds,`${curpaientinfo.bedid}.Bedno`,'')}</li>
      <li>所在科室：{lodashget(depats,`${curpaientinfo.depatid}.Depatname`,'')}</li>
      <div className="clearfix"></div>
    </ul>);
}

export default TitleDetail;
