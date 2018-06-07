/**
 * form_template.js | 转归与申报表格模板
 */

import React      from 'react'
import lodashget  from 'lodash.get'
import moment     from 'moment'

import './form_tamplate_style.styl'

const FormSign = props => {
  return (
    <div className = "form-sign column flex-1">
      <div className = "opinion column">
        <div>
          <div className = "flex-1 center-y">主管部门审核与指导意见：</div>
          <div className = "flex-1 center-y">
            <span className = "check">情况属实</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />是</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />否</span>
          </div>
        </div>
        <div className = "flex-1">
          <div><span className = "opinion">示例主管意见</span></div>
        </div>
        <div>
          <div className = "flex-1">主管部门签字：</div>
          <div className = "flex-1">
            日期：
            {/* <span>{moment(props.info.signed_nursingdepartment_time).format('YYYY')}</span>年
            <span>{moment(props.info.signed_nursingdepartment_time).format('MM')}</span>月
            <span>{moment(props.info.signed_nursingdepartment_time).format('DD')}</span>日
            <span>{moment(props.info.signed_nursingdepartment_time).format('HH')}</span>:
            <span>{moment(props.info.signed_nursingdepartment_time).format('mm')}</span> */}
          </div>
        </div>
      </div>
    </div>
  )
}

// 护理措施2 （临时）
const FormMeasuress = props => {
  let elements = props.elements || []
  props.listObj.forEach( ( element, index ) => {
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
  let elements = props.elements || []
  props.listObj.forEach( ( element, index ) => {
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
  let
    elements = props.elements || [],
    count = 0
  props.listObj.forEach( ( element, index ) => {
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
  let
    optionsLeft   = optionsLeft || [],    // 左el组
    optionsRight  = optionsRight || []   // 右el组

  props.listObj.prerequisites.forEach( ( element, index ) => {
    optionsLeft.push(
      <div className = "center-y" key = { index }>
        <input type="checkbox" name="check[]" checked = { element.checked } readOnly/> { element.name }
      </div>
    )
  })
  props.listObj.alternative.forEach( ( element, index ) => {
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
  let
    optionsLeft   = optionsLeft || [],    // 左el组
    optionsRight  = optionsRight || [],   // 右el组
    directionNum  = 0                     // 中值变量

  // 获取临时el总和 （非正式步骤）
  let tempNum = props.listObj.alternative.length + props.listObj.prerequisites.length

    // 计算中值 （右侧初始值）
    directionNum  = tempNum % 2 ?
    ( tempNum + 1 ) / 2 + 1 :
    tempNum / 2 + 1

  props.listObj.alternative.concat( props.listObj.prerequisites ).forEach( ( element, index ) => {
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
  )



}

// 入院情况模块
const PrehospitalOptions = props => {
  let
    optionsLeft   = optionsLeft || [],    // 左el组
    optionsRight  = optionsRight || [],   // 右el组
    directionNum  = 0                     // 中值变量

    // 计算中值 （右侧初始值）
    directionNum  = props.listObj.length % 2 ?
                    ( props.listObj.length + 1 ) / 2 + 1 :
                    props.listObj.length / 2 + 1

  props.listObj.forEach( ( element, index ) => {

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

// 院前压疮申报表
const FormPrehospital = props => {
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
            <div className = "flex-3 center">示例诊断内容</div>
            <div className = "flex-1 center">压疮来源：</div>
            <div className = "flex-3 center">示例压疮来源</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{ props.info.evaluatebardenscore }分</div>
          </div>
          <div className = "content center-x">入院时存在以下情况</div>
          <PrehospitalOptions listObj = { props.info.admissions } />
          <FormObservation listObj = { props.info.evaluateWoundsurfaces } />
          <FormMeasures listObj = { props.info.preventivesmeasure } />
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{moment(props.info.signed_nurse_time).format('YYYY')}</span>年
              <span>{moment(props.info.signed_nurse_time).format('MM')}</span>月
              <span>{moment(props.info.signed_nurse_time).format('DD')}</span>日
              <span>{moment(props.info.signed_nurse_time).format('HH')}</span>:
              <span>{moment(props.info.signed_nurse_time).format('mm')}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-5 center"></div>
          </div>
          <div>
            <div className = "flex-1 center">护士长意见</div>
            <div className = "flex-5 center"></div>
          </div>
        </div>
        <FormSign />
        <div className="lapse-to">
          <div className="flex-2 center">转归情况：</div>
          <div className="flex-4 center">
            <span className = "check"><input type="checkbox" name="check[]" readOnly />愈合</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />好转</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />未愈</span>
          </div>
          <div className="flex-2 center">填报人：</div>
          <div className="flex-2 center"></div>
          <div className="flex-5 center">
            日期：
            <span>2018</span>年
            <span>01</span>月
            <span>01</span>日
            <span>01</span>:
            <span>01</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 院内压疮申报表
const FormNosocomial = props => {
  console.log(props)
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
            <div className = "flex-3 center">示例诊断内容</div>
          </div>
          <div>
            <div className = "flex-1 center">压疮评分</div>
            <div className = "flex-1 center">{ props.info.evaluatebardenscore }分</div>
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
          <NosocomialOptions listObj = { props.info.conditions } />
          <FormObservation listObj = { props.info.evaluateWoundsurfaces } />
          <FormMeasuress listObj = { props.info.preventivesmeasure } />
        </div>
        <div className = "form-sign column">
          <div>
            <div className = "flex-1 center">申报人</div>
            <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{moment(props.info.signed_nurse_time).format('YYYY')}</span>年
              <span>{moment(props.info.signed_nurse_time).format('MM')}</span>月
              <span>{moment(props.info.signed_nurse_time).format('DD')}</span>日
              <span>{moment(props.info.signed_nurse_time).format('HH')}</span>:
              <span>{moment(props.info.signed_nurse_time).format('mm')}</span>
            </div>
          </div>
          <div>
            <div className = "flex-1 center">护士长签名</div>
            <div className = "flex-2"></div>
            <div className = "flex-1 center">申报日期</div>
            <div className = "flex-2 center">
              <span>{moment(props.info.signed_headnurse_time).format('YYYY')}</span>年
              <span>{moment(props.info.signed_headnurse_time).format('MM')}</span>月
              <span>{moment(props.info.signed_headnurse_time).format('DD')}</span>日
              <span>{moment(props.info.signed_headnurse_time).format('HH')}</span>:
              <span>{moment(props.info.signed_headnurse_time).format('mm')}</span>
            </div>
          </div>
        </div>
        <FormSign />
        <div className="lapse-to">
          <div className="flex-2 center">转归情况：</div>
          <div className="flex-4 center">
            <span className = "check"><input type="checkbox" name="check[]" readOnly />愈合</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />好转</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />未愈</span>
          </div>
          <div className="flex-2 center">填报人：</div>
          <div className="flex-2 center"></div>
          <div className="flex-5 center">
            日期：
            <span>2018</span>年
            <span>01</span>月
            <span>01</span>日
            <span>01</span>:
            <span>01</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 难免压疮申报表
const FormUnavoidable = props => (
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
          <div className = "flex-3 center">示例诊断内容</div>
        </div>
        <div>
          <div className = "flex-1 center">压疮评分</div>
          <div className = "flex-1 center">{ props.info.evaluatebardenscore }分</div>
        </div>
        <div>
          <div className = "flex-1 center">必备条件和选择条件</div>
        </div>
        <div>
          <div className = "flex-1 center">必备条件：强迫体位需要严格限制造成强迫体位的原因</div>
          <div className = "flex-1 center">可选择条件</div>
        </div>
        <UnavoidableOptions listObj = { props.info.conditions } />
        <FormMeasuress listObj = { props.info.preventivesmeasure } />
      </div>
      <div className = "form-sign column">
        <div>
          <div className = "flex-1 center">申报人</div>
          <div className = "flex-2 center">{ lodashget(props.db,`users.${props.info.signed_headnurse}.Staffname`,'') }</div>
          <div className = "flex-1 center">申报日期</div>
          <div className = "flex-2 center">
            <span>{moment(props.info.signed_nurse_time).format('YYYY')}</span>年
            <span>{moment(props.info.signed_nurse_time).format('MM')}</span>月
            <span>{moment(props.info.signed_nurse_time).format('DD')}</span>日
            <span>{moment(props.info.signed_nurse_time).format('HH')}</span>:
            <span>{moment(props.info.signed_nurse_time).format('mm')}</span>
          </div>
        </div>
        <div>
          <div className = "flex-1 center">护士长签名</div>
          <div className = "flex-5 center"></div>
        </div>
        <div>
          <div className = "flex-1 center">护士长意见</div>
          <div className = "flex-5 center"></div>
        </div>
      </div>
      <FormSign />
      <div className="lapse-to column">
        <div>
          <div className="flex-1">转归情况：</div>
        </div>
        <div>
          <div className="flex-1">1.是否发生压疮</div>
          <div className="flex-2">
            <span className = "check"><input type="checkbox" name="check[]" readOnly />否</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />是</span>
          </div>
          <div className="flex-1">发生时间</div>
          <div className="flex-2">
            <span>2018</span>年
            <span>01</span>月
            <span>01</span>日
            <span>01</span>:
            <span>01</span>
          </div>
        </div>
        <div>
          <div className="flex-1">2.患者去向</div>
          <div className="flex-2">
            <span className = "check"><input type="checkbox" name="check[]" readOnly />出院/转院</span>
            <span className = "check"><input type="checkbox" name="check[]" readOnly />死亡</span>
          </div>
          <div className="flex-3"></div>
        </div>
        <div>
          <div className="flex-1">上报人</div>
          <div className="flex-2"></div>
          <div className="flex-1">日期</div>
          <div className="flex-2">
            <span>2018</span>年
            <span>01</span>月
            <span>01</span>日
            <span>01</span>:
            <span>01</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

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
