const config =  {
  secretkey:'dabakey',
  listenport:process.env.listenport || 6012,
  rooturl:process.env.rooturl || 'http://yachuang.i2u.top',
  issmsdebug:process.env.issmsdebug || false,
  srvredis:{
    host:process.env.srvredis_host||'api.nuistiot.com',
    port: process.env.srvredis_port|| 6379,
  },
  hisurl:{
    url_patientinfo:'http://localhost:8081/v1/getlist_patientinfo',
    url_depat:'http://localhost:8081/v1/getlist_depat',
    url_bed:'http://localhost:8081/v1/getlist_bed',
    url_staff:'http://localhost:8081/v1/getlist_staff',
  }
  uploaddir:process.env.uploaddir || './',
  uploadurl:'/upload',
  expRequestMinutes:200,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  mongodburl:process.env.MONGO_URL || 'mongodb://localhost/yachuang'
};



module.exports = config;
