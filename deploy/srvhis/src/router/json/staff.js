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

const sz = ['王','赵','钱','孙','李','张'];
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
  for(let i = 0;i < sz.length; i++){
    let json = _.clone(jsonData[0]);
    json["Staffno"] = `T00${i}`;
    json["Staffid"] = `No500${i}`;
    json["Staffname"] = `${sz[i]}${getcz(i)}`;
    json["Depatno"] = i%2 === 0?"DT001":"DT002";
    jsonz.push(json);
  }
  return jsonz;
}
module.exports= getData;
