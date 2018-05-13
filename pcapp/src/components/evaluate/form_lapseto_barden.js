import React from 'react';
import {FieldArray, Field, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';
import lodashmap from 'lodash.map';

const renderConditions = (props)=>{

    const {input:{value,onChange}} = props;
    console.log(value);
    const {prerequisites,alternative} = value;
    if(!prerequisites || !alternative){
      return [];
    }
    // let tr_prerequisites = [];
    // let tr_alternative = [];

    const onChange_prerequisites = ()=>{

    }
    const onChange_alternative = ()=>{

    }

    let retc = [
      <tr className="gray title" key='canda'>
        <td>必备条件和选择条件</td>
        <td></td>
      </tr>,
      <tr className="gray"  key='canda2'>
        <td>必备条件：强迫体位需要严格限制造成强迫体位的原因</td>
        <td>可选择条件</td>
      </tr>];


    const maxrow = prerequisites.length > alternative.length ? prerequisites.length:alternative.length;

    for(let i = 0 ;i < maxrow; i++){
      let td1 = <td key={`c1_${i}`}></td>;
      let td2 = <td key={`c2_${i}`}></td>;
      if(i < prerequisites.length){
        const v = prerequisites[i];
        td1 = <td key={`c1_${i}`}><input type="checkbox" name="check[]" />{v.name}</td>
      }
      if(i < alternative.length){
        const v = alternative[i];
        td2 = <td key={`c2_${i}`}><input type="checkbox" name="check[]" />{v.name}</td>
      }
      retc.push(<tr key={`tr_${i}`}>{td1}{td2}</tr>);
    }
    return retc;
}

const renderPreventivesmeasure_Item = (props)=>{
  const {input:{value:vo,onChange}} = props;
  if(!!vo.options){
    return (<tr>
      <td colSpan="2">
        <input type="checkbox" name="check[]" />{vo.name}
        {
          lodashmap(vo.options,(vs,index)=>{
            if(vs.value !== undefined){
              return (<span key={`s_${index}`}>{vs.name}<input type="text" className=""  value={vs.value}/></span>);
            }
            return (<span key={`s_${index}`}>{vs.name}<input type="checkbox" name="check[]" /></span>);
          })
        }
      </td>
    </tr>)
  }
  if(vo.value !== undefined){
    return  (<tr><td colSpan="2"><input type="checkbox" name="check[]" />{vo.name}<input type="text" value={vo.value}/></td></tr>);
  }
  return (<tr>
    <td colSpan="2"><input type="checkbox" name="check[]" />
      {vo.name}
    </td>
  </tr>);

  // const onChangeOne = (checked)=>{
  //   onChange({
  //     name:vo.name,
  //     checked
  //   });
  // }
  // if(vo.checked){
  //   return (<td className="blue" onClick={
  //     ()=>{
  //       onChangeOne(false);
  //     }
  //   }>{vo.name}</td>);
  // }
  // return (<td onClick={
  //   ()=>{
  //     onChangeOne(true);
  //   }
  // }>{vo.name}</td>);
}

const renderPreventivesmeasure_Options = (vg, indexg, fields) => {
  return <Field component={renderPreventivesmeasure_Item} name={vg} key={indexg}/>
}

const renderPreventivesmeasure = (props)=>{
  // const {input:{value,onChange}} = props;
  // const preventivesmeasure = value;
  const {fields} = props;
  return fields.map(renderPreventivesmeasure_Options);

  // <tr className="gray title">
  //   <td>预防措施：</td>
  //   <td></td>
  // </tr>
  // <tr>
  //   <td colSpan="2"><input type="checkbox" name="check[]" />
  //   1、告知患者及家压疮属的危险并悬挂“压疮高危”警示标志，进行健康宣教，讲解相关注意事项。
  //   </td>
  // </tr>
  // <tr>
  //   <td colSpan="2"><input type="checkbox" name="check[]" />
  //   2、告知患者及家压疮属的危险并悬挂“压疮高危”警示标志，进行健康宣教，讲解相关注意事项。
  //   </td>
  // </tr>
  // <tr>
  //   <td colSpan="2">
  //     <input type="checkbox" name="check[]" />3、使用：
  //     <span>1)翻身床治疗<input type="checkbox" name="check[]" /></span>
  //     <span>2)翻身床治疗<input type="checkbox" name="check[]" /></span>
  //     <span>3)翻身床治疗<input type="checkbox" name="check[]" /></span>
  //     <span>4)其他：<input type="text" className="" /></span>
  //   </td>
  // </tr>
  // <tr>
  //   <td colSpan="2"><input type="checkbox" name="check[]" />
  //   10、动态评估与记录
  //   </td>
  // </tr>
  // <tr>
  //   <td colSpan="2"><input type="checkbox" name="check[]" />11、其他<input type="text" /></td>
  // </tr>
}

class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit,curpaientinfo,db,app } = this.props;
    console.log(this.props);
    const {Hospitalname} = app;
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
    								<td>分</td>
    							</tr>
                  <Field
                      name="conditions"
                      id="conditions"
                      component={renderConditions}
                  />

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
    							<tr className="gray title">
    								<td colSpan="2">主管部门审核与指导意见</td>
    							</tr>
    							<tr>
    								<td colSpan="2">
    									<input type="checkbox" name="check[]" />符合难免压疮申报的条件：
    									<span>是<input type="checkbox" name="check[]" /></span>
    									<span>否<input type="checkbox" name="check[]" /></span>
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2">指导意见：<input type="text" /></td>
    							</tr>
    							<tr>
    								<td>主管部门签字：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr className="blue title">
    								<td colSpan="2">转归情况：</td>
    							</tr>
    							<tr>
    								<td>
    									<input type="checkbox" name="check[]" />1、是否发生压疮：
    									<span>是<input type="checkbox" name="check[]" /></span>
    									<span>否<input type="checkbox" name="check[]" /></span>
    								</td>
    								<td className="w-50">压疮发生时间：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2">
    									<input type="checkbox" name="check[]" />1、患者去向：
    									<span>出院/转院<input type="checkbox" name="check[]" /></span>
    									<span>死亡<input type="checkbox" name="check[]" /></span>
    								</td>
    							</tr>
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
