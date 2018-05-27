import React from 'react';
import lodashget from 'lodash.get';
import moment from 'moment';

const style_table = {width:'100%'};
const style_table_tr = {
  padding:'0px 15px',
  display: 'flex'
};
const style_table_td = {
    width: '25%',
    height: '46px',
    lineHeight: '46px',
    fontSize: '14px'
};


const style_table_tr_input = {
  background: 'transparent !important',
  border:'transparent !important',
  borderBottom:'1px solid #646464  !important',
  textAlign: 'center',
  height:'16px',
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: '10px',
};
const style_table_td2 = {
    width:'50%'
};
const style_table_tr_input2 ={width:'10%'};

const style_table_tr_indate = {...style_table_td,...style_table_td2};
const style_table_tr_input_indate = {...style_table_tr_input,...style_table_tr_input2};

const ViewPrintHeader = (props)=>{
  const {curpaientinfo,db} = props;
  const {depats,beds} = db;
  if(!curpaientinfo){
    return <div>无病人信息</div>
  }
  const momentin = moment(curpaientinfo.In_date);
  const Depatname = lodashget(depats,`${curpaientinfo.depatid}.Depatname`,'');
  const Bedname = lodashget(beds,`${curpaientinfo.bedid}.Bedname`,'');
  return (<table style={style_table}>
      <tbody>
        <tr style={style_table_tr}>
          <td style={style_table_td}>姓名：<input style={style_table_tr_input} type="text" readOnly value={`${lodashget(curpaientinfo,'Patientname','')}`}/></td>
          <td style={style_table_td}>性别：<input style={style_table_tr_input} type="text" readOnly value={`${lodashget(curpaientinfo,'SexString','男')}`}/></td>
          <td style={style_table_td}>年龄：<input style={style_table_tr_input} type="text" readOnly value={`${lodashget(curpaientinfo,'Age','')}`}/></td>
          <td style={style_table_td}>住院号：<input style={style_table_tr_input} type="text"  readOnly value={`${lodashget(curpaientinfo,'Patientno','')}`}/></td>
        </tr>
        <tr style={style_table_tr}>
          <td style={style_table_td}>科室：<input style={style_table_tr_input} type="text" readOnly value={`${Depatname}`}/></td>
          <td style={style_table_tr_indate}>入院日期：
            <input style={style_table_tr_input_indate} type="text" readOnly value={momentin.format('YYYY')}/>年
            <input style={style_table_tr_input_indate}  type="text" readOnly value={momentin.format('MM')}/>月
            <input style={style_table_tr_input_indate}  type="text" readOnly value={momentin.format('DD')}/>日
            <input style={style_table_tr_input_indate}  type="text" readOnly value={momentin.format('HH')}/>:
            <input style={style_table_tr_input_indate}  type="text" readOnly value={momentin.format('mm')}/>
          </td>
          <td style={style_table_td}>床号：<input style={style_table_tr_input}  type="text" readOnly value={`${Bedname}`}/></td>
        </tr>
      </tbody>
    </table>);

}

export default ViewPrintHeader;
