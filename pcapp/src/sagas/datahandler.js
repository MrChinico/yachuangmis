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
    getevaluatebardenlist_result

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

  'createevaluatebarden':`${createevaluatebarden_request}`,
  'editevaluatebarden':`${editevaluatebarden_request}`,
  'getevaluatebardenlist':`${getevaluatebardenlist_request}`
};

//验证发送接口
let sendmessageauthfnsz = {
  'getpatientinfolist':`${getpatientinfolist_request}`,
  'getdepatlist':`${getdepatlist_request}`,
  'changepwd':`${changepwd_request}`,
};

export default {recvmessagetoresultpair,sendmessagefnsz,sendmessageauthfnsz};
