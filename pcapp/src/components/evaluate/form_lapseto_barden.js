import React from 'react';
import {FieldArray,Fields, Field, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';
import lodashget from 'lodash.get';

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
    console.log(option);
    return (<Field component={renderPreventivesmeasure_Item_OptionsArray_option} name={option} key={`pmoption${index}`}/>);
  });
};

const renderPreventivesmeasure_Item = (props)=>{
  const {input:{value:vo,onChange,name}} = props;
  console.log(props);
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
  const {input:{value,onChange}} = props;
  const {ispressuresores,//是否发生压疮
    occuredpressuresorestime,//压疮发生时间
    lapsetooptions} = value;
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
          onChange_Ispressuresores(true);
        }
      } onChange={()=>{}}/></span>
      <span>否<input type="checkbox" name="check[]" checked={ispressuresores===0} onClick={
        ()=>{
          onChange_Ispressuresores(false);
        }
      } onChange={()=>{}}/></span>
    </td>
    <td className="w-50">压疮发生时间：
      <input type="text" />年
      <input type="text" />月
      <input type="text" />日
      <input type="text" />:<input type="text" />
    </td>
  </tr>);

  trsz.push(
  <tr  key="title3">
    <td colSpan="2">
      <span>2、患者去向：</span>
      <span>出院/转院<input type="checkbox" name="check[]" checked={lapsetooptions.checkout_checked} onClick={
        ()=>{
          onChange_lapsetooptions_checkout(!lapsetooptions.checkout_checked);
        }
      } onChange={()=>{}}/></span>
      <span>死亡<input type="checkbox" name="check[]" checked={lapsetooptions.death_checked}onClick={
        ()=>{
          onChange_lapsetooptions_death(!lapsetooptions.death_checked);
        }
      } onChange={()=>{}}/></span>
    </td>
  </tr>);
  return trsz;
}

const renderInstruction= (fields)=>{
  const {isunavoidablepressureulcer,instruction} = fields;
  const input_isunavoidablepressureulcer = isunavoidablepressureulcer.input;
  const input_instruction = instruction.input;

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
                 onChangeChecked(true);
               }
             }
           onChange={
          ()=>{}
        }/></span>
        <span>否<input type="checkbox" name="check[]" checked={!input_isunavoidablepressureulcer.value} onClick={
          ()=>{
            onChangeChecked(false);
          }
        }
      onChange={
     ()=>{}
   }/></span>
      </td>
    </tr>);

    trsz.push(<tr key="guide">
        <td colSpan="2">指导意见：<input type="text" {...input_instruction}/></td>
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
    const option = fields.get(j);

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
  const {input:{value,onChange}} = props;
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

//--------

class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit,curpaientinfo,db,app } = this.props;
    const {Hospitalname} = app;

    let trlist = [];
    if(curpaientinfo.Diseaseclassification === '院前压疮'){
      trlist.push(<tr className="gray title" key='admissions'>
          <td>入院时存在以下情况</td>
          <td></td>
        </tr>);
      trlist.push(<FieldArray key="admissionsarray"
                        name="admissions"
                        id="admissions"
                        component={renderAdmissions}
                    />);


      trlist.push(<tr className="gray title" key='evaluateWoundsurfaces'>
        <td colSpan="2">
          <table>
            <tbody>
              <tr>
                <td>部位</td>
                <td>分期</td>
                <td>大小</td>
                <td>情况</td>
              </tr>
              <FieldArray key="evaluateWoundsurfacesarray"
                                  name="evaluateWoundsurfaces"
                                  id="evaluateWoundsurfaces"
                                  component={renderEvaluateWoundsurfaces}
                              />

            </tbody>
          </table>
        </td>
        </tr>);
    }
    else if(curpaientinfo.Diseaseclassification === '压疮高危'){
      trlist.push(<Field key="conditions"
                        name="conditions"
                        id="conditions"
                        component={renderConditions}
                    />);
    }

    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <div className="form-box">

    						<h1>{Hospitalname}转归审阅申请表</h1>
                <ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

    						<table className="choose-info">
    							<tbody>
    							<tr>
    								<td>诊断：</td>
    								<td></td>
    							</tr>
    							<tr>
    								<td>压疮评分：</td>
    								<Field component={renderScore} name="evaluatebardenscore"/>
    							</tr>

                  {trlist}

                  <tr className="gray title">
                    <td>预防措施：</td>
                     <td></td>
                 </tr>
                  <FieldArray
                      name="preventivesmeasure"
                      component={renderPreventivesmeasure} />
    							<tr>
    								<td>申报人：<input type="text" /></td>
    								<td className="w-50">申报时间：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr>
    								<td>护士长签字：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>

                  <Fields names={[ 'instruction', 'isunavoidablepressureulcer' ]} component={renderInstruction}/>


    							<tr>
    								<td>主管部门签字：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>

                  <Field
                      name="lapseto"
                      id="lapseto"
                      component={renderLapseto}
                  />


    							<tr>
    								<td>上报人：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>

    							</tbody>
    						</table>

    				</div>

            <div><button className="ant-btn-edit blue m30-0">提交数据</button></div>
      </Form>);
    }
}


const RetForm = ({formname,formvalues,...rest})=> {
    const FormWrap = reduxForm({
        form: formname,
        initialValues: formvalues
    })(PageForm);

    return <FormWrap {...rest} />
}
export default RetForm;
