const _  = require('lodash');
const jsonData=  [
  {
      "Patientid": "100001",
      "Patientno":"No001",
      "Patientname":"王一",
      "Sex":1,
      "In_date":"2008-04-23 18:00:10",
      "Out_date":"2008-05-27 10:05:21",
      "In_diagnosis":"压疮",
      "In_out_flag":0,
      "Depatno":"DT001",
      "Bedno":"BD002"
  },
  {
      "Patientid": "100002",
      "Patientno":"No002",
      "Patientname":"王二",
      "Sex":1,
      "In_date":"2008-04-23 18:00:10",
      "Out_date":"2008-05-27 10:05:21",
      "In_diagnosis":"压疮",
      "In_out_flag":0,
      "Depatno":"DT001",
      "Bedno":"BD003"
  },
  {
      "Patientid": "100001",
      "Patientno":"No001",
      "Patientname":"王三",
      "Sex":1,
      "In_date":"2008-04-23 18:00:10",
      "Out_date":"2008-05-27 10:05:21",
      "In_diagnosis":"压疮",
      "In_out_flag":0,
      "Depatno":"DT001",
      "Bedno":"BD004"
  },
  {
      "Patientid": "100001",
      "Patientno":"No001",
      "Patientname":"王四",
      "Sex":1,
      "In_date":"2008-04-23 18:00:10",
      "Out_date":"2008-05-27 10:05:21",
      "In_diagnosis":"压疮",
      "In_out_flag":0,
      "Depatno":"DT001",
      "Bedno":"BD004"
  },
]

const getData = ()=>{
  let jsonz = [];
  for(let i = 0;i < 100; i++){
    let json = _.clone(jsonData[0]);
    json["Patientid"] = `200${i}`;
    json["Patientno"] = `No500${i}`;
    json["Bedno"] = `BD500${i}`;
    jsonz.push(json);
  }
  return jsonz;
}
module.exports= getData;
