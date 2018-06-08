/**
 * form_template.js | 转归与申报表格模板
 */

import React      from 'react';
import lodashget  from 'lodash.get';
import lodashmap  from 'lodash.map';
import moment     from 'moment';

import './form_tamplate_style.styl'

const FormSign = (props) => {
  const {info,db} = props;
  const {isunavoidablepressureulcer,instruction,signed_nursingdepartment} = info;
  let Staffname = lodashget(db,`users.${signed_nursingdepartment}.Staffname`,'');
  let MYY = '';
  let MMM = '';
  let MDD = '';
  let MHH = '';
  let Mmm = '';

  const time_input_value = signed_nursingdepartment;
  if(!!time_input_value){
    const momenttime = moment(time_input_value);
    MYY = momenttime.format('YYYY');
    MMM = momenttime.format('MM');
    MDD = momenttime.format('DD');
    MHH = momenttime.format('HH');
    Mmm = momenttime.format('mm');

  }

  return (
    <div className = "form-sign column flex-1">
      <div className = "opinion column">
        <div>
          <div className = "flex-1 center-y">主管部门审核与指导意见：</div>
          <div className = "flex-1 center-y">
            <span className = "check">情况属实</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={isunavoidablepressureulcer} />是</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={isunavoidablepressureulcer} />否</span>
          </div>
        </div>
        <div className = "flex-1">
          <div><span className = "opinion">{instruction}</span></div>
        </div>
        <div>
          <div className = "flex-1">主管部门签字：{Staffname}</div>
          <div className = "flex-1">
            日期：
            <span>{MYY}</span>年
            <span>{MMM}</span>月
            <span>{MDD}</span>日
            <span>{MHH}</span>:
            <span>{Mmm}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 护理措施2 （临时）
const FormMeasuress = props => {
  let elements = [];
  lodashmap( props.listObj,( element, index ) => {
    if( !(index === 10 || index === 11) )
    elements.push(
      <div className = "center-y" key={ index }>
        <input type="checkbox" checked = { element.checked } name="check[]" readOnly/>
        { element.name }
      </div>
    )
  })
  return (
    <div className = "form-measures column">
      <div>护理措施：</div>
      { elements }
    </div>
  )
}

// 护理措施模块
const FormMeasures = props => {
  let elements = [];
  lodashmap( props.listObj,( element, index ) => {
    elements.push(
      <div className = "center-y" key={ index }>
        <input type="checkbox" checked = { element.checked } name="check[]" readOnly/>
        { element.name }
      </div>
    )
  })
  return (
    <div className = "form-measures column">
      <div>护理措施：</div>
      { elements }
    </div>
  )
}

// 压疮部位观察模块
const FormObservation = props => {
  let count = 0;
  let elements = [];
  lodashmap( props.listObj,( element, index ) => {
    elements.push(
      <div className = "no-content" key={ index }>
        <div className = "flex-1">{ lodashget( element, '部位', '' ) }</div>
        <div className = "flex-1">{ lodashget( element, '分期', '' ) }</div>
        <div className = "flex-2">{ lodashget( element, '大小', '') }</div>
        <div className = "flex-3">{ lodashget( element, '情况', '') }</div>
      </div>
    )
    count = index
  })
  while ( ++count < 4 )
  {
    elements.push(
      <div className = "no-content" key={ count }>
        <div className = "flex-1"></div>
        <div className = "flex-1"></div>
        <div className = "flex-2"></div>
        <div className = "flex-3"></div>
      </div>
    )
  }
  return (
    <div className = "form-observation column">
      <div  className = "no-content">
        <div className = "flex-1">部位</div>
        <div className = "flex-1">分期</div>
        <div className = "flex-2">大小</div>
        <div className = "flex-3">情况</div>
      </div>
      { elements }
    </div>
  )
}

// 难免情况模块
const UnavoidableOptions = props => {
  const {conditions} = props;
  const prerequisites = lodashget(conditions,'prerequisites',[]);
  const alternative = lodashget(conditions,'alternative',[]);
  let optionsLeft   =  [];    // 左el组
  let  optionsRight  = [];   // 右el组

  lodashmap(prerequisites,( element, index ) => {
    optionsLeft.push(
      <div className = "center-y" key = { index }>
        <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
      </div>
    )
  })
  lodashmap(alternative,( element, index ) => {
    optionsRight.push(
      <div className = "center-y" key = { index }>
        <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
      </div>
    )
  })

  return (
    <div className = "form-unavoidable">
      <div className = "column flex-1">
        { optionsLeft }
      </div>
      <div className = "column flex-1">
        { optionsRight }
      </div>
    </div>
  )
}

// 院内情况模块
const NosocomialOptions = props => {
  const {conditions} = props;
  const prerequisites = lodashget(conditions,'prerequisites',[]);
  const alternative = lodashget(conditions,'alternative',[]);
  let optionsLeft   =  [];    // 左el组
  let  optionsRight  = [];   // 右el组
  let  directionNum  = 0                     // 中值变量

  // 获取临时el总和 （非正式步骤）
  let tempNum = alternative.length + prerequisites.length;

    // 计算中值 （右侧初始值）
    directionNum  = tempNum % 2 ?
    ( tempNum + 1 ) / 2 + 1 :
    tempNum / 2 + 1

  const allarray = alternative.concat(prerequisites);
  lodashmap(allarray, ( element, index ) => {
    // 渲染左侧el组
    if( index + 1 < directionNum )
    {
      optionsLeft.push(
        <div className = "center-y" key = { index }>
          <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
        </div>
      )
    }
    // 渲染右侧el组
    else
    {
      optionsRight.push(
        <div className = "center-y" key = { index }>
          <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
        </div>
      )
    }
  })

  return (
    <div className = "form-nosocomial">
      <div className = "column flex-1">
        { optionsLeft }
      </div>
      <div className = "column flex-1">
        { optionsRight }
      </div>
    </div>
  );
}

// 入院情况模块
const PrehospitalOptions = props => {
  const {admissions} = props;

  let optionsLeft   =  [];    // 左el组
  let  optionsRight  = [];   // 右el组
  let  directionNum  = 0                     // 中值变量


    // 计算中值 （右侧初始值）
    directionNum  = props.listObj.length % 2 ?
                    ( props.listObj.length + 1 ) / 2 + 1 :
                    props.listObj.length / 2 + 1

  lodashmap(admissions,( element, index ) => {
    // 渲染左侧el组
    if( index + 1 < directionNum )
    {
      optionsLeft.push(
        <div className = "center-y" key = { index }>
          <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
        </div>
      )
    }
    // 渲染右侧el组
    else
    {
      optionsRight.push(
        <div className = "center-y" key = { index }>
          <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
        </div>
      )
    }

  })
  return (
    <div className = "form-prehospital">
      <div className = "column flex-1">
        { optionsLeft }
      </div>
      <div className = "column flex-1">
        { optionsRight }
      </div>
    </div>
  )
}

// 申请表公共头部
const FormHeader = props => {
  const
    { curpaientinfo, db } = props,
    { depats, beds }      = db,
    Bedname               = lodashget( beds, `${curpaientinfo.bedid}.Bedname`, '' ),
    Depatname             = lodashget( depats, `${curpaientinfo.depatid}.Depatname` , '' ),
    momentin              = moment( curpaientinfo.In_date );

  return (
    <div className = "form-header column">
      <div className = "form-title center-x">
        { props.Hospitalname }{ curpaientinfo.Diseaseclassification }申报表
      </div>
      <div className = "form-abstract column">
        <div>
          <div className = "flex-1"><span>科室：</span><span>{ Depatname }</span></div>
          <div className = "flex-2 in-date">
            <span>入院日期：</span>
            <span>{ momentin.format('YYYY') }</span>年
            <span>{ momentin.format('MM') }</span>月
            <span>{ momentin.format('DD') }</span>日
            <span>{ momentin.format('HH') }</span>:
            <span>{ momentin.format('mm') }</span>
          </div>
          <div className = "flex-1"><span>床号：</span><span>{Bedname}</span></div>
        </div>
        <div>
          <div className = "flex-1"><span>姓名：</span><span>{ lodashget( curpaientinfo, 'Patientname', '' ) }</span></div>
          <div className = "flex-1"><span>性别：</span><span>{ lodashget( curpaientinfo, 'SexString', '男' ) }</span></div>
          <div className = "flex-1"><span>年龄：</span><span>{ lodashget( curpaientinfo, 'Age', '') }</span></div>
          <div className = "flex-1"><span>住院号：</span><span>{ lodashget( curpaientinfo, 'Patientno', '') }</span></div>
        </div>
      </div>
    </div>
  )
}

// ======院前压疮申报表=======
const FormPrehospital = (props) => {
  const {Hospitalname,curpaientinfo,db,info} = props;
  let MYY_signed_nurse_time = '';
  let MMM_signed_nurse_time = '';
  let MDD_signed_nurse_time = '';
  let MHH_signed_nurse_time = '';
  let Mmm_signed_nurse_time = '';

  let MYY_signed_report_time = '';
  let MMM_signed_report_time = '';
  let MDD_signed_report_time = '';
  let MHH_signed_report_time = '';
  let Mmm_signed_report_time = '';


  const signed_nurse_time = lodashget(info,'signed_nurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_nurse_time);
    MYY_signed_nurse_time = momenttime.format('YYYY');
    MMM_signed_nurse_time = momenttime.format('MM');
    MDD_signed_nurse_time = momenttime.format('DD');
    MHH_signed_nurse_time = momenttime.format('HH');
    Mmm_signed_nurse_time = momenttime.format('mm');
  }

  const signed_report_time = lodashget(info,'signed_report_time');
  if(!!signed_report_time){
    const momenttime = moment(signed_report_time);
    MYY_signed_report_time = momenttime.format('YYYY');
    MMM_signed_report_time = momenttime.format('MM');
    MDD_signed_report_time = momenttime.format('DD');
    MHH_signed_report_time = momenttime.format('HH');
    Mmm_signed_report_time = momenttime.format('mm');
  }

  const lapsetooptions_isok_checked = lodashget(info,'lapseto.lapsetooptions.isok_checked',-1);
  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
        />
        <div className = "form-body column">
          <div>
            <div className = "flex-1 center">诊断：</div>
            <div className = "flex-3 center">{lodashget(info,'diagnosis','')}</div>
            <div className = "flex-1 center">压疮来源：</div>
            <div className = "flex-3 center">{lodashget(info,'wsffrom','')}</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{lodashget(info,'evaluatebardenscore','') }分</div>
          </div>
          <div className = "content center-x">入院时存在以下情况</div>
          <PrehospitalOptions admissions = { lodashget(info,'admissions',[]) } />
          <FormObservation listObj = { lodashget(info,'evaluateWoundsurfaces',[]) } />
          <FormMeasures listObj = { lodashget(info,'preventivesmeasure',[]) } />
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(db,`users.${info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_nurse_time}</span>年
              <span>{MMM_signed_nurse_time}</span>月
              <span>{MDD_signed_nurse_time}</span>日
              <span>{MHH_signed_nurse_time}</span>:
              <span>{Mmm_signed_nurse_time}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-5 center">{ lodashget(db,`users.${info.signed_headnurse}.Staffname`,'') }</div>
          </div>
          <div>
            <div className = "flex-1 center">护士长意见</div>
            <div className = "flex-5 center">{lodashget(info,'signed_headnurse_instruction','')}</div>
          </div>
        </div>
        <FormSign db={db} info={info}/>
        <div className="lapse-to">
          <div className="flex-2 center">转归情况：</div>
          <div className="flex-4 center">
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={lapsetooptions_isok_checked === 0}/>愈合</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={lapsetooptions_isok_checked === 1}/>好转</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={lapsetooptions_isok_checked === 2}/>未愈</span>
          </div>
          <div className="flex-2 center">填报人：</div>
          <div className="flex-2 center">{ lodashget(db,`users.${info.signed_report}.Staffname`,'') }</div>
          <div className="flex-5 center">
            日期：
            <span>{MYY_signed_report_time}</span>年
            <span>{MMM_signed_report_time}</span>月
            <span>{MDD_signed_report_time}</span>日
            <span>{MHH_signed_report_time}</span>:
            <span>{Mmm_signed_report_time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ====院内压疮申报表 ====
const FormNosocomial = props => {
  const {Hospitalname,curpaientinfo,db,info} = props;
  let MYY_signed_nurse_time = '';
  let MMM_signed_nurse_time = '';
  let MDD_signed_nurse_time = '';
  let MHH_signed_nurse_time = '';
  let Mmm_signed_nurse_time = '';
  const signed_nurse_time = lodashget(info,'signed_nurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_nurse_time);
    MYY_signed_nurse_time = momenttime.format('YYYY');
    MMM_signed_nurse_time = momenttime.format('MM');
    MDD_signed_nurse_time = momenttime.format('DD');
    MHH_signed_nurse_time = momenttime.format('HH');
    Mmm_signed_nurse_time = momenttime.format('mm');
  }

  let MYY_signed_headnurse_time = '';
  let MMM_signed_headnurse_time = '';
  let MDD_signed_headnurse_time = '';
  let MHH_signed_headnurse_time = '';
  let Mmm_signed_headnurse_time = '';
  const signed_headnurse_time = lodashget(info,'signed_headnurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_headnurse_time);
    MYY_signed_headnurse_time = momenttime.format('YYYY');
    MMM_signed_headnurse_time = momenttime.format('MM');
    MDD_signed_headnurse_time = momenttime.format('DD');
    MHH_signed_headnurse_time = momenttime.format('HH');
    Mmm_signed_headnurse_time = momenttime.format('mm');
  }



  let MYY_signed_report_time = '';
  let MMM_signed_report_time = '';
  let MDD_signed_report_time = '';
  let MHH_signed_report_time = '';
  let Mmm_signed_report_time = '';
  const signed_report_time = lodashget(info,'signed_report_time');
  if(!!signed_report_time){
    const momenttime = moment(signed_report_time);
    MYY_signed_report_time = momenttime.format('YYYY');
    MMM_signed_report_time = momenttime.format('MM');
    MDD_signed_report_time = momenttime.format('DD');
    MHH_signed_report_time = momenttime.format('HH');
    Mmm_signed_report_time = momenttime.format('mm');
  }

  const lapsetooptions_isok_checked = lodashget(info,'lapseto.lapsetooptions.isok_checked',-1);
  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
        />
        <div className = "form-body column">
          <div>
            <div className = "flex-1 center">诊断：</div>
            <div className = "flex-3 center">{lodashget(info,'diagnosis','')}</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{lodashget(info,'evaluatebardenscore','') }分</div>
            <div className = "flex-1 center">发生日期</div>
            <div className = "flex-1 center"></div>
          </div>
          <div>
            <div className = "flex-1 center">必备条件和选择条件</div>
            <div className = "flex-1 center"></div>
            <div className = "flex-1 center"></div>
            <div className = "flex-1 center"></div>
          </div>
          <div>
            <div className = "flex-1 center">是否申报难免压疮</div>
            <div className = "flex-1 center"></div>
            <div className = "flex-1 center">申报时间</div>
            <div className = "flex-1 center"></div>
          </div>
          <div className = "center">患者存在以下情况</div>
          <NosocomialOptions conditions = { lodashget(info,'conditions',{}) } />
          <FormObservation listObj = { lodashget(info,'evaluateWoundsurfaces',[]) }/>
          <FormMeasuress listObj = { lodashget(info,'preventivesmeasure',[]) }/>
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_nurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_nurse_time}</span>年
              <span>{MMM_signed_nurse_time}</span>月
              <span>{MDD_signed_nurse_time}</span>日
              <span>{MHH_signed_nurse_time}</span>:
              <span>{Mmm_signed_nurse_time}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-2">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_headnurse_time}</span>年
              <span>{MMM_signed_headnurse_time}</span>月
              <span>{MDD_signed_headnurse_time}</span>日
              <span>{MHH_signed_headnurse_time}</span>:
              <span>{Mmm_signed_headnurse_time}</span>
            </div>
          </div>
        </div>
        <FormSign db={db} info={info}/>
        <div className="lapse-to">
          <div className="flex-2 center">转归情况：</div>
          <div className="flex-4 center">
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={lapsetooptions_isok_checked === 0}/>愈合</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={lapsetooptions_isok_checked === 1}/>好转</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly checked={lapsetooptions_isok_checked === 2}/>未愈</span>
          </div>
          <div className="flex-2 center">填报人：</div>
          <div className="flex-2 center">{ lodashget(db,`users.${info.signed_report}.Staffname`,'') }</div>
          <div className="flex-5 center">
            日期：
            <span>{MYY_signed_report_time}</span>年
            <span>{MMM_signed_report_time}</span>月
            <span>{MDD_signed_report_time}</span>日
            <span>{MHH_signed_report_time}</span>:
            <span>{Mmm_signed_report_time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 难免压疮申报表
const FormUnavoidable = props => {
  const {db,info} = props;
  let MYY_signed_nurse_time = '';
  let MMM_signed_nurse_time = '';
  let MDD_signed_nurse_time = '';
  let MHH_signed_nurse_time = '';
  let Mmm_signed_nurse_time = '';
  const signed_nurse_time = lodashget(info,'signed_nurse_time');
  if(!!signed_nurse_time){
    const momenttime = moment(signed_nurse_time);
    MYY_signed_nurse_time = momenttime.format('YYYY');
    MMM_signed_nurse_time = momenttime.format('MM');
    MDD_signed_nurse_time = momenttime.format('DD');
    MHH_signed_nurse_time = momenttime.format('HH');
    Mmm_signed_nurse_time = momenttime.format('mm');
  }



  let MYY_signed_report_time = '';
  let MMM_signed_report_time = '';
  let MDD_signed_report_time = '';
  let MHH_signed_report_time = '';
  let Mmm_signed_report_time = '';
  const signed_report_time = lodashget(info,'signed_report_time');
  if(!!signed_report_time){
    const momenttime = moment(signed_report_time);
    MYY_signed_report_time = momenttime.format('YYYY');
    MMM_signed_report_time = momenttime.format('MM');
    MDD_signed_report_time = momenttime.format('DD');
    MHH_signed_report_time = momenttime.format('HH');
    Mmm_signed_report_time = momenttime.format('mm');
  }

  const ispressuresores = lodashget(info,'lapseto.ispressuresores',-1);
  const occuredpressuresorestime = lodashget(info,'lapseto.occuredpressuresorestime');
  let MYY_occuredpressuresorestime = '';
  let MMM_occuredpressuresorestime = '';
  let MDD_occuredpressuresorestime = '';
  let MHH_occuredpressuresorestime = '';
  let Mmm_occuredpressuresorestime = '';

  if(!!occuredpressuresorestime && occuredpressuresorestime !== ''){
    const momenttime = moment(occuredpressuresorestime);
    MYY_occuredpressuresorestime = momenttime.format('YYYY');
    MMM_occuredpressuresorestime = momenttime.format('MM');
    MDD_occuredpressuresorestime = momenttime.format('DD');
    MHH_occuredpressuresorestime = momenttime.format('HH');
    Mmm_occuredpressuresorestime = momenttime.format('mm');
  }

  const checkout_checked = lodashget(info,'lapseto.lapsetooptions.checkout_checked',false);
  const death_checked = lodashget(info,'lapseto.lapsetooptions.death_checked',false);

  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Hospitalname  = { props.Hospitalname }
          curpaientinfo = { props.curpaientinfo }
          db            = { props.db }
        />
        <div className = "form-body column">
          <div>
            <div className = "flex-1 center">诊断：</div>
            <div className = "flex-3 center">{lodashget(info,'diagnosis','')}</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{lodashget(info,'evaluatebardenscore','') }分</div>
          </div>
          <div>
            <div className = "flex-1 center">必备条件和选择条件</div>
          </div>
          <div>
            <div className = "flex-1 center">必备条件：强迫体位需要严格限制造成强迫体位的原因</div>
            <div className = "flex-1 center">可选择条件</div>
          </div>
          <UnavoidableOptions conditions = { lodashget(info,'conditions',{})  } />
          <FormMeasuress listObj = { lodashget(info,'preventivesmeasure',[])  } />
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{MYY_signed_nurse_time}</span>年
              <span>{MMM_signed_nurse_time}</span>月
              <span>{MDD_signed_nurse_time}</span>日
              <span>{MHH_signed_nurse_time}</span>:
              <span>{Mmm_signed_nurse_time}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-5 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
          </div>
          <div>
            <div className = "flex-1 center">护士长意见</div>
            <div className = "flex-5 center">{lodashget(info,'signed_headnurse_instruction','')}</div>
          </div>
        </div>
        <FormSign db={db} info={info}/>
        <div className="lapse-to column">
          <div>
            <div className="flex-1">转归情况：</div>
          </div>
          <div>
            <div className="flex-1">1.是否发生压疮</div>
            <div className="flex-2">
              <span className = "check"><input type="checkbox" name="check[]" readOnly checked={ispressuresores===0}/>否</span>
              <span className = "check"><input type="checkbox" name="check[]" readOnly checked={ispressuresores===1}/>是</span>
            </div>
            <div className="flex-1">发生时间</div>
            <div className="flex-2">
              <span>{MYY_occuredpressuresorestime}</span>年
              <span>{MMM_occuredpressuresorestime}</span>月
              <span>{MDD_occuredpressuresorestime}</span>日
              <span>{MHH_occuredpressuresorestime}</span>:
              <span>{Mmm_occuredpressuresorestime}</span>
            </div>
          </div>
          <div>
            <div className="flex-1">2.患者去向</div>
            <div className="flex-2">
              <span className = "check"><input type="checkbox" name="check[]" readOnly checked={checkout_checked}/>出院/转院</span>
              <span className = "check"><input type="checkbox" name="check[]" readOnly checked={death_checked}/>死亡</span>
            </div>
            <div className="flex-3"></div>
          </div>
          <div>
            <div className="flex-1">上报人</div>
            <div className="flex-2">{ lodashget(db,`users.${info.signed_report}.Staffname`,'') }</div>
            <div className="flex-1">日期</div>
            <div className="flex-2">
              <span>{MYY_signed_report_time}</span>年
              <span>{MMM_signed_report_time}</span>月
              <span>{MDD_signed_report_time}</span>日
              <span>{MHH_signed_report_time}</span>:
              <span>{Mmm_signed_report_time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const FormBarden = props => {

  return (
    <div className = "form-page" >
      <div className = "column">
        <FormHeader
          Hospitalname  = { props.Hospitalname }
          curpaientinfo = { props.curpaientinfo }
          db            = { props.db }
        />
      </div>
    </div>
  )
}



export {
  FormPrehospital,
  FormNosocomial,
  FormUnavoidable,
  FormBarden
}
