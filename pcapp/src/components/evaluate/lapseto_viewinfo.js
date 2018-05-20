import React from 'react';
import ViewPrintHeader from './viewprint_header';

import {
  CRenderConditions,
  CRenderPreventivesmeasure,
  CRenderScore,
  CRenderLapseto,
  CRenderInstruction,
  CRenderAdmissions,
  CRenderEvaluateWoundsurfaces
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
    trlist.push(<CRenderConditions {...info} />);
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

					<CRenderInstruction {...info}/>


					<tr>
						<td>主管部门签字：<input type="text" /></td>
						<td className="w-50">日期：
							<input type="text" />年
							<input type="text" />月
							<input type="text" />日
							<input type="text" />:<input type="text" />
						</td>
					</tr>

				<CRenderLapseto {...info}/>


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
	)
}

export default ReviewDetailInfo;
