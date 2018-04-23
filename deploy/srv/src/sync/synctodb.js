const map = require('lodash.map');
const _ = require('lodash');
const async = require('async');
const DBModels = require('../db/models.js');
const debug = require('debug')('appsrv:sync');

const todb_depat = (list_depat,callbackfn)=>{
    let fnsz = [];
    let depatno2id = {};
    const dbModel = DBModels.DepatModel;
    _.map(list_depat,(depatinfo)=>{
      fnsz.push((callbackfn)=>{
        debug(`get depat->${JSON.stringify(depatinfo)}`)
        dbModel.findOneAndUpdate({Depatno:depatinfo.Depatno}, {$set:depatinfo},{new: true,upsert:true},(err,result)=>{
          if(!err && !!result){
            depatno2id[depatinfo.Depatno] = result._id;
          }
          callbackfn();
        });
      });
    });

    async.series(fnsz,(err,result)=>{
      callbackfn(depatno2id);
    });
}

const todb_bed = (list_bed,depatno2id,callbackfn)=>{
    let fnsz = [];
    let bedno2id = {};
    const dbModel = DBModels.BedModel;
    _.map(list_bed,(bed)=>{
      fnsz.push((callbackfn)=>{
        if(!!depatno2id[bed.Depatno]){
          bed.depatid = depatno2id[bed.Depatno];
        }
        dbModel.findOneAndUpdate({Bedno:bed.Bedno}, {$set:bed},{new: true,upsert:true},(err,result)=>{
          if(!err && !!result){
            bedno2id[bed.Bedno] = result._id;
          }
          callbackfn();
        });
      });
    });

    async.series(fnsz,(err,result)=>{
      callbackfn(bedno2id);
    });
}

const todb_staff = (list_staff,depatno2id,callbackfn)=>{
  let fnsz = [];
  const dbModel = DBModels.UserModel;
  _.map(list_staff,(staff)=>{
    fnsz.push((callbackfn)=>{
      if(!!depatno2id[staff.Depatno]){
        staff.depatid = depatno2id[staff.Depatno];
      }
      dbModel.findOneAndUpdate({Staffid:staff.Staffid}, {$set:staff},{new: true,upsert:true},(err,result)=>{
        callbackfn();
      });
    });
  });

  async.series(fnsz,(err,result)=>{
    callbackfn();
  });
}

const todb_patientinfo = (list_patientinfo,depatno2id,bedno2id,callbackfn)=>{
  let fnsz = [];
  const dbModel = DBModels.PatientinfoModel;
  _.map(list_patientinfo,(patientinfo)=>{
    fnsz.push((callbackfn)=>{
      if(!!depatno2id[patientinfo.Depatno]){
        patientinfo.depatid = depatno2id[patientinfo.Depatno];
      }
      if(!!bedno2id[patientinfo.Bedno]){
        patientinfo.bedid = depatno2id[patientinfo.Bedno];
      }
      dbModel.findOneAndUpdate({Patientno:patientinfo.Patientno}, {$set:patientinfo},{new: true,upsert:true},(err,result)=>{
        callbackfn();
      });
    });
  });

  async.series(fnsz,(err,result)=>{
    callbackfn();
  });
}

const startmodule = (list_patientinfo,list_bed,list_depat,list_staff,callbackfn)=>{
  todb_depat(list_depat,(depatno2id)=>{
    debug(`depat success,get :${JSON.stringify(depatno2id)}`)
    todb_bed(list_bed,depatno2id,(bedno2id)=>{
      debug(`bed success,get :${JSON.stringify(bedno2id)}`)
      let fnsz = [];
      fnsz.push((callbackfn)=>{
        todb_patientinfo(list_patientinfo,depatno2id,bedno2id,()=>{
          callbackfn(null,true);
        })
      });
      fnsz.push((callbackfn)=>{
        todb_staff(list_staff,depatno2id,()=>{
          callbackfn(null,true);
        })
      });

      async.parallel(fnsz,(err,result)=>{
        debug(`get success all`)
        callbackfn();
      });
    });
  });
};

module.exports=  startmodule;
