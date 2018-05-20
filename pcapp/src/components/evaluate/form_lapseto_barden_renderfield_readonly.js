import React from 'react';
import lodashget from 'lodash.get';


const CRenderConditionsprerequisitesoptions = (props)=>{
  const {info} = props;
  const v = info;
  return (<tr><td><input type="checkbox" name="check[]" checked={v.checked} readOnly/>{v.name}</td></tr>);
}


const CRenderConditionsalternativeoptions = (props)=>{
  const {info} = props;

  const v = info;
  return (<tr><td><input type="checkbox" name="check[]" checked={v.checked} readOnly/>{v.name}</td></tr>);
}

const CRenderConditionsprerequisites = (props) => {
  const {info} = props;
	let trsz = [];
	for(let i = 0 ;i < info.length ;i++){
		trsz.push(<CRenderConditionsprerequisitesoptions info={info[i]} key={`p${i}`}/>);
	}
  return trsz;
}

const CRenderConditionsalternative = (props) => {
	const {info} = props;
	let trsz = [];
	for(let i = 0 ;i < info.length ;i++){
		trsz.push(<CRenderConditionsalternativeoptions info={info[i]} key={`a${i}`} />);
	}
	return trsz;
}


const CRenderConditions = (props)=>{
    const {prerequisites,alternative} = props.conditions;
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
          <table style={{textAlign:'left'}}>
            <tbody>
							<CRenderConditionsprerequisites info={prerequisites} />
            </tbody>
          </table>
        </td>
        <td className="va_top p0">
          <table style={{textAlign:'left'}}>
            <tbody>
							<CRenderConditionsalternative info={alternative} />
            </tbody>
          </table>
        </td>
      </tr>
    ];
    return retc;
}

const CRenderPreventivesmeasureItemOptionsArrayoption = (props)=>{
  const {info:vs} = props;

  if(vs.value !== undefined){
    return (<span >{vs.name}
      <input type="text" className=""  value={vs.value}  readOnly/></span>);
  }
  return (<span>{vs.name}<input type="checkbox" name="check[]" checked={vs.checked}
  readOnly/></span>);
}


const CRenderPreventivesmeasureItemOptionsArray = (props)=>{
  const {options} = props;
	let trsz = [];
	for(let i = 0 ;i < options.length ;i++){
		trsz.push(<CRenderPreventivesmeasureItemOptionsArrayoption info={options[i]} key={`pmoption${i}`}/>);
	}
  return trsz;
};

const CRenderPreventivesmeasureItem = (props)=>{
  const {info:vo} = props;
  console.log(props);
  if(!!vo.options && vo.options.length>0){
    return (<tr>
      <td colSpan="2">
        <input type="checkbox" name="check[]" readOnly/>{vo.name}
				<CRenderPreventivesmeasureItemOptionsArray options={vo.options} />
      </td>
    </tr>)
  }
  if(vo.value !== undefined){
    return  (<tr><td colSpan="2">
      <input type="checkbox" name="check[]" checked={vo.checked} readOnly
      />
        {vo.name}<input type="text" value={vo.value} readOnly/>
      </td>
    </tr>);
  }

  return (<tr>
    <td colSpan="2"><input type="checkbox" name="check[]" checked={vo.checked} readOnly/>
      {vo.name}
    </td>
  </tr>);
}



const CRenderPreventivesmeasure = (props)=>{
  const {preventivesmeasure} = props;
	let trsz = [];
	for(let i = 0 ;i < preventivesmeasure.length ;i ++){
		trsz.push(<CRenderPreventivesmeasureItem key={`pm${i}`} info={preventivesmeasure[i]}/>);
	}
  return trsz;
}

const CRenderScore = (props)=>{
  const {evaluatebardenscore} = props;
  return (<td>{evaluatebardenscore}分</td>);
}

const CRenderLapseto= (props)=>{
  const {lapseto} = props;
  const {ispressuresores,//是否发生压疮
    occuredpressuresorestime,//压疮发生时间
    lapsetooptions} = lapseto;

  let trsz = [];
  trsz.push(<tr className="blue title" key="title">
      <td colSpan="2">转归情况：</td>
    </tr>);

  trsz.push(
  <tr  key="title2">
    <td>
      <span>1、是否发生压疮：</span>
      <span>是<input type="checkbox" name="check[]" checked={ispressuresores===1} readOnly/></span>
      <span>否<input type="checkbox" name="check[]" checked={ispressuresores===0} readOnly/></span>
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
      <span>出院/转院<input type="checkbox" name="check[]" checked={lapsetooptions.checkout_checked} readOnly/></span>
      <span>死亡<input type="checkbox" name="check[]" checked={lapsetooptions.death_checked} readOnly/></span>
    </td>
  </tr>);
  return trsz;
}

const CRenderInstruction= (props)=>{
  const {isunavoidablepressureulcer,instruction} = props;

  let trsz = [];
  trsz.push(<tr className="gray title" key="title">
    <td colSpan="2">主管部门审核与指导意见</td>
  </tr>);

  trsz.push(<tr key="in">
      <td colSpan="2">
        <span>符合难免压疮申报的条件：</span>
        <span>是<input type="checkbox" name="check[]" checked={isunavoidablepressureulcer} readOnly/></span>
        <span>否<input type="checkbox" name="check[]" checked={!isunavoidablepressureulcer} readOnly/></span>
      </td>
    </tr>);

    trsz.push(<tr key="guide">
        <td colSpan="2">指导意见：<input type="text" value={instruction} readOnly/></td>
      </tr>);

  return trsz;
}


//--------


const CRenderAdmissions = (props)=>{
  const {admissions} = props;

  let options = [];
  let retc = [];
  for(let j = 0 ;j < admissions.length; j++){
    const v = admissions[j];
    options.push(<td><input type="checkbox" name="check[]" checked={v.checked} readOnly/> {v.name}</td>);
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


const CRenderEvaluateWoundsurfaces =  (props)=>{
  const {evaluateWoundsurfaces} = props;
  let trsz = [];
  for(let i = 0 ;i < evaluateWoundsurfaces.length ; i++){
    const value = evaluateWoundsurfaces[i];
    trsz.push(
      <tr>
        <td key="tdwf0">{lodashget(value,'部位','')}</td>
        <td key="tdwf1">{lodashget(value,'分期','')}</td>
        <td key="tdwf2">{lodashget(value,'大小','')}</td>
        <td key="tdwf3">{lodashget(value,'情况','')}</td>
      </tr>
    );
  }
  return trsz;
}


export {
  CRenderConditionsprerequisitesoptions,
  CRenderConditionsalternativeoptions,
  CRenderConditionsprerequisites,
  CRenderConditionsalternative,
  CRenderConditions,
  CRenderPreventivesmeasureItemOptionsArrayoption,
  CRenderPreventivesmeasureItemOptionsArray,
  CRenderPreventivesmeasureItem,
  CRenderPreventivesmeasure,
  CRenderScore,
  CRenderLapseto,
  CRenderInstruction,
  CRenderAdmissions,
  CRenderEvaluateWoundsurfaces
};
