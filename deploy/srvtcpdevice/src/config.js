const config =  {
  logdir:process.env.logdir ||'/Users/wangxiaoqing/Downloads/work/yachuangmis/deploy/log',
  listenport:process.env.listenport ||50000,
  mongodburl:process.env.MONGO_URL || 'mongodb://localhost/yc'//'mongodb://dabauser:daba159@api.nuistiot.com/daba',
};



module.exports = config;
