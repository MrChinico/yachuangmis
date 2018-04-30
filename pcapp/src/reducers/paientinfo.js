import { createReducer } from 'redux-act';
import {
  editpatientinfo_result,
  getpatientinfolist_result,
 } from '../actions';
import lodashmap from 'lodash.map';
import {

  page_getpatientinfolist_result
} from '../sagas/pagination';
// let paientinfolist = [];
// let paientinfos = {};
//
// let testdata = [];
// for(let i = 0;i < 24;i++){
//   testdata.push({
//     _id:`${i}`,
//     bid:`${i}`,
//     Patientid:`100${i}`,//病人编号 <--
//     Patientno:`100${i}`,//住院号码
//     Patientname:`姓名${i}`,//病人姓名
//     Sex:'男',//病人性别
//     Birthday:'2010-01-01',//出生年月
//     In_date:'2010-01-01',//入院日期
//     Out_date:'2010-01-01',//出院日期
//     In_diagnosis:'入院诊断',//入院诊断
//     In_out_flag:'0',//在院判别 0:在院 1:出院
//     Depatno:'No',//所在科室<--depat
//     Bedno:`Bed${i}`,//床位号
//     Diseaseclassification:'压疮高危',//病人分类:压疮高危／院前压疮／普通病人
//   });
// }
// lodashmap(testdata,(info)=>{
//   paientinfolist.push(info._id);
//   paientinfos[info._id] = info;
// });

const initial = {
    paientinfo: {
        paientinfolist:[],
        paientinfos: {},
    },
};

const paientinfo = createReducer({
  [editpatientinfo_result]:(state,payload)=>{
     let paientinfos = {...state.paientinfos};
      paientinfos[payload._id] = payload;
      return {...state,paientinfos};
  },
  [page_getpatientinfolist_result]:(state,payload)=>{
      const {result} = payload;
      const paientinfolist = [];
      const paientinfos = {...state.paientinfos};
      lodashmap(result.docs,(info)=>{
        paientinfolist.push(info._id);
        paientinfos[info._id] = info;
      });
      return {...state, paientinfolist,paientinfos};
  },
  [getpatientinfolist_result]:(state,payload)=>{
      const {list} = payload;
      const paientinfolist = [];
      const paientinfos = {...state.paientinfos};
      lodashmap(list,(info)=>{
        paientinfolist.push(info._id);
        paientinfos[info._id] = info;
      });
      return {...state, paientinfolist,paientinfos};
  },
}, initial.paientinfo);

export default paientinfo;
