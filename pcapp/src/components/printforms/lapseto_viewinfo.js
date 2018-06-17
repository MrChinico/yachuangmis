import React            from 'react';
// import ViewPrintHeader  from './viewprint_header';
import {
  FormPrehospital,
  FormNosocomial,
  FormUnavoidable
} from './form_template.js';
// -------------------------------------------------
const ReviewDetailInfo = props => {

  const
    { Hospitalname, db, info,isformreviewlapsetoid2 } = props,
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
      return (
        <FormUnavoidable
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
        )
    case '难免转院内':
      return isformreviewlapsetoid2 === '0'?(
        <FormUnavoidable
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      ):(
        <FormNosocomial
          Hospitalname  = { Hospitalname }
          curpaientinfo = { curpaientinfo }
          db            = { db }
          info          = { info }
        />
      );
    default:
      return (<div></div>);
  }
}

export default ReviewDetailInfo;
