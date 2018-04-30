import {
    common_err,

    loginwithtoken_request,
    login_request,
    md_login_result,//这个result特殊，需要判断是否登录

    logout_request,
    logout_result,

    getsystemconfig_request,
    getsystemconfig_result,


    changepwd_request,
    changepwd_result,

    saveusersettings_request,
    saveusersettings_result,

    getpatientinfolist_request,
    getpatientinfolist_result,

    getdepatlist_request,
    getdepatlist_result,

    createevaluatebarden_request,
    createevaluatebarden_result,

    editevaluatebarden_request,
    editevaluatebarden_result,

    getevaluatebardenlist_request,
    getevaluatebardenlist_result,

    createevaluatenursingmeasures_request,
    createevaluatenursingmeasures_result,

    editevaluatenursingmeasures_request,
    editevaluatenursingmeasures_result,

    getevaluatenursingmeasureslist_request,
    getevaluatenursingmeasureslist_result,

    createevaluatewoundsurface_request,
    createevaluatewoundsurface_result,

    editevaluatewoundsurface_request,
    editevaluatewoundsurface_result,

    getevaluatewoundsurfacelist_request,
    getevaluatewoundsurfacelist_result,

    editpatientinfo_request,
    editpatientinfo_result

  } from '../actions';

import {
  page_getpatientinfolist_request,
  page_getpatientinfolist_result
} from './pagination';
//接收的对应关系
let recvmessagetoresultpair = {
  'createevaluatebarden_result':createevaluatebarden_result,
  'editevaluatebarden_result':editevaluatebarden_result,
  'getevaluatebardenlist_result':getevaluatebardenlist_result,

  'createevaluatenursingmeasures_result':createevaluatenursingmeasures_result,
  'editevaluatenursingmeasures_result':editevaluatenursingmeasures_result,
  'getevaluatenursingmeasureslist_result':getevaluatenursingmeasureslist_result,

  'createevaluatewoundsurface_result':createevaluatewoundsurface_result,
  'editevaluatewoundsurface_result':editevaluatewoundsurface_result,
  'getevaluatewoundsurfacelist_result':getevaluatewoundsurfacelist_result,

  'editpatientinfo_result':editpatientinfo_result,
  'page_getpatientinfolist_result':page_getpatientinfolist_result,
  'getpatientinfolist_result':getpatientinfolist_result,
  'getdepatlist_result':getdepatlist_result,

  'saveusersettings_result':saveusersettings_result,


  'getsystemconfig_result':getsystemconfig_result,

  'common_err':common_err,

  'login_result':md_login_result,
  'logout_result':logout_result,

  'changepwd_result':changepwd_result
};

//非验证发送接口
let sendmessagefnsz = {

  'logout':`${logout_request}`,
  'loginwithtoken':`${loginwithtoken_request}`,
  'login':`${login_request}`,

  'getsystemconfig':`${getsystemconfig_request}`,

  'saveusersettings':`${saveusersettings_request}`,
  'page_getpatientinfolist':`${page_getpatientinfolist_request}`,
  'editpatientinfo':`${editpatientinfo_request}`,
  'createevaluatebarden':`${createevaluatebarden_request}`,
  'editevaluatebarden':`${editevaluatebarden_request}`,
  'getevaluatebardenlist':`${getevaluatebardenlist_request}`,

  'createevaluatenursingmeasures':`${createevaluatenursingmeasures_request}`,
  'editevaluatenursingmeasures':`${editevaluatenursingmeasures_request}`,
  'getevaluatenursingmeasureslist':`${getevaluatenursingmeasureslist_request}`,

  'createevaluatewoundsurface':`${createevaluatewoundsurface_request}`,
  'editevaluatewoundsurface':`${editevaluatewoundsurface_request}`,
  'getevaluatewoundsurfacelist':`${getevaluatewoundsurfacelist_request}`,

};

//验证发送接口
let sendmessageauthfnsz = {
  'getpatientinfolist':`${getpatientinfolist_request}`,
  'getdepatlist':`${getdepatlist_request}`,
  'changepwd':`${changepwd_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
