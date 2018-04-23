const json_patientinfo =  require('./json/patientinfo.js');
const json_bed =  require('./json/bed.js');
const json_depat =  require('./json/depat.js');
const json_staff =  require('./json/staff.js');

const startmodule = (app)=>{
  app.get('/v1/getlist_patientinfo',(req,res)=>{
    res.status(200).json(json_patientinfo);
  });
  app.get('/v1/getlist_bed',(req,res)=>{
    res.status(200).json(json_bed);
  });
  app.get('/v1/getlist_depat',(req,res)=>{
    res.status(200).json(json_depat);
  });
  app.get('/v1/getlist_staff',(req,res)=>{
    res.status(200).json(json_staff);
  });
};

module.exports=  startmodule;
