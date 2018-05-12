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

  Diseaseclassification:String,//病人分类:压疮高危／院前压疮／普通病人

  firstevaluatebardenid:{ type: Schema.Types.ObjectId, ref: 'evaluatebarden' },//首次evaluatebarden评估
  firstevaluatewoundsurfaceid:{ type: Schema.Types.ObjectId, ref: 'evaluatewoundsurface' },//首次创面评估
  firstevaluatenursingmeasuresid:{ type: Schema.Types.ObjectId, ref: 'evaluatenursingmeasures' },//首次护理措施
  formreviewlapsetoid:{ type: Schema.Types.ObjectId, ref: 'formreviewlapseto' },//转归表单

  depatid:{ type: Schema.Types.ObjectId, ref: 'depat' },//科室id
  bedid:{ type: Schema.Types.ObjectId, ref: 'bed' },//病床id
}, { strict: false });
PatientinfoSchema.plugin(mongoosePaginate);
const PatientinfoModel =mongoose.model('patientinfo',  PatientinfoSchema);

//护理部维护
const NursingDepatSchema = new Schema({
  name:String,//护理部名称
  nursingdepatuserid:{ type: Schema.Types.ObjectId, ref: 'user' },//护理部
}, { strict: false });
NursingDepatSchema.plugin(mongoosePaginate);
const NursingDepatModel =mongoose.model('nursingdepat',  NursingDepatSchema);

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

//权限,固定三条记录:普通护士/护士长或科室主管护士/护理部主管
const PermissionSchema = new Schema({
  name:String,
  memo:String,
});
PermissionSchema.plugin(mongoosePaginate);
const PermissionModel =mongoose.model('permission',  PermissionSchema);

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

//申报与转归
const FormReviewLapsetoSchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  created_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//新建时间
  updated_at:{ type: String, default:moment().format('YYYY-MM-DD HH:mm:ss')},//更新时间

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
  isunavoidablepressureulcer:{ type: Number,default: -1 },//是否符合难免压疮申报条件
  instruction:String,
  signed_nurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士签名
  signed_nurse_time:{ type: String},//护士签名时间
  signed_headnurse:{ type: Schema.Types.ObjectId, ref: 'user' },//护士长签名
  signed_headnurse_time:{ type: String},//护士长签名时间
  signed_nursingdepartment:{ type: Schema.Types.ObjectId, ref: 'user' },//主管部门签名
  signed_nursingdepartment_time:{ type: String},//主管部门签名时间
  lapseto:{
    ispressuresores:{ type: Number,default: -1 },
    occuredpressuresorestime:{type:String},
    lapsetooptions:[
      {
        name:String,
        checked:{ type: Schema.Types.Boolean,default: false },
      }
    ]
  }
}, { strict: false });
FormReviewLapsetoSchema.plugin(mongoosePaginate);
const FormReviewLapsetoModel =mongoose.model('formreviewlapseto',  FormReviewLapsetoSchema);

//翻身策略
const TurnoverstrategySchema = new Schema({
  userpatientid:{ type: Schema.Types.ObjectId, ref: 'patientinfo' },//病人ID
  usercreatorid:{ type: Schema.Types.ObjectId, ref: 'user' },//用户ID
  smartdeviceid:{ type: Schema.Types.ObjectId, ref: 'smartdevice' },//设备ID
}, { strict: false });
TurnoverstrategySchema.plugin(mongoosePaginate);
const TurnoverstrategyModel =mongoose.model('turnoverstrategy',  TurnoverstrategySchema);

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
exports.TurnoverstrategySchema = TurnoverstrategySchema;
exports.SmartDeviceSchema = SmartDeviceSchema;


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
exports.TurnoverstrategyModel = TurnoverstrategyModel;
exports.SmartDeviceModel = SmartDeviceModel;
