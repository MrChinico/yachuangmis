require('es6-promise').polyfill();
require('isomorphic-fetch');
// const _ = require('lodash');
const config = require('../config');

const geturldata = (url,callbackfn)=>{
  fetch(url).then((res)=>{
    return res.json();
  }).then((json)=> {
    callbackfn(json);
  }).catch((e)=>{
    console.log(e);
    callbackfn([]);
  });
}
const gethisdata_patientinfo = (callbackfn)=>{
  const url = `${config.hisurl.url_patientinfo}`;
  geturldata(url,callbackfn);
}

const gethisdata_bed = (callbackfn)=>{
  const url = `${config.hisurl.url_bed}`;
  geturldata(url,callbackfn);
}

const gethisdata_depat = (callbackfn)=>{
  const url = `${config.hisurl.url_depat}`;
  geturldata(url,callbackfn);
}

const gethisdata_staff = (callbackfn)=>{
  const url = `${config.hisurl.url_staff}`;
  geturldata(url,callbackfn);
}

exports.gethisdata_patientinfo = gethisdata_patientinfo;
exports.gethisdata_bed = gethisdata_bed;
exports.gethisdata_depat = gethisdata_depat;
exports.gethisdata_staff = gethisdata_staff;
