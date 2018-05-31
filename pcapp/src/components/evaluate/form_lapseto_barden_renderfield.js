import React from 'react';
import {FieldArray,Field, } from 'redux-form';
import lodashget from 'lodash.get';
// import { Popconfirm } from 'antd';
import {popConfirmSign,popConfirmBack} from './popconfirmsign';
import moment from 'moment';

const renderConditions_prerequisites_options = (props)=>{
  const {input:{value,onChange}} = props;
  const v = value;
  return (<tr><td><input type="checkbox" name="check[]" checked={v.checked} onClick={
    ()=>{
      onChange({
        name:v.name,
        checked:!v.checked
      });
    }
  } onChange={()=>{}}/>{v.name}</td></tr>);
}


const renderConditions_alternative_options = (props)=>{
  const {input:{value,onChange}} = props;

  const v = value;
  return (<tr><td><input type="checkbox" name="check[]" checked={v.checked} onClick={
    ()=>{
      onChange({
        name:v.name,
        checked:!v.checked
      });
    }
  } onChange={()=>{}}/>{v.name}</td></tr>);
}

const renderConditions_prerequisites = (props) => {
  const {fields} = props;
  return fields.map((option,index)=>{
    return (<Field component={renderConditions_prerequisites_options} name={option} key={`p${index}`}/>);
  });
}

const renderConditions_alternative = (props) => {
  const {fields} = props;
  return fields.map((option,index)=>{
    return (<Field component={renderConditions_alternative_options} name={option} key={`c${index}`}/>);
  });
}


const renderConditions = (props)=>{
    const {input:{value}} = props;
    const {prerequisites,alternative} = value;
    if(!prerequisites || !alternative){
      return [];
    }

    const retc = [
      <tr className="gray title" key='canda'>
        <td>必备条件和选择条件</td>
        <td></td>
      </tr>,
      <tr className="gray"  key='canda2'>
        <td>必备条件：强迫体位需要严格限制造成强迫体位的原因</td>
        <td>
          可选择条件
        </td>
      </tr>,
      <tr className="gray"  key='canda3'>
        <td className="va_top p0">
          <table>
            <tbody>
              <FieldArray
              name="conditions.prerequisites"
              component={renderConditions_prerequisites} key='cp' />
            </tbody>
          </table>
        </td>
        <td className="va_top p0">
          <table>
            <tbody>
              <FieldArray
                  name="conditions.alternative"
                  component={renderConditions_alternative}  key='ca'/>
            </tbody>
          </table>
        </td>
      </tr>
    ];
    return retc;
}



const renderPreventivesmeasure_Item_OptionsArray_option = (props)=>{
  const {input:{value:vs,onChange}} = props;

  if(vs.value !== undefined){
    return (<span >{vs.name}
      <input type="text" className=""  value={vs.value}  onChange={
        (e)=>{
          onChange({
            name:vs.name,
            value:e.target.value
          });
        }
      }/></span>);
  }
  return (<span>{vs.name}<input type="checkbox" name="check[]" checked={vs.checked}
    onClick={
     ()=>{
       onChange({
         name:vs.name,
         checked:!vs.checked,
       });
     }
   } onChange={()=>{}}/></span>);
}

const renderPreventivesmeasure_Item_OptionsArray = (props)=>{
  const {fields} = props;
  return fields.map((option,index)=>{
    return (<Field component={renderPreventivesmeasure_Item_OptionsArray_option} name={option} key={`pmoption${index}`}/>);
  });
};


const renderPreventivesmeasure_Item = (props)=>{
  const {input:{value:vo,onChange,name}} = props;
  if(!!vo.options && vo.options.length>0){
    return (<tr>
      <td colSpan="2">
        <input type="checkbox" name="check[]" onClick={
          ()=>{
            onChange({
              name:vo.name,
              checked:!vo.checked,
              options:vo.options
            });
          }
        } onChange={()=>{}}/>{vo.name}
        <FieldArray
            name={`${name}.options`}
            component={renderPreventivesmeasure_Item_OptionsArray} />
      </td>
    </tr>)
  }
  if(vo.value !== undefined){
    return  (<tr><td colSpan="2">
      <input type="checkbox" name="check[]" checked={vo.checked} onClick={
        ()=>{
          onChange({
            name:vo.name,
            checked:!vo.checked,
            value:vo.value
          });
        }
      } onChange={()=>{}}
      />
        {vo.name}<input type="text" value={vo.value} onChange={
          (e)=>{
            onChange({
              name:vo.name,
              checked:vo.checked,
              value:e.target.value
            });
          }
        }/>
      </td>
    </tr>);
  }

  return (<tr>
    <td colSpan="2"><input type="checkbox" name="check[]" checked={vo.checked}  onClick={
      ()=>{
        onChange({
          name:vo.name,
          checked:!vo.checked
        });
      }
    } onChange={()=>{}}/>
      {vo.name}
    </td>
  </tr>);
}

const renderPreventivesmeasure = (props)=>{
  const {fields} = props;
  return fields.map((option,index)=>{
    return (<Field component={renderPreventivesmeasure_Item} name={option} key={`pm${index}`}/>);
  });
}


const renderScore = (props)=>{
  const {input:{value}} = props;
  return (<td>{value}分</td>);
}

const renderLapseto= (props)=>{
  const {lapseto,stagestatus} = props;
  const {input:{value,onChange}} = lapseto;
  const {ispressuresores,//是否发生压疮
    occuredpressuresorestime,//压疮发生时间
    lapsetooptions} = value;

   const isshowbtn = //lodashget(userlogin,'permission.name','') === '护理部主管' &&
    (lodashget(stagestatus,'input.value','') === '已上报' || lodashget(stagestatus,'input.value','') === '已审核');

  if(value === ''){
    return <tr />;
  }
  const onChange_Ispressuresores = (checked)=>{
    onChange({
      ispressuresores:checked?1:0,
      occuredpressuresorestime,
      lapsetooptions
    });
  }
  const onChange_lapsetooptions_checkout = (checked)=>{
    onChange({
      ispressuresores,
      occuredpressuresorestime,
      lapsetooptions:{
        checkout_checked:checked,
        death_checked:lapsetooptions.death_checked
      }
    });
  }
  const onChange_lapsetooptions_death = (checked)=>{
    onChange({
      ispressuresores,
      occuredpressuresorestime,
      lapsetooptions:{
        checkout_checked:lapsetooptions.checkout_checked,
        death_checked:checked
      }
    });
  }
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = lodashget(occuredpressuresorestime,'input.value');
  if(!!time_input_value){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');
  }
  const isReadOnly = !isshowbtn;
  let trsz = [];
  trsz.push(<tr className="blue title" key="title">
      <td colSpan="2">转归情况：</td>
    </tr>);

  trsz.push(
  <tr  key="title2">
    <td>
      <span>1、是否发生压疮：</span>
      <span>是<input type="checkbox" name="check[]" checked={ispressuresores===1} onClick={
        ()=>{
          if(!isReadOnly){
            onChange_Ispressuresores(true);
          }
        }
      } onChange={()=>{}} readOnly={isReadOnly}/></span>
      <span>否<input type="checkbox" name="check[]" checked={ispressuresores===0} onClick={
        ()=>{
          if(!isReadOnly){
            onChange_Ispressuresores(false);
          }
        }
      } onChange={()=>{}}  readOnly={isReadOnly}/></span>
    </td>
    <td className="w-50">压疮发生时间：
      <input type="text" value={MYY} readOnly/>年
      <input type="text" value={MMM} readOnly/>月
      <input type="text" value={MDD} readOnly/>日
      <input type="text" value={MHH} readOnly/>:
      <input type="text" value={Mmm} readOnly/>
    </td>
  </tr>);

  trsz.push(
  <tr  key="title3">
    <td colSpan="2">
      <span>2、患者去向：</span>
      <span>出院/转院<input type="checkbox" name="check[]" checked={lapsetooptions.checkout_checked} onClick={
        ()=>{
          if(!isReadOnly){
            onChange_lapsetooptions_checkout(!lapsetooptions.checkout_checked);
          }
        }
      } onChange={()=>{}}  readOnly={isReadOnly}/></span>
      <span>死亡<input type="checkbox" name="check[]" checked={lapsetooptions.death_checked} onClick={
        ()=>{
          if(!isReadOnly){
            onChange_lapsetooptions_death(!lapsetooptions.death_checked);
          }
        }
      } onChange={()=>{}}  readOnly={isReadOnly}/></span>
    </td>
  </tr>);
  return trsz;
}

const renderInstruction= (fields)=>{
  const {isunavoidablepressureulcer,instruction,stagestatus,userlogin} = fields;
  const input_isunavoidablepressureulcer = isunavoidablepressureulcer.input;
  const input_instruction = instruction.input;

  const isshowbtn = (lodashget(userlogin,'permission.name','') === '护理部主管')
  && (lodashget(stagestatus,'input.value','') === '护理部审核中' || lodashget(stagestatus,'input.value','') === '已审核');

  let isReadOnly = !isshowbtn;//如果自己是护士长并且正在护士长审核中

  const onChangeChecked = (checked)=>{
      input_isunavoidablepressureulcer.onChange(checked?1:0);
  }
  let trsz = [];
  trsz.push(<tr className="gray title" key="title">
    <td colSpan="2">主管部门审核与指导意见</td>
  </tr>);

  trsz.push(<tr key="in">
      <td colSpan="2">
        <span>符合难免压疮申报的条件：</span>
        <span>是<input type="checkbox" name="check[]" checked={input_isunavoidablepressureulcer.value}
             onClick={
               ()=>{
                 if(!isReadOnly){
                   onChangeChecked(true);
                 }
               }
             }
           onChange={
          ()=>{}
        } readOnly={isReadOnly}/></span>
        <span>否<input type="checkbox" name="check[]" checked={!input_isunavoidablepressureulcer.value} onClick={
          ()=>{
            if(!isReadOnly){
              onChangeChecked(false);
            }
          }
        }
      onChange={
     ()=>{}
   } readOnly={isReadOnly}/></span>
      </td>
    </tr>);

    trsz.push(<tr key="guide">
        <td colSpan="2">指导意见：<input type="text" {...input_instruction} readOnly={isReadOnly}/></td>
      </tr>);

  return trsz;
}

//--------
const renderAdmissions_Item = (props)=>{
  const {input:{value,onChange}} = props;
  const v = value;

  return (<td><input type="checkbox" name="check[]" checked={v.checked} onClick={
    ()=>{
      onChange({
        name:v.name,
        checked:!v.checked
      });
    }
  } onChange={()=>{}}/>{v.name}</td>);
}


const renderAdmissions = (props)=>{
  const {fields} = props;
  let options = [];
  let retc = [];
  for(let j = 0 ;j < fields.length; j++){
    // const option = fields.get(j);

    options.push(<Field component={renderAdmissions_Item} name={`admissions[${j}]`} key={`admissions${j}`}/>);
  }

  if(options.length % 2 === 1){
    options.push(<td key='ad'></td>);
  }

  const halflength = options.length/2;
  for(let i = 0 ;i < halflength; i++){
    retc.push(<tr key={`options${i}`}>
      {options[i]}
      {options[halflength+i]}
    </tr>)
  }

  return retc;
}

const renderEvaluateWoundsurfaces_Item = (props)=>{
  const {input:{value}} = props;
  return (
    <tr>
      <td key="tdwf0">{lodashget(value,'部位','')}</td>
      <td key="tdwf1">{lodashget(value,'分期','')}</td>
      <td key="tdwf2">{lodashget(value,'大小','')}</td>
      <td key="tdwf3">{lodashget(value,'情况','')}</td>
    </tr>
  );
}


const renderEvaluateWoundsurfaces =  (props)=>{
  const {fields} = props;
  return fields.map((option,index)=>{
    return (<Field component={renderEvaluateWoundsurfaces_Item} name={option} key={`ewf${index}`}/>);
  });
}



const renderUserSignedNurse= (fields)=>{
  const {signed_nurse,signed_nurse_time,stagestatus,userlogin,db} = fields;
  const isenabled =  (lodashget(userlogin,'permission.name','') === '护士' || lodashget(userlogin,'permission.name','') === '护士长') &&
    lodashget(stagestatus,'input.value','') === '未审核';
  let Staffname = lodashget(db,`users.${lodashget(signed_nurse,'input.value','')}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = lodashget(signed_nurse_time,'input.value');
  if(!!time_input_value){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');
  }

  const onConfirm = ()=>{
    if(isenabled){
      let initmoment = moment();
      popConfirmSign(initmoment,(resultmoment)=>{
        const userid = userlogin._id;
        const moments = resultmoment.format('YYYY-MM-DD HH:mm:ss');
        signed_nurse.input.onChange(userid);
        signed_nurse_time.input.onChange(moments);
        stagestatus.input.onChange('护士长审核中');
      });
    }
    else{
      popConfirmBack(()=>{
        signed_nurse.input.onChange(null);
        signed_nurse_time.input.onChange(null);
        stagestatus.input.onChange('未审核');
      });
    }
  };
  const isshowbtn = (lodashget(userlogin,'permission.name','') === '护士' || lodashget(userlogin,'permission.name','') === '护士长')
  && (lodashget(stagestatus,'input.value','') === '未审核' || lodashget(stagestatus,'input.value','') === '护士长审核中');
  const btntitle = isenabled?'签名':'回退';
  const Co = (<tr>
      <td>申报人签字：<input type="text" readOnly value={Staffname}/>
      {isshowbtn && <button  type="button" onClick={onConfirm} className="ant-btn-edit blue">{btntitle}</button>}
      </td>
      <td className="w-50">申报时间：
          <input type="text" readOnly value={MYY}/>年
          <input type="text" readOnly value={MMM}/>月
          <input type="text" readOnly value={MDD}/>日
          <input type="text" readOnly value={MHH}/>:
          <input type="text" readOnly value={Mmm}/>
      </td>
    </tr>);
  return Co;
}

const renderUserSignedHeadNurse= (fields)=>{
  const {signed_headnurse,signed_headnurse_time,stagestatus,userlogin,db} = fields;
  const isenabled = lodashget(stagestatus,'input.value','') === '护士长审核中' &&
    lodashget(userlogin,'permission.name','') === '护士长';//如果自己是护士长并且正在护士长审核中

  let Staffname = lodashget(db,`users.${lodashget(signed_headnurse,'input.value','')}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = lodashget(signed_headnurse_time,'input.value');
  if(!!time_input_value){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }

  const onConfirm = ()=>{
    if(isenabled){
      let initmoment = moment();
      popConfirmSign(initmoment,(resultmoment)=>{
        const userid = userlogin._id;
        const moments = resultmoment.format('YYYY-MM-DD HH:mm:ss');
        signed_headnurse.input.onChange(userid);
        signed_headnurse_time.input.onChange(moments);
        stagestatus.input.onChange('护理部审核中');
      });
    }
    else{
      popConfirmBack(()=>{
        signed_headnurse.input.onChange(null);
        signed_headnurse_time.input.onChange(null);
        stagestatus.input.onChange('护士长审核中');
      });
    }
  };
  const isshowbtn = lodashget(userlogin,'permission.name','') === '护士长' &&
    (lodashget(stagestatus,'input.value','') === '护士长审核中' || lodashget(stagestatus,'input.value','') === '护理部审核中');
  const btntitle = isenabled?'签名':'回退';
  const Co = (<tr>
      <td>护士长签字：<input type="text" readOnly value={Staffname}/>
      {isshowbtn && <button type="button" onClick={onConfirm} className="ant-btn-edit blue">{btntitle}</button>}
      </td>
      <td className="w-50">日期：
          <input type="text" readOnly value={MYY}/>年
          <input type="text" readOnly value={MMM}/>月
          <input type="text" readOnly value={MDD}/>日
          <input type="text" readOnly value={MHH}/>:
          <input type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


const renderUserSignedNursingDepartment= (fields)=>{
  const {signed_nursingdepartment,signed_nursingdepartment_time,stagestatus,userlogin,db} = fields;
  const isenabled = lodashget(stagestatus,'input.value','') === '护理部审核中' &&
    lodashget(userlogin,'permission.name','') === '护理部主管';//如果自己是护理部主管并且正在护理部审核中

  let Staffname = lodashget(db,`users.${lodashget(signed_nursingdepartment,'input.value','')}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = lodashget(signed_nursingdepartment_time,'input.value');
  if(!!time_input_value){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');
  }
  const onConfirm = ()=>{
    if(isenabled){
      let initmoment = moment();
      popConfirmSign(initmoment,(resultmoment)=>{
        const userid = userlogin._id;
        const moments = resultmoment.format('YYYY-MM-DD HH:mm:ss');
        signed_nursingdepartment.input.onChange(userid);
        signed_nursingdepartment_time.input.onChange(moments);
        stagestatus.input.onChange('已审核');
      });
    }
    else{
      popConfirmBack(()=>{
        signed_nursingdepartment.input.onChange(null);
        signed_nursingdepartment_time.input.onChange(null);
        stagestatus.input.onChange('护理部审核中');
      });
    }
  };
  const isshowbtn = (lodashget(userlogin,'permission.name','') === '护理部主管')
  && (lodashget(stagestatus,'input.value','') === '护理部审核中' || lodashget(stagestatus,'input.value','') === '已审核');
  const btntitle = isenabled?'签名':'回退';
  const Co = (<tr>
      <td>主管部门签字：<input type="text" readOnly value={Staffname}/>
      {isshowbtn && <button  type="button" onClick={onConfirm} className="ant-btn-edit blue">{btntitle}</button>}
      </td>
      <td className="w-50">日期：
          <input type="text" readOnly value={MYY}/>年
          <input type="text" readOnly value={MMM}/>月
          <input type="text" readOnly value={MDD}/>日
          <input type="text" readOnly value={MHH}/>:
          <input type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


const renderUserReport= (fields)=>{
  const {signed_report,signed_report_time,stagestatus,userlogin,db} = fields;
  const isenabled = 
    lodashget(stagestatus,'input.value','') === '已审核';//如果自己是护理部主管并且正在护理部审核中

  let Staffname = lodashget(db,`users.${lodashget(signed_report,'input.value','')}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = lodashget(signed_report_time,'input.value');
  if(!!time_input_value){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');
  }

  const onConfirm = ()=>{
    if(isenabled){
      let initmoment = moment();
      popConfirmSign(initmoment,(resultmoment)=>{
        const userid = userlogin._id;
        const moments = resultmoment.format('YYYY-MM-DD HH:mm:ss');
        signed_report.input.onChange(userid);
        signed_report_time.input.onChange(moments);
        stagestatus.input.onChange('已上报');
      });
    }
    else{
      popConfirmBack(()=>{
        signed_report.input.onChange(null);
        signed_report_time.input.onChange(null);
        stagestatus.input.onChange('已审核');
      });
    }
  };
  const isshowbtn =
  (lodashget(stagestatus,'input.value','') === '已上报' || lodashget(stagestatus,'input.value','') === '已审核');

  const btntitle = isenabled?'签名':'回退';
  const Co = (<tr>
      <td>上报人签字:<input type="text" readOnly value={Staffname}/>
      {isshowbtn && <button type="button" onClick={onConfirm} className="ant-btn-edit blue">{btntitle}</button>}
      </td>
      <td className="w-50">日期：
          <input type="text" readOnly value={MYY}/>年
          <input type="text" readOnly value={MMM}/>月
          <input type="text" readOnly value={MDD}/>日
          <input type="text" readOnly value={MHH}/>:
          <input type="text" readOnly value={Mmm}/>
      </td>
    </tr>);

  return Co;
}


export {
  renderConditions_prerequisites_options,
  renderConditions_alternative_options,
  renderConditions_prerequisites,
  renderConditions_alternative,
  renderConditions,
  renderPreventivesmeasure_Item_OptionsArray_option,
  renderPreventivesmeasure_Item_OptionsArray,
  renderPreventivesmeasure_Item,
  renderPreventivesmeasure,
  renderScore,
  renderLapseto,
  renderInstruction,
  renderAdmissions_Item,
  renderAdmissions,
  renderEvaluateWoundsurfaces_Item,
  renderEvaluateWoundsurfaces,
  renderUserSignedNurse,
  renderUserSignedHeadNurse,
  renderUserSignedNursingDepartment,
  renderUserReport
};
