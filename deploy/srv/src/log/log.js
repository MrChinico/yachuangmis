const winston = require('winston');
const moment = require('moment');
const path = require('path');
const config = require('../config.js');
let logger;
exports.initLog =  ()=>{
  const filename = "yc";

  const logpath = `${config.logdir}/${filename}.log`;
  ////console.log(`logpath==>${logpath}`);

  const logpatherr = `${config.logdir}/${filename}_err.log`;

  const logpathwarn = `${config.logdir}/${filename}_warn.log`;


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
