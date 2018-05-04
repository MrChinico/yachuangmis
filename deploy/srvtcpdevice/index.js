const config = require('./src/config');
const tcpsrv = require('./src/tcpsrv');
const mongoose     = require('mongoose');
const debug = require('debug')('srvtcp:app');
const winston = require('./src/log/log.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodburl,{
    // This options is 1 second by default, its possible the ha
    // takes longer than 30 seconds to recover.
    reconnectInterval: 5000,
    // This options is 30 by default, why not make it 60
    reconnectTries: Number.MAX_VALUE
  });


debug(`mongodburl:${config.mongodburl}`);
winston.initLog();
winston.getlog().info(`mongodburl:${config.mongodburl}`);

mongoose.connection.on("connected",function(){
  debug("mongoose connect sucess");
  tcpsrv.starttcpsrv();
})
