const net = require('net');
const ip = process.env.targetip || '127.0.0.1';//'114.55.89.241';//'127.0.0.1';//'114.55.89.241';//'114.55.89.241';//'127.0.0.1';//'114.55.89.241';//目标ip
const port = 50000;//目标端口

const client = net.connect({port: port,host:ip}, () => {
  // 'connect' listener
  // setInterval(()=>{
    // let buf = test.gettestbuf_data(process.env.targetmac ||'0800200A8C4C');//Buffer.from(datatosend,'hex');
    // //const bufstr = 'aa3c2c9422b9e300130000360000009d00090006000600060006000600';
    // //let buf = Buffer.from(bufstr,'hex');
    //
    // let bufstring = buf.toString()//'aa3c2c9422b9e300130000360000009d00090006000600060006000600';//buf.toString('hex');
    // console.log(`连接上服务器【${ip}:${port}】,发送数据${bufstring}`);
    // client.write(buf);
  // },process.env.sendinterval*1000 || 1000);
});

client.on('data', (data) => {
  console.log(`接收到数据为${data.toString('hex')}`);
  //client.end();
  if('493700000403' === data.toString('hex')){
    const bufstr = '493702000483';
    let buf = Buffer.from(bufstr,'hex');
    client.write(buf);
  }
  if('493702000402' === data.toString('hex')){
    const bufstr = '493702040482314C1E31';
    let buf = Buffer.from(bufstr,'hex');
    client.write(buf);
  }
});

client.on('end', () => {
  console.log(`和服务器断开`);
});
