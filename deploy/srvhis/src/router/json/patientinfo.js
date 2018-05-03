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

const cz = ['十','一','二','三','四','五','六','七','八','九','十'];
const getcz = (index)=>{
  index = index+1;
  if(index < 11){
    return cz[index];
  }
  if(index < 99){
    const index0 = Math.floor(index/10);
    const index1 = index%10;
    return cz[index0] + cz[index1];
  }
  return `百`;
}

const getData = ()=>{
  let jsonz = [];
  for(let i = 0;i < 50; i++){
    let json = _.clone(jsonData[0]);
    json['Patientname'] = `王${getcz(i)}`;
    json["Patientid"] = `100${i}`;
    json["Depatno"] = `DT001`;
    json["Patientno"] = `No100${i}`;
    json["Bedno"] = `BD100${i}`;
    jsonz.push(json);
  }

  for(let i = 0;i < 50; i++){
    let json = _.clone(jsonData[0]);
    json['Patientname'] = `张${getcz(i)}`;
    json["Patientid"] = `200${i}`;
    json["Depatno"] = `DT002`;
    json["Patientno"] = `No200${i}`;
    json["Bedno"] = `BD200${i}`;
    jsonz.push(json);
  }
  return jsonz;
}
module.exports= getData;
