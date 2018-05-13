import React from 'react';
import lodashget from 'lodash.get';
import moment from 'moment';

const ViewPrintHeader = (props)=>{
  const {curpaientinfo} = props;
  if(!curpaientinfo){
    return <div>无病人信息</div>
  }
  const momentin = moment(curpaientinfo.In_date);
  return (<table className="patient-info">
      <tbody>
        <tr className="elastic">
          <td>姓名：<input type="text" readOnly value={`${lodashget(curpaientinfo,'Patientname','')}`}/></td>
          <td>性别：<input type="text" readOnly value={`${lodashget(curpaientinfo,'SexString','男')}`}/></td>
          <td>年龄：<input type="text" readOnly value={`${lodashget(curpaientinfo,'Age','')}`}/></td>
          <td>住院号：<input type="text"  readOnly value={`${lodashget(curpaientinfo,'Patientno','')}`}/></td>
        </tr>
        <tr className="elastic">
          <td>科室：<input type="text" readOnly value={`${lodashget(curpaientinfo,'DT001','')}`}/></td>
          <td className="w-50">入院日期：
            <input type="text" readOnly value={momentin.format('YYYY')}/>年
            <input type="text" readOnly value={momentin.format('MM')}/>月
            <input type="text" readOnly value={momentin.format('DD')}/>日
            <input type="text" readOnly value={momentin.format('HH')}/>:
            <input type="text" readOnly value={momentin.format('mm')}/>
          </td>
          <td>床号：<input type="text" readOnly value={`${lodashget(curpaientinfo,'Bedno','')}`}/></td>
        </tr>
      </tbody>
    </table>);

}

export default ViewPrintHeader;
