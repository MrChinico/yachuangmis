const async = require('async');
const hisdata = require('./gethisdata');
const synctodb = require('./synctodb');
const debug = require('debug')('appsrv:sync');

const start_sync = (callbackfn)=>{
  let fnsz = [];
  fnsz.push((callbackfn)=>{
    hisdata.gethisdata_patientinfo((list)=>{
      callbackfn(null,list);
    });
  });
  fnsz.push((callbackfn)=>{
    hisdata.gethisdata_bed((list)=>{
      callbackfn(null,list);
    });
  });
  fnsz.push((callbackfn)=>{
    hisdata.gethisdata_depat((list)=>{
      callbackfn(null,list);
    });
  });
  fnsz.push((callbackfn)=>{
    hisdata.gethisdata_staff((list)=>{
      callbackfn(null,list);
    });
  });

  async.parallel(fnsz,(err,result)=>{
    const list_patientinfo = result[0];
    const list_bed = result[1];
    const list_depat = result[2];
    const list_staff = result[3];

    debug(`get data list_patientinfo-->${JSON.stringify(list_patientinfo)}`)
    debug(`get data list_bed-->${JSON.stringify(list_bed)}`)
    debug(`get data list_depat-->${JSON.stringify(list_depat)}`)
    debug(`get data list_staff-->${JSON.stringify(list_staff)}`)
    synctodb(list_patientinfo,list_bed,list_depat,list_staff,(err,result)=>{
      callbackfn(null,true);
    });

  });
}

module.exports=  start_sync;
