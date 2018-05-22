import React from 'react';
import {FieldArray,Fields, Field, reduxForm, Form  } from 'redux-form';
// import { connect } from 'react-redux';
import ViewPrintHeader from './viewprint_header';

import {
  renderConditions,
  renderPreventivesmeasure,
  renderScore,
  renderLapseto,
  renderInstruction,
  renderAdmissions,
  renderEvaluateWoundsurfaces,
  renderUserSignedNurse,
  renderUserSignedHeadNurse,
  renderUserSignedNursingDepartment,
  renderUserReport,
}from './form_lapseto_barden_renderfield';
//--------

class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit,curpaientinfo,db,app,userlogin } = this.props;
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
        <td colSpan="2" className="p0">
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

                  <Fields names={[ 'signed_nurse', 'signed_nurse_time','stagestatus' ]} component={renderUserSignedNurse}
                    db={db} userlogin={userlogin}/>
                  <Fields names={[ 'signed_headnurse', 'signed_headnurse_time','stagestatus' ]} component={renderUserSignedHeadNurse}
                    db={db}  userlogin={userlogin}/>


                  <Fields names={[ 'instruction', 'isunavoidablepressureulcer','stagestatus' ]} component={renderInstruction}/>

                  <Fields names={[ 'signed_nursingdepartment', 'signed_nursingdepartment_time','stagestatus' ]} component={renderUserSignedNursingDepartment}
                      db={db} userlogin={userlogin}/>


                  <Field
                      name="lapseto"
                      id="lapseto"
                      component={renderLapseto}
                  />

                  <Fields names={[ 'signed_report', 'signed_report_time','stagestatus' ]} component={renderUserReport}
                      db={db} userlogin={userlogin}/>

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
