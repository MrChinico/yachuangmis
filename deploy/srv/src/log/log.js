const winston = require('winston');
const moment = require('moment');
const path = require('path');
const config = require('../config.js');
let logger;
exports.initLog =  ()=>{
  const filename = "yc";

  const logfile = `${config.logdir}/${filename}.log`;
  const logpath = path.resolve(__dirname,'../', logfile);
  ////console.log(`logpath==>${logpath}`);

  const logfileerr = `${config.logdir}/${filename}_err.log`;
  const logpatherr = path.resolve(__dirname,'../', logfileerr);

  const logfilewarn = `${config.logdir}/${filename}_warn.log`;
  const logpathwarn = path.resolve(__dirname,'../', logfilewarn);

  // winston.configure({
  //   transports: [
  //     new (winston.transports.File)({ filename: logpath ,level: 'info'}),
  //     new (winston.transports.File)({  filename: logfileerr, level: 'error'  }),
  //   ]
  // });

    logger = new (winston.Logger)({
      transports: [
        new (winston.transports.File)({
          name: 'info-file',
          filename: logpath ,
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: logpatherr,
          level: 'error'
        }),
        new (winston.transports.File)({
          name: 'warn-file',
          filename: logpathwarn,
          level: 'warn'
        }),
      ]
  });
};

exports.getlog = ()=>{
   return logger;
}
