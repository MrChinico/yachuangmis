export const getbardenstring = (score)=>{
  let resultstring = '尚未评估';
  if(score >= 16){
    resultstring = '低危险';
  }
  else if(score >= 12 && score <= 15){
    resultstring = '中等危险';
  }
  else if(score <= 11){
    resultstring = '高危險';
  }
  return resultstring;
}


export const getdefaultnursingmeasures = ()=>{
  const v = {
        nursingmeasures:[
          {
             groupname:'全身治疗',
             options:[
               {
                 name:'1、积极治疗原发病',
                 checked:false,
               },
               {
                 name:'2、增加营养',
                 checked:false,
               },
               {
                 name:'3、抗感染治疗',
                 checked:false,
               },
               {
                 name:'4、心理护理',
                 checked:false,
               },
            ]
        },
        {
          groupname:'体位与活动',
          options:[
            {
              name:'1、建立翻身卡',
              checked:false,
            },
            {
              name:'2、定期翻身或更换体位',
              checked:false,
            },
            {
              name:'3、指导执行肢体主动、被动运动',
              checked:false,
            },
         ]
       },
       {
         groupname:'皮肤护理',
         options:[
           {
             name:'1、使用中性温和的清洁剂清洁身体皮肤',
             checked:false,
           },
           {
             name:'2、使用乳液维持皮肤滋润',
             checked:false,
           },
           {
             name:'3、保持床单位、衣物的清洁、干燥、平整',
             checked:false,
           },
           {
             name:'4、正确摆放位置，预防管道压迫',
             checked:false,
           },
        ]
       },
       {
         groupname:'使用辅助用品',
         options:[
           {
             name:'1、骨突部位予以保护',
             checked:false,
           },
           {
             name:'2、足跟避免受压',
             checked:false,
           },
           {
             name:'3、使用软枕、翻身垫及其它辅助支托',
             checked:false,
           },
           {
             name:'4、使用防压疮 翻身床垫',
             checked:false,
           },
        ]
       },
       {
         groupname:'敷料使用',
         options:[
           {
             name:'1、使用赛肤润',
             checked:false,
           },
           {
             name:'2、使用泡沫敷料',
             checked:false,
           },
           {
             name:'3、使用水胶体敷料',
             checked:false,
           },
           {
             name:'4、使用薄膜敷料',
             checked:false,
           },
           {
             name:'5、纱布、棉垫',
             checked:false,
           },
        ]
       },
       {
         groupname:'患者家属健康教育',
         options:[
           {
             name:'1、知道压疮预防目的及方法',
             checked:false,
           },
           {
             name:'2、指导翻身、肢体活动',
             checked:false,
           },
           {
             name:'3、知道防护用品的使用方法',
             checked:false,
           },
           {
             name:'4、使用薄膜敷料',
             checked:false,
           },
           {
             name:'4、注意营养摄入',
             checked:false,
           },
        ]
       },
      ]
    };
    return v;

}
