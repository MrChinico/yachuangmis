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
