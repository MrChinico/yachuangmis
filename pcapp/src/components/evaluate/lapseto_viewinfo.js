import React from 'react';
import ViewPrintHeader from './viewprint_header';

import {
  CRenderConditions,
  CRenderPreventivesmeasure,
  CRenderScore,
  CRenderLapseto,
  CRenderInstruction,
  CRenderAdmissions,
  CRenderEvaluateWoundsurfaces,
  CRenderUserSignedNurse,
  CRenderUserSignedHeadNurse,
  CRenderUserSignedNursingDepartment,
  CRenderUserReport
} from './form_lapseto_barden_renderfield_readonly';

//--------
const ReviewDetailInfo = (props)=>{
	const {Hospitalname,db,info} = props;
  const curpaientinfo = db.paientinfos[info.userpatientid];
  let trlist = [];
  if(curpaientinfo.Diseaseclassification === '院前压疮'){
    trlist.push(<tr className="gray title" key='admissions'>
        <td>入院时存在以下情况</td>
        <td></td>
      </tr>);
    trlist.push(<CRenderAdmissions {...info} key='admissions2'/>);


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
            <CRenderEvaluateWoundsurfaces {...info} />
          </tbody>
        </table>
      </td>
      </tr>);
  }
  else if(curpaientinfo.Diseaseclassification === '压疮高危'){
    trlist.push(<CRenderConditions {...info} key='gwyc'/>);
  }

	return (
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
						<CRenderScore  {...info} />
					</tr>

					{trlist}

					<tr className="gray title">
						<td>预防措施：</td>
						 <td></td>
				 </tr>

				 <CRenderPreventivesmeasure {...info}/>

         <CRenderUserSignedNurse {...info}  db={db}/>

         <CRenderUserSignedHeadNurse {...info}  db={db}/>

					<CRenderInstruction {...info}/>

          <CRenderUserSignedNursingDepartment {...info}  db={db}/>

				  <CRenderLapseto {...info}/>

          <CRenderUserReport {...info}  db={db}/>

					</tbody>
				</table>

		</div>
	)
}

export default ReviewDetailInfo;
