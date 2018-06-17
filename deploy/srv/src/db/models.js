const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
const SystemConfigSchema = new Schema({
  Hospitalname:String,
  HisInterface:{
    url_patientinfo:String,
    url_depat:String,
    url_bed:String,
    url_staff:String,
  }
}, { strict: false });
SystemConfigSchema.plugin(mongoosePaginate);
const SystemConfigModel =mongoose.model('systemconfig',  SystemConfigSchema);
// {
//     "_id" : ObjectId("5ade03f49b576b35b9cbe507"),
//     "__v" : 0,
//     "Hospitalname" : "湖南长沙第一人民医院",
//     "url_staff" : "http://localhost:8081/v1/getlist_staff",
//     "url_bed" : "http://localhost:8081/v1/getlist_bed",
//     "url_depat" : "http://localhost:8081/v1/getlist_depat",
//     "url_patientinfo" : "http://localhost:8081/v1/getlist_patientinfo"
// }

//病人管理
// 病人主键 住院号码 病人姓名 病人性别 出生年月 入院日期 入院诊断 在院判别 所在科室 床位号 出院日期 病人分类
const PatientinfoSchema = new Schema({
  Patientid:String,//病人编号 <--
  Patientno:String,//住院号码
  Patientname:String,//病人姓名
  Sex:String,//病人性别
  Birthday:String,//出生年月
  In_date:String,//入院日期
  Out_date:String,//出院日期
  In_diagnosis:String,//入院诊断
  In_out_flag:String,//在院判别 0:在院 1:出院
  Depatno:String,//所在科室<--depat
  Bedno:String,//床位号

  Diseaseclassification:String,//病人分类:难免压疮／院前压疮／普通病人／院内压疮／难免转院内

  stage:String,//病人状态【

  firstevaluatebardenid:{ type: Schema.Types.ObjectId, ref: 'evaluatebarden' },//首次evaluatebarden评估
  firstevaluatewoundsurfaceid:{ type: Schema.Types.ObjectId, ref: 'evaluatewoundsurface' },//首次创面评估
  firstevaluatenursingmeasuresid:{ type: Schema.Types.ObjectId, ref: 'evaluatenursingmeasures' },//首次护理措施
  formreviewlapsetoid:{ type: Schema.Types.ObjectId, ref: 'formreviewlapseto' },//转归表单
  formreviewlapsetoid2:{ type: Schema.Types.ObjectId, ref: 'formreviewlapseto' },//难免转院内，第二张报表

  depatid:{ type: Schema.Types.ObjectId, ref: 'depat' },//科室id
  bedid:{ type: Schema.Types.ObjectId, ref: 'bed' },//病床id
}, { strict: false });
PatientinfoSchema.plugin(mongoosePaginate);
const PatientinfoModel =mongoose.model('patientinfo',  PatientinfoSchema);
// {
//     "_id" : ObjectId("5aeac4a946c43bd15c895257"),
//     "Patientno" : "No1000",
//     "__v" : 0,
//     "depatid" : ObjectId("5aeac4a846c43bd15c8951f7"),
//     "Bedno" : "BD1000",
//     "Depatno" : "DT001",
//     "In_out_flag" : "0",
//     "In_diagnosis" : "压疮",
//     "Out_date" : "2008-05-27 10:05:21",
//     "In_date" : "2008-04-23 18:00:10",
//     "Sex" : "1",
//     "Patientname" : "王一",
//     "Patientid" : "1000",
//     "firstevaluatebardenid" : ObjectId("5aeffe73422917381a80dc08"),
//     "firstevaluatewoundsurfaceid" : ObjectId("5af1cd84d38f3c58e5995139"),
//     "id" : "5aeac4a946c43bd15c895257",
//     "bedid" : ObjectId("5aeac4a946c43bd15c895253"),
//     "firstevaluatenursingmeasuresid" : ObjectId("5aefff89422917381a80dc0b"),
//     "formreviewlapsetoid" : ObjectId("5b0e4203051cf06abdfe1413"),
//     "Diseaseclassification" : "院内压疮"
// }
//护理部维护
const NursingDepatSchema = new Schema({
  name:String,//护理部名称
  nursingdepatuserid:{ type: Schema.Types.ObjectId, ref: 'user' },//护理部
}, { strict: false });
NursingDepatSchema.plugin(mongoosePaginate);
const NursingDepatModel =mongoose.model('nursingdepat',  NursingDepatSchema);
// {
//     "_id" : ObjectId("5ade006f51bc9208214f3925"),
//     "__v" : 0,
//     "adminflag" : 1,
//     "name" : "护理部",
//     "nursingdepatuserid" : ObjectId("5aeac4a946c43bd15c895255"),
//     "id" : "5ade006f51bc9208214f3925"
// }
//科室维护
const DepatSchema = new Schema({
  Depatno:String,//科室编号
  Depatname:String,//科室名称
  DepProperty:String,//科室属性:住院科室/病区/门诊科室
  nursingdepatid:{ type: Schema.Types.ObjectId, ref: 'nursingdepat',default:mongoose.Types.ObjectId("5ade006f51bc9208214f3925") },//所属护理部
  headnurseid:{ type: Schema.Types.ObjectId, ref: 'user' },//护士长
}, { strict: false });
DepatSchema.plugin(mongoosePaginate);
const DepatModel =mongoose.model('depat',  DepatSchema);
// {
//     "_id" : ObjectId("5aeac4a846c43bd15c8951f7"),
//     "Depatno" : "DT001",
//     "__v" : 0,
//     "Depatname" : "科室一",
//     "nursingdepatid" : ObjectId("5ade006f51bc9208214f3925"),
//     "id" : "5aeac4a846c43bd15c8951f7",
//     "headnurseid" : ObjectId("5aeac4a946c43bd15c89526d"),
//     "DepProperty" : "2",
//     "isenabled" : true
// }
//床位维护
const BedSchema = new Schema({
  Bedno:String,//床位号
  Bedname:String,//床位名称
  Depatno:String,//科室编号<---depat
  BedProperty:{ type:String, default: '0' },//床位性质: 普通床位/智能设备床位

  depatid:{ type: Schema.Types.ObjectId, ref: 'depat' },//科室id
  smartdeviceid:{ type: Schema.Types.ObjectId, ref: 'smartdevice' },//设备ID
}, { strict: false });
BedSchema.plugin(mongoosePaginate);
const BedModel =mongoose.model('bed',  BedSchema);
// {
//     "_id" : ObjectId("5aeac4a846c43bd15c895201"),
//     "Bedno" : "BD001",
//     "__v" : 0,
//     "depatid" : ObjectId("5aeac4a846c43bd15c8951f7"),
//     "Depatno" : "DT001",
//     "Bedname" : "001床",
//     "BedProperty" : "0",
//     "id" : "5aeac4a846c43bd15c895201",
//     "smartdeviceid" : ObjectId("5af2ec8c2bfe34ff586833d2")
// }
//用户维护
const UserSchema = new Schema({
  username:String,
  passwordhash: String,
  passwordsalt: String,
  truename:String,
  memo:String,
  adminflag:Number,

  Staffno:String,//用户代码
  Staffid:String,//用户工号
  Staffname:String,//用户姓名
  Depatno:String,//所在科室<---depat
  permission:{ type: Schema.Types.ObjectId, ref: 'permission',default:mongoose.Types.ObjectId("5a03b66013e7410cd0ef3093")  },//权限ID

  depatid:{ type: Schema.Types.ObjectId, ref: 'depat' },//科室id


  created_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
  updated_at: { type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
});
UserSchema.plugin(mongoosePaginate);
const UserModel =mongoose.model('user',  UserSchema);
// {
//     "_id" : ObjectId("5aeac4a946c43bd15c89526d"),
//     "Staffid" : "No5002",
//     "__v" : 0,
//     "depatid" : ObjectId("5aeac4a846c43bd15c8951f7"),
//     "Depatno" : "DT001",
//     "Staffname" : "钱三",
//     "Staffno" : "T002",
//     "passwordhash" : "3127e69d7e518e2b928ef277903abf6e9e166bee9a2506e30d698235fac518293ad9f580773f736331033ce4e93c20970a6a22e9310ee401d0464474aa203e7c",
//     "passwordsalt" : "cdb0360f-582b-46fb-8c48-de21928efb56",
//     "username" : "T002",
//     "updated_at" : "2018-06-12 22:33:24",
//     "created_at" : "2018-05-03 16:15:35",
//     "truename" : "王护士长",
//     "permission" : ObjectId("5a03b66e13e7410cd0ef3094")
// }
//权限,固定三条记录:普通护士/护士长或科室主管护士/护理部主管
const PermissionSchema = new Schema({
  name:String,
  memo:String,
});
PermissionSchema.plugin(mongoosePaginate);
const PermissionModel =mongoose.model('permission',  PermissionSchema);
// {
//     "_id" : ObjectId("5a03b66013e7410cd0ef3093"),
//     "__v" : 0,
//     "memo" : "普通护士可以递交申请",
//     "name" : "普通护士"
// }
//日志
const UserLogSchema = new Schema({
    creator:{ type: Schema.Types.ObjectId, ref: 'user' },
    created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},
    logtxt:{type:String,default:'login'}
});
UserLogSchema.plugin(mongoosePaginate);
const UserLogModel =mongoose.model('userlog',  UserLogSchema);

//Barden评估
const EvaluateBardenSchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  updated_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//更新时间
  score_sensoryperception:{ type: Number, default: 0 },//感知
  score_moisture:{ type: Number, default: 0 },//潮湿
  score_activity:{ type: Number, default: 0 },//活动能力
  score_mobility:{ type: Number, default: 0 },//移动能力
  score_nutrition:{ type: Number, default: 0 },//营养
  score_friction:{ type: Number, default: 0 },//摩擦力/剪切力
  score:{type:Number, default: 0},
  signed_nurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士签名
  signed_nurse_time:{ type: String},//护士签名时间
  signed_headnurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士长签名
  signed_headnurse_time:{ type: String},//护士长签名时间
}, { strict: false });
EvaluateBardenSchema.plugin(mongoosePaginate);
const EvaluateBardenModel =mongoose.model('evaluatebarden',  EvaluateBardenSchema);
// {
//     "_id" : ObjectId("5aeffe73422917381a80dc08"),
//     "userpatientid" : ObjectId("5aeac4a946c43bd15c895257"),
//     "usercreatorid" : ObjectId("5aeac4a946c43bd15c895276"),
//     "score" : 11,
//     "score_friction" : 2,
//     "score_nutrition" : 1,
//     "score_mobility" : 2,
//     "score_activity" : 3,
//     "score_moisture" : 2,
//     "score_sensoryperception" : 1,
//     "updated_at" : "2018-05-07 15:21:23",
//     "created_at" : "2018-05-07 15:21:23",
//     "__v" : 0
// }
//护理措施
/*
nursingmeasures:[
{
  groupname:'全 身 治 疗',
  options:[
  {
    name:'积极治疗原发病',
    checked:false,
  },
  {
    name:'增加营养',
    checked:false,
  },
  ]
}
]
*/
const EvaluateNursingmeasuresSchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  updated_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//更新时间
  nursingmeasures:[
    {
        groupname:String,//全 身 治 疗
        options:[
          {
            name:String,
            checked:{ type: Schema.Types.Boolean,default: false },
          }
        ]
    }
  ],
  nursingmeasuresother:String,
  signed_nurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士签名
  signed_nurse_time:{ type: String},//护士签名时间
  signed_headnurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士长签名
  signed_headnurse_time:{ type: String},//护士长签名时间
}, { strict: false });
EvaluateNursingmeasuresSchema.plugin(mongoosePaginate);
const EvaluateNursingmeasuresModel =mongoose.model('evaluatenursingmeasures',  EvaluateNursingmeasuresSchema);
// {
//     "_id" : ObjectId("5aefff89422917381a80dc0b"),
//     "userpatientid" : ObjectId("5aeac4a946c43bd15c895257"),
//     "usercreatorid" : ObjectId("5aeac4a946c43bd15c895276"),
//     "nursingmeasures" : [
//         {
//             "groupname" : "全身治疗",
//             "_id" : ObjectId("5aefff89422917381a80dc26"),
//             "options" : [
//                 {
//                     "name" : "1、积极治疗原发病",
//                     "_id" : ObjectId("5aefff89422917381a80dc2a"),
//                     "checked" : true
//                 },
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc32"),
//                     "name" : "2、增加营养",
//                     "checked" : true
//                 },
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc31"),
//                     "name" : "3、抗感染治疗",
//                     "checked" : true
//                 },
//                 {
//                     "name" : "4、心理护理",
//                     "_id" : ObjectId("5aefff89422917381a80dc27"),
//                     "checked" : false
//                 }
//             ]
//         },
//         {
//             "groupname" : "体位与活动",
//             "_id" : ObjectId("5aefff89422917381a80dc22"),
//             "options" : [
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc30"),
//                     "name" : "1、建立翻身卡",
//                     "checked" : true
//                 },
//                 {
//                     "name" : "2、定期翻身或更换体位",
//                     "_id" : ObjectId("5aefff89422917381a80dc24"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "3、指导执行肢体主动、被动运动",
//                     "_id" : ObjectId("5af9058f5404db719a0c512b"),
//                     "checked" : true
//                 }
//             ]
//         },
//         {
//             "groupname" : "皮肤护理",
//             "_id" : ObjectId("5aefff89422917381a80dc1d"),
//             "options" : [
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc2f"),
//                     "name" : "1、使用中性温和的清洁剂清洁身体皮肤",
//                     "checked" : true
//                 },
//                 {
//                     "name" : "2、使用乳液维持皮肤滋润",
//                     "_id" : ObjectId("5aefff89422917381a80dc20"),
//                     "checked" : false
//                 },
//                 {
//                     "name" : "3、保持床单位、衣物的清洁、干燥、平整",
//                     "_id" : ObjectId("5afda2525dfaad58726260a1"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "4、正确摆放位置，预防管道压迫",
//                     "_id" : ObjectId("5afda2525dfaad76836260a0"),
//                     "checked" : true
//                 }
//             ]
//         },
//         {
//             "groupname" : "使用辅助用品",
//             "_id" : ObjectId("5aefff89422917381a80dc18"),
//             "options" : [
//                 {
//                     "name" : "1、骨突部位予以保护",
//                     "_id" : ObjectId("5aefff89422917381a80dc1c"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "2、足跟避免受压",
//                     "_id" : ObjectId("5aefff89422917381a80dc1b"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "3、使用软枕、翻身垫及其它辅助支托",
//                     "_id" : ObjectId("5aefff89422917381a80dc1a"),
//                     "checked" : false
//                 },
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc2e"),
//                     "name" : "4、使用防压疮 翻身床垫",
//                     "checked" : true
//                 }
//             ]
//         },
//         {
//             "groupname" : "敷料使用",
//             "_id" : ObjectId("5aefff89422917381a80dc12"),
//             "options" : [
//                 {
//                     "name" : "1、使用赛肤润",
//                     "_id" : ObjectId("5aefff89422917381a80dc17"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "2、使用泡沫敷料",
//                     "_id" : ObjectId("5aefff89422917381a80dc16"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "3、使用水胶体敷料",
//                     "_id" : ObjectId("5aefff89422917381a80dc15"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "4、使用薄膜敷料",
//                     "_id" : ObjectId("5aefff89422917381a80dc14"),
//                     "checked" : true
//                 },
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc2d"),
//                     "name" : "5、纱布、棉垫",
//                     "checked" : false
//                 }
//             ]
//         },
//         {
//             "groupname" : "患者家属健康教育",
//             "_id" : ObjectId("5aefff89422917381a80dc0c"),
//             "options" : [
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc2c"),
//                     "name" : "1、知道压疮预防目的及方法",
//                     "checked" : true
//                 },
//                 {
//                     "name" : "2、指导翻身、肢体活动",
//                     "_id" : ObjectId("5aefff89422917381a80dc10"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "3、知道防护用品的使用方法",
//                     "_id" : ObjectId("5aefff89422917381a80dc0f"),
//                     "checked" : true
//                 },
//                 {
//                     "name" : "4、使用薄膜敷料",
//                     "_id" : ObjectId("5aefff89422917381a80dc0e"),
//                     "checked" : true
//                 },
//                 {
//                     "_id" : ObjectId("5af000ac422917381a80dc2b"),
//                     "name" : "4、注意营养摄入",
//                     "checked" : true
//                 }
//             ]
//         }
//     ],
//     "updated_at" : "2018-05-07 15:26:01",
//     "created_at" : "2018-05-07 15:26:01",
//     "__v" : 0
// }
//创面
const EvaluateWoundsurfaceSchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  updated_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//更新时间
  evaluateWoundsurfaces:[
    {
      '分期':{
        label:String,
        value:Number,
      },
      '部位':{
        label:String,
        value:Number,
        lr:String,
      },
      '创面大小':{
        '长':Number,
        '宽':Number,
        '深':Number,
        '潜行':String,
        '窦道':String,
        '颜色':String,
        '渗液量':String
      }
    }
  ],

}, { strict: false });
EvaluateWoundsurfaceSchema.plugin(mongoosePaginate);
const EvaluateWoundsurfaceModel =mongoose.model('evaluatewoundsurface',  EvaluateWoundsurfaceSchema);
// {
//     "_id" : ObjectId("5aeffe84422917381a80dc09"),
//     "userpatientid" : ObjectId("5aeac4a946c43bd15c895257"),
//     "usercreatorid" : ObjectId("5aeac4a946c43bd15c895276"),
//     "evaluateWoundsurfaces" : [
//         {
//             "_id" : ObjectId("5aeffe84422917381a80dc0a"),
//             "创面大小" : {
//                 "长" : 0,
//                 "宽" : 3,
//                 "深" : 0,
//                 "潜行" : "",
//                 "窦道" : "22",
//                 "颜色" : "",
//                 "渗液量" : ""
//             },
//             "部位" : {
//                 "label" : "足跟",
//                 "value" : 14
//             },
//             "分期" : {
//                 "label" : "三期",
//                 "value" : 3
//             }
//         },
//         {
//             "_id" : ObjectId("5b0e3de163693b6aa4dd9570"),
//             "创面大小" : {
//                 "渗液量" : "",
//                 "颜色" : "",
//                 "窦道" : "",
//                 "潜行" : "",
//                 "深" : 0,
//                 "宽" : 10,
//                 "长" : 0
//             },
//             "部位" : {
//                 "lr" : "左",
//                 "value" : 13,
//                 "label" : "踝部"
//             },
//             "分期" : {
//                 "value" : 3,
//                 "label" : "三期"
//             }
//         }
//     ],
//     "updated_at" : "2018-05-07 15:21:40",
//     "created_at" : "2018-05-07 15:21:40",
//     "__v" : 0
// }
//申报与转归
const FormReviewLapsetoSchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  updated_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//更新时间
  stagestatus:{type: String,enum:['未审核','护士长审核中','护理部审核中','已审核','已上报'],default: '未审核'},
  evaluatebardenscore:Number,//evaluatebarden
  preventivesmeasure:[
    {
      name:String,
      checked:{ type: Schema.Types.Boolean,default: false },
      value:String,
      options:[
        {
          name:String,
          checked:{ type: Schema.Types.Boolean,default: false },
          value:String
        }
      ]
    }
  ],
  conditions:{
    prerequisites:[
      {
        name:String,
        checked:{ type: Schema.Types.Boolean,default: false },
      }
    ],
    alternative:[
      {
        name:String,
        checked:{ type: Schema.Types.Boolean,default: false },
      }
    ],
  },
  diagnosis:String,//诊断
  wsffrom:String,//压疮来源
  isunavoidablepressureulcer:{ type: Number,default: -1 },//是否符合难免压疮申报条件
  instruction:String,//指导意见
  signed_nurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士签名
  signed_nurse_time:{ type: String},//护士签名时间
  signed_headnurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士长签名
  signed_headnurse_time:{ type: String},//护士长签名时间
  signed_headnurse_instruction:String,//护士长意见
  signed_nursingdepartment:{ type: Schema.Types.ObjectId, ref: 'user' },//主管部门签名
  signed_nursingdepartment_time:{ type: String},//主管部门签名时间
  lapseto:{
    ispressuresores:{ type: Number,default: -1 },//是否发生压疮
    occuredpressuresorestime:{type:String},//压疮发生时间
    lapsetooptions:{//患者去向
      'checkout_checked':{ type: Schema.Types.Boolean,default: false },//出院/转院
      'death_checked':{ type: Schema.Types.Boolean,default: false },//死亡
    }
  },
  signed_report:{ type: Schema.Types.ObjectId, ref: 'user' },//护士签名
  signed_report_time:{ type: String},//护士签名时间

}, { strict: false });
FormReviewLapsetoSchema.plugin(mongoosePaginate);
const FormReviewLapsetoModel =mongoose.model('formreviewlapseto',  FormReviewLapsetoSchema);
// {
//     "_id" : ObjectId("5b1bfb2c83750a1940cb4a12"),
//     "wsffrom" : "",
//     "diagnosis" : "",
//     "occuredtime" : "",
//     "tonm" : {
//         "istonm" : false,
//         "istonmtime" : ""
//     },
//     "evaluatebardenscore" : 14,
//     "evaluateWoundsurfaces" : [
//         {
//             "情况" : "渗液量:,颜色:,窦道:,潜行:",
//             "大小" : "长:0cm,宽:0cm,深:1cm",
//             "分期" : "二期",
//             "部位" : "足跟"
//         }
//     ],
//     "admissions" : [
//         {
//             "checked" : false,
//             "name" : "1、强迫体位需要严格限制翻身"
//         },
//         {
//             "checked" : false,
//             "name" : "2、昏迷"
//         },
//         {
//             "checked" : false,
//             "name" : "3、肝功能衰竭"
//         },
//         {
//             "checked" : false,
//             "name" : "4、心力衰竭"
//         },
//         {
//             "checked" : false,
//             "name" : "5、呼吸衰竭"
//         },
//         {
//             "checked" : false,
//             "name" : "6、偏瘫/截肢/骨盆骨折/四肢麻痹"
//         },
//         {
//             "checked" : false,
//             "name" : "7、生命体征不稳定"
//         },
//         {
//             "checked" : false,
//             "name" : "8、高龄≥70 岁"
//         },
//         {
//             "checked" : false,
//             "name" : "9、血清蛋白<30g/L"
//         },
//         {
//             "checked" : false,
//             "name" : "10、极度消瘦"
//         },
//         {
//             "checked" : false,
//             "name" : "11、高度水肿"
//         },
//         {
//             "checked" : false,
//             "name" : "12、大小便失禁"
//         },
//         {
//             "checked" : false,
//             "name" : "13、疼痛"
//         },
//         {
//             "checked" : false,
//             "name" : "14、依从性差"
//         },
//         {
//             "checked" : false,
//             "name" : "15、其他"
//         }
//     ],
//     "isinfact" : -1,
//     "instruction" : "",
//     "userpatientid" : ObjectId("5aeac4a946c43bd15c895278"),
//     "usercreatorid" : ObjectId("5aeac4a946c43bd15c895283"),
//     "lapseto" : {
//         "occuredpressuresorestime" : "",
//         "lapsetooptions" : {
//             "isok_checked" : 0,
//             "death_checked" : false,
//             "checkout_checked" : false
//         },
//         "ispressuresores" : -1
//     },
//     "isunavoidablepressureulcer" : -1,
//     "conditions" : {
//         "alternative" : [
//             {
//                 "name" : "1、高龄≥70 岁",
//                 "_id" : ObjectId("5b1bfb2c83750a0650cb4a19"),
//                 "checked" : false
//             },
//             {
//                 "name" : "2、血清蛋白<30g/L",
//                 "_id" : ObjectId("5b1bfb2c83750a6f87cb4a18"),
//                 "checked" : false
//             },
//             {
//                 "name" : "3、极度消瘦",
//                 "_id" : ObjectId("5b1bfb2c83750a768acb4a17"),
//                 "checked" : false
//             },
//             {
//                 "name" : "4、高度水肿",
//                 "_id" : ObjectId("5b1bfb2c83750afec8cb4a16"),
//                 "checked" : false
//             },
//             {
//                 "name" : "5、大小便失禁",
//                 "_id" : ObjectId("5b1bfb2c83750a3d22cb4a15"),
//                 "checked" : false
//             },
//             {
//                 "name" : "6、依从性差",
//                 "_id" : ObjectId("5b1bfb2c83750ad038cb4a14"),
//                 "checked" : false
//             },
//             {
//                 "name" : "7、其他",
//                 "_id" : ObjectId("5b1bfb2c83750a291fcb4a13"),
//                 "checked" : false
//             }
//         ],
//         "prerequisites" : [
//             {
//                 "name" : "1、意识障碍",
//                 "_id" : ObjectId("5b1bfb2c83750a3126cb4a23"),
//                 "checked" : false
//             },
//             {
//                 "name" : "2、循环衰竭",
//                 "_id" : ObjectId("5b1bfb2c83750a2de4cb4a22"),
//                 "checked" : false
//             },
//             {
//                 "name" : "3、心里衰竭",
//                 "_id" : ObjectId("5b1bfb2c83750a263ccb4a21"),
//                 "checked" : false
//             },
//             {
//                 "name" : "4、呼吸衰竭",
//                 "_id" : ObjectId("5b1bfb2c83750a0a1acb4a20"),
//                 "checked" : false
//             },
//             {
//                 "name" : "5、肝功能衰竭",
//                 "_id" : ObjectId("5b1bfb2c83750a10a0cb4a1f"),
//                 "checked" : false
//             },
//             {
//                 "name" : "6、肾功能衰竭",
//                 "_id" : ObjectId("5b1bfb2c83750a50e1cb4a1e"),
//                 "checked" : false
//             },
//             {
//                 "name" : "7、偏瘫/截肢/骨盆骨折/四肢麻痹",
//                 "_id" : ObjectId("5b1bfb2c83750a1dc4cb4a1d"),
//                 "checked" : false
//             },
//             {
//                 "name" : "8、生命体征不稳定",
//                 "_id" : ObjectId("5b1bfb2c83750ac1f3cb4a1c"),
//                 "checked" : false
//             },
//             {
//                 "name" : "9、疼痛",
//                 "_id" : ObjectId("5b1bfb2c83750aa668cb4a1b"),
//                 "checked" : false
//             },
//             {
//                 "name" : "10、其他",
//                 "_id" : ObjectId("5b1bfb2c83750af0d8cb4a1a"),
//                 "checked" : false
//             }
//         ]
//     },
//     "preventivesmeasure" : [
//         {
//             "name" : "1、告知患者及家属压疮的危险性并悬挂“难免压疮”警示标志，进行健康宣教，讲解相关注意事项。",
//             "_id" : ObjectId("5b1bfb2c83750a0f57cb4a34"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "2、定时翻身更换体位，减轻皮肤受压、避免摩擦。",
//             "_id" : ObjectId("5b1bfb2c83750a04d7cb4a33"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "3、使用:",
//             "_id" : ObjectId("5b1bfb2c83750a0343cb4a2e"),
//             "options" : [
//                 {
//                     "name" : "1)气垫床",
//                     "_id" : ObjectId("5b1bfb2c83750a0217cb4a32"),
//                     "checked" : false
//                 },
//                 {
//                     "name" : "2)压疮辅料",
//                     "_id" : ObjectId("5b1bfb2c83750ab2d6cb4a31"),
//                     "checked" : false
//                 },
//                 {
//                     "name" : "3)请专家会诊",
//                     "_id" : ObjectId("5b1bfb2c83750a2fb2cb4a30"),
//                     "checked" : false
//                 },
//                 {
//                     "name" : "4)其他",
//                     "value" : "",
//                     "_id" : ObjectId("5b1bfb2c83750a533bcb4a2f"),
//                     "checked" : false
//                 }
//             ],
//             "checked" : false
//         },
//         {
//             "name" : "4、保持皮肤清洁、干燥，及时处理患者排泄物。",
//             "_id" : ObjectId("5b1bfb2c83750a060dcb4a2d"),
//             "options" : [],
//             "checked" : true
//         },
//         {
//             "name" : "5、即时更换床单，保持整洁、干燥。",
//             "_id" : ObjectId("5b1bfb2c83750aeaadcb4a2c"),
//             "options" : [],
//             "checked" : true
//         },
//         {
//             "name" : "6、指导及协助患者移位时，避免牵拉及摩擦皮肤",
//             "_id" : ObjectId("5b1bfb2c83750a323ecb4a2b"),
//             "options" : [],
//             "checked" : true
//         },
//         {
//             "name" : "7、加强全身营养",
//             "_id" : ObjectId("5b1bfb2c83750a3ad7cb4a2a"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "8、严格执行交接班制度",
//             "_id" : ObjectId("5b1bfb2c83750a20accb4a29"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "9、根据压疮分期采取正确的压疮护理",
//             "_id" : ObjectId("5b1bfb2c83750a7309cb4a28"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "10、动态评估与记录",
//             "_id" : ObjectId("5b1bfb2c83750aae65cb4a27"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "11、伤口造口治疗师会诊处理",
//             "_id" : ObjectId("5b1bfb2c83750ae5aecb4a26"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "12、科室换药",
//             "_id" : ObjectId("5b1bfb2c83750a1c5bcb4a25"),
//             "options" : [],
//             "checked" : false
//         },
//         {
//             "name" : "13、其他",
//             "value" : "",
//             "_id" : ObjectId("5b1bfb2c83750a93a4cb4a24"),
//             "options" : [],
//             "checked" : false
//         }
//     ],
//     "stagestatus" : "未审核",
//     "updated_at" : "2018-06-10 00:07:08",
//     "created_at" : "2018-06-10 00:07:08",
//     "__v" : 0
// }
//智能设备
const SmartDeviceSchema = new Schema({
  deviceid:String,
  protocolversion:String,
  realtimedata:{
    status:Number,
    statusstring:String,
    position:Number,
    positionstring:String,
    angle:Number,
    anglestring:String,
    establishstatus:Number,
    establishstatusstring:String,
    lastupdatetime:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//更新时间
  }
}, { strict: false });
SmartDeviceSchema.plugin(mongoosePaginate);
const SmartDeviceModel =mongoose.model('smartdevice',  SmartDeviceSchema);
// {
//     "_id" : ObjectId("5af0018b2bfe34ff58662952"),
//     "deviceid" : "02",
//     "__v" : 0,
//     "realtimedata" : {
//         "lastupdatetime" : "2018-05-22 00:04:57",
//         "establishstatusstring" : "姿态建立完成并保持",
//         "establishstatus" : 49,
//         "anglestring" : "30度",
//         "angle" : 30,
//         "positionstring" : "左侧",
//         "position" : 76,
//         "statusstring" : "设备运行态",
//         "status" : 49
//     }
// }
//翻身记录
const TurnoverHistorySchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  smartdeviceid:{ type: Schema.Types.ObjectId, ref: 'smartdevice' },//设备ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  descriptionstring:String,
  cmdhex:String,
  sendstatus:String,
}, { strict: false });
TurnoverHistorySchema.plugin(mongoosePaginate);
const TurnoverHistoryModel =mongoose.model('turnoverhistory',  TurnoverHistorySchema);
// {
//     "_id" : ObjectId("5b02671cd6d6802d47674ddd"),
//     "userpatientid" : ObjectId("5aeac4a946c43bd15c895257"),
//     "usercreatorid" : ObjectId("5aeac4a946c43bd15c89526d"),
//     "smartdeviceid" : ObjectId("5af0018b2bfe34ff58662952"),
//     "descriptionstring" : "30分钟60度左右循环翻",
//     "cmdhex" : "493702020401451e",
//     "sendstatus" : "设备02处于离线状态",
//     "created_at" : "2018-05-21 14:28:44",
//     "__v" : 0
// }
//历史数据
const HistoryDeviceSchema = new Schema({
  smartdeviceid:{ type: Schema.Types.ObjectId, ref: 'smartdevice' },//设备ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  status:Number,
  statusstring:String,
  position:Number,
  positionstring:String,
  angle:Number,
  anglestring:String,
  establishstatus:Number,
  establishstatusstring:String,
}, { strict: false });
HistoryDeviceSchema.plugin(mongoosePaginate);
const HistoryDeviceModel =mongoose.model('historydevice',  HistoryDeviceSchema);

exports.SystemConfigSchema = SystemConfigSchema;
exports.PatientinfoSchema = PatientinfoSchema;
exports.DepatSchema = DepatSchema;
exports.NursingDepatSchema = NursingDepatSchema;
exports.BedSchema = BedSchema;
exports.UserSchema = UserSchema;
exports.PermissionSchema = PermissionSchema;
exports.UserLogSchema = UserLogSchema;
exports.EvaluateBardenSchema = EvaluateBardenSchema;
exports.EvaluateNursingmeasuresSchema = EvaluateNursingmeasuresSchema;
exports.EvaluateWoundsurfaceSchema = EvaluateWoundsurfaceSchema;
exports.FormReviewLapsetoSchema = FormReviewLapsetoSchema;
exports.TurnoverHistorySchema = TurnoverHistorySchema;
exports.SmartDeviceSchema = SmartDeviceSchema;
exports.HistoryDeviceSchema = HistoryDeviceSchema;


exports.SystemConfigModel = SystemConfigModel;
exports.PatientinfoModel = PatientinfoModel;
exports.DepatModel = DepatModel;
exports.NursingDepatModel = NursingDepatModel;
exports.BedModel = BedModel;
exports.UserModel = UserModel;
exports.PermissionModel = PermissionModel;
exports.UserLogModel = UserLogModel;
exports.EvaluateBardenModel = EvaluateBardenModel;
exports.EvaluateNursingmeasuresModel = EvaluateNursingmeasuresModel;
exports.EvaluateWoundsurfaceModel = EvaluateWoundsurfaceModel;
exports.FormReviewLapsetoModel = FormReviewLapsetoModel;
exports.TurnoverHistoryModel = TurnoverHistoryModel;
exports.SmartDeviceModel = SmartDeviceModel;
exports.HistoryDeviceModel = HistoryDeviceModel;
