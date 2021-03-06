const config =  {
  secretkey:'dabakey',
  listenport:process.env.listenport || 6012,
  tcpport:process.env.tcpport || 50000,
  rooturl:process.env.rooturl || 'http://yc.i2u.top:6012',
  issmsdebug:process.env.issmsdebug || false,
  hisurl:{
    url_patientinfo:'http://localhost:8081/v1/getlist_patientinfo',
    url_depat:'http://localhost:8081/v1/getlist_depat',
    url_bed:'http://localhost:8081/v1/getlist_bed',
    url_staff:'http://localhost:8081/v1/getlist_staff',
  },
  uploaddir:process.env.uploaddir || './',
  uploadurl:'/upload',
  expRequestMinutes:200,//2分钟之内
  maxAge:86400000,
  maxDistance:3,
  authexptime:120,//验证码有效期，2分钟
  loginuserexptime:60*60*24*30,//用户登录有效期,30天
  mongodburl:process.env.MONGO_URL || 'mongodb://yunqi.com28.cn:27018/yc',
  logdir:process.env.logdir || '/Users/wangxiaoqing/Downloads/work/yachuangmis/deploy/log',
  admindir:process.env.admindir || '/Users/wangxiaoqing/Downloads/work/yachuangmis/deploy/dist/admin',//'/var/db100/yachuangmis/deploy/dist/admin',
  apppcdir:process.env.apppcdir || '/Users/wangxiaoqing/Downloads/work/yachuangmis/deploy/dist/pcapp',//'/var/db100/yachuangmis/deploy/dist/apppc',
};



module.exports = config;
