const db = require('./models.js');
const dbs = {
  'systemconfig':{
    urlname:'/systemconfig',
    schema:db.SystemConfigSchema,
    collectionname:'systemconfig',
  },
  'patientinfo':{
    urlname:'/patientinfo',
    schema:db.PatientinfoSchema,
    collectionname:'patientinfo',
  },
  'nursingdepat':{
    urlname:'/nursingdepat',
    schema:db.NursingDepatSchema,
    collectionname:'nursingdepat',
  },
  'depat':{
    urlname:'/depat',
    schema:db.DepatSchema,
    collectionname:'depat',
  },
  'bed':{
    urlname:'/bed',
    schema:db.BedSchema,
    collectionname:'bed',
  },
  'userlog':{
    urlname:'/userlog',
    schema:db.UserLogSchema,
    collectionname:'userlog',
  },
  'user':{
    urlname:'/user',
    schema:db.UserSchema,
    collectionname:'user',
  },
  'permission':{
    urlname:'/permission',
    schema:db.PermissionSchema,
    collectionname:'permission',
  },

  'evaluatebarden':{
    urlname:'/evaluatebarden',
    schema:db.EvaluateBardenSchema,
    collectionname:'evaluatebarden',
  },
  'evaluatenursingmeasures':{
    urlname:'/evaluatenursingmeasures',
    schema:db.EvaluateNursingmeasuresSchema,
    collectionname:'evaluatenursingmeasures',
  },
  'evaluatewoundsurface':{
    urlname:'/evaluatewoundsurface',
    schema:db.EvaluateWoundsurfaceSchema,
    collectionname:'evaluatewoundsurface',
  },
  'formreivewlapseto':{
    urlname:'/formreivewlapseto',
    schema:db.FormReviewLapsetoSchema,
    collectionname:'formreviewlapseto',
  },
  'turnoverstrategy':{
    urlname:'/turnoverstrategy',
    schema:db.TurnoverstrategySchema,
    collectionname:'turnoverstrategy',
  },
  'smartdevice':{
    urlname:'/smartdevice',
    schema:db.SmartDeviceSchema,
    collectionname:'smartdevice',
  },


};

module.exports= dbs;
