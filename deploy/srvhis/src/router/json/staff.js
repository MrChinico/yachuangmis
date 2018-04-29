const _  = require('lodash');
const jsonData=  [
  {
      "Staffno": "ST001",
      "Staffid":"001",
      "Staffname":"王医生",
      "Depatno":"DT001"
  },
  {
      "Staffno": "ST002",
      "Staffid":"002",
      "Staffname":"张医生",
      "Depatno":"DT001"
  },
  {
      "Staffno": "ST003",
      "Staffid":"003",
      "Staffname":"杨医生",
      "Depatno":"DT001"
  },
]

const getData = ()=>{
  let jsonz = [];
  for(let i = 0;i < 100; i++){
    let json = _.clone(jsonData[0]);
    json["Staffno"] = `T00${i}`;
    json["Staffid"] = `No500${i}`;
    json["Depatno"] = i%2 === 0?"DT001":"DT002";
    jsonz.push(json);
  }
  return jsonz;
}
module.exports= getData;
