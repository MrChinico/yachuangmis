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

const style_form_box = {
  width: '100%',
  margin: '20px auto',
  color: '#333',
  background: '#f9f9f9',
  border: '1px solid #ddd',
}

const style_form_box_h1 = {
    color: '#111',
    fontSize: '20px',
    textAlign: 'center',
    lineHeight: '70px',
};

const style_choose_info = {
    width:'100%'
};

const style_choose_info_td = {
  padding:'10px 15px',
  fontSize: '14px',
  width:'50%',
  borderRight:'1px solid #ddd'
}


const style_choose_info_tr = {
  borderTop:'1px solid #ddd',
  lineHeight: '20px',
  borderRight:'1px solid #ddd'
};

const style_choose_info_tr_odd = {...style_choose_info_tr,
background:'#fff'};


const style_choose_info_tr_gray = {...style_choose_info_tr,
   color:'#888',
   fontSize: '13px',
   borderRight: '0px'
};

const style_choose_info_tr_graytitle = {
  ...style_choose_info_tr_gray,
   borderRight: '0px'
};
// .form-box .choose-info tr td tr td{ width:auto}
// .form-box .choose-info tr{
//     border-top:1px solid #ddd;
//     line-height: 20px;
// }
// .form-box .choose-info tr:nth-child(2n+1){
//     background:#fff;
// }
// .form-box .choose-info tr td{
//     border-right:1px solid #ddd;
// }
// .form-box .choose-info tr td:last-child{
//     border-right:0px;
// }
// .form-box .choose-info tr td tr:first-child{ border-top:0px}
// .form-box .choose-info tr td tr td{ color:#333}
// .form-box .choose-info tr td{
//     padding:10px 15px;
//     font-size: 14px;
// }
// .form-box .choose-info .gray{
//     color:#888;
//     font-size: 13px;
// }
// .form-box .choose-info .blue{
//     color:#0084bf;
//     font-size: 14px;
// }
// .form-box .choose-info .gray.title td,.form-box .choose-info .blue.title td{
//     border-right:0px;
// }
//--------
const ReviewDetailInfo = (props)=>{
	const {Hospitalname,db,info} = props;
  const curpaientinfo = db.paientinfos[info.userpatientid];
  let trlist = [];
  if(curpaientinfo.Diseaseclassification === '院前压疮'){
    trlist.push(<tr style={style_choose_info_tr_graytitle} key='admissions'>
        <td style={style_choose_info_td}>入院时存在以下情况</td>
        <td style={style_choose_info_td}></td>
      </tr>);
    trlist.push(<CRenderAdmissions {...info} key='admissions2'/>);


    trlist.push(<tr style={style_choose_info_tr_graytitle} key='evaluateWoundsurfaces'>
      <td style={style_choose_info_td} colSpan="2">
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
		<div style={style_form_box}>
				<h1 style={style_form_box_h1}>{Hospitalname}转归审阅申请表</h1>
				<ViewPrintHeader curpaientinfo={curpaientinfo} db={db} />

				<table style={style_choose_info}>
					<tbody>
					<tr style={style_choose_info_tr_odd}>
						<td style={style_choose_info_td}>诊断：</td>
						<td style={style_choose_info_td}></td>
					</tr>
					<tr style={style_choose_info_tr}>
						<td style={style_choose_info_td}>压疮评分：</td>
						<CRenderScore  {...info} />
					</tr>

					{trlist}

					<tr style={style_choose_info_tr_graytitle}>
						<td style={style_choose_info_td}>预防措施：</td>
						<td style={style_choose_info_td}></td>
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
