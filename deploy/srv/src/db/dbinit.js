const _ = require('lodash');
const DBModels = require('./models');
const mongoose = require('mongoose');
const pwd = require('../util/pwd.js');

const permission_json = [
  {
      "_id" : mongoose.Types.ObjectId("5a03b66013e7410cd0ef3093"),
      "name" : "普通护士",
      "memo" : "普通护士可以递交申请",
  },
  {
      "_id" : mongoose.Types.ObjectId("5a03b66e13e7410cd0ef3094"),
      "name" : "护士长",
      "memo" : "护士长或科室主管护士,包含普通护士权限,可递交申请也可审批",
  },
  {
    "_id" : mongoose.Types.ObjectId("5a5a1113da6e595af4eb515e"),
    "name" : "护理部主管",
    "memo" : "只能审批",
  },
];

const defaultnursingdepat = {
    "_id" : mongoose.Types.ObjectId("5ade006f51bc9208214f3925"),
    "name" : "护理部",
    "nursingdepatuserid":mongoose.Types.ObjectId("5aeac4a846c43bd15c8951fa"),
    adminflag:1
};

const defaultsystemconfig = {

    "_id" : mongoose.Types.ObjectId("5ade03f49b576b35b9cbe507"),
    "url_patientinfo" : "http://localhost:8081/v1/getlist_patientinfo",
    "url_depat" : "http://localhost:8081/v1/getlist_depat",
    "url_bed" : "http://localhost:8081/v1/getlist_bed",
    "url_staff" : "http://localhost:8081/v1/getlist_staff",
    "Hospitalname" : "XX医院",

}

const initDB = ()=>{
  // const systemconfigModel = DBModels.SystemConfigModel;
  // systemconfigModel.findOneAndUpdate({_id:defaultsystemconfig._id}, {$set:defaultsystemconfig},{new: true,upsert:true},(err,result)=>{
  // });

  const dbModel = DBModels.PermissionModel;
  _.map(permission_json,(v)=>{
    dbModel.findOneAndUpdate({_id:v._id}, {$set:v},{new: true,upsert:true},(err,result)=>{
    });
  });

  //createadmin
  const passwordsalt = pwd.getsalt();
  pwd.hashPassword('admin',passwordsalt,(err,passwordhash)=>{
    if(!err){
      adminuser = {
        username:'admin',
        passwordsalt,
        passwordhash,
        permission:mongoose.Types.ObjectId("5a5a1113da6e595af4eb515e"),
        adminflag:1
      };
      const userModel = DBModels.UserModel;
      userModel.findOneAndUpdate({_id:mongoose.Types.ObjectId("5aeac4a846c43bd15c8951fa")}, {$set:adminuser},{new: true,upsert:true},(err,result)=>{
      });
    }
  });

  //默认护理部
  const nursingDepatModel = DBModels.NursingDepatModel;
  nursingDepatModel.findOneAndUpdate({_id:defaultnursingdepat._id}, {$set:defaultnursingdepat},{new: true,upsert:true},(err,result)=>{
  });

}

module.exports= initDB;
