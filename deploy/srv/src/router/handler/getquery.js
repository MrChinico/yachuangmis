const mongoose     = require('mongoose');
const _ = require('lodash');
// const getdevicesids = require('../../handler/getdevicesids');

const getquery = (userid,collectionname,query,callbackfn)=>{
  callbackfn(query);
};

module.exports= getquery;
