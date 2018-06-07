import React            from 'react';
// import ViewPrintHeader  from './viewprint_header';
import {
  FormPrehospital,
  FormNosocomial,
  FormUnavoidable
} from './form_template.js';
// import {
//   CRenderConditions,
//   CRenderPreventivesmeasure,
//   CRenderScore,
//   CRenderLapseto,
//   CRenderInstruction,
//   CRenderAdmissions,
//   CRenderEvaluateWoundsurfaces,
//   CRenderUserSignedNurse,
//   CRenderUserSignedHeadNurse,
//   CRenderUserSignedNursingDepartment,
//   CRenderUserReport
// } from './form_lapseto_barden_renderfield_readonly';


// -------------------------------------------------

const ReviewDetailInfo = props => {

  const
    { Hospitalname, db, info } = props,
    curpaientinfo = db.paientinfos[ info.userpatientid ];

  switch( curpaientinfo.Diseaseclassification )
  {
    case '院前压疮':
      return (
        <FormPrehospital
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      )
    case '院内压疮':
      return (
        <FormNosocomial
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      )
    case '难免压疮':
    default:
      return (
        <FormUnavoidable
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      )
  }
}

export default ReviewDetailInfo;
