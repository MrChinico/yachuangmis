const async = require('async');
const hisdata = require('./gethisdata');
const synctodb = require('./synctodb');

const start_sync = ()=>{
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

    synctodb(list_patientinfo,list_bed,list_depat,list_staff,(err,result)=>{

    });

  });
}
