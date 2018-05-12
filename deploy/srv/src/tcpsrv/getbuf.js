const magiclen=2;
const idoffset = magiclen;
const idlen = 1;
const lengthlen = 1;
const protocollen = 1;
const cmdlen = 1;

const lengthoffset = magiclen + idlen ;
const protocoloffset = lengthoffset + lengthlen;
const cmdoffset = protocoloffset + protocollen;
const data_headlen = cmdoffset + cmdlen ;

const getbuf_query_id = ()=>{
    const buf = Buffer.allocUnsafe(data_headlen);
    //buf.writeInt8(0xAA, 0);
    buf[0] = 0x49;
    buf[1] = 0x37;

    buf[idoffset] = 0;
    buf[lengthoffset] = 0;
    buf[protocoloffset] = 0x04;
    buf[cmdoffset] = 0x03;

    return buf;
}

const getbuf_query_status = (idhex)=>{
    const bufid = Buffer.from(idhex,'hex');
  //hex
    const buf = Buffer.allocUnsafe(data_headlen);
    //buf.writeInt8(0xAA, 0);
    buf[0] = 0x49;
    buf[1] = 0x37;

    buf[idoffset] = bufid[0];
    buf[lengthoffset] = 0;
    buf[protocoloffset] = 0x04;
    buf[cmdoffset] = 0x02;

    return buf;
}

const getbuf_control = (idhex,mode,time)=>{
  const bufid = Buffer.from(idhex,'hex');
  const buf = Buffer.allocUnsafe(data_headlen+2);
  //buf.writeInt8(0xAA, 0);
  buf[0] = 0x49;
  buf[1] = 0x37;

  buf[idoffset] = bufid[0];
  buf[lengthoffset] = 0x02;
  buf[protocoloffset] = 0x04;
  buf[cmdoffset] = 0x01;

  buf[data_headlen] = mode;
  buf[data_headlen+1] = time;
  return buf;
}

exports.getbuf_control = getbuf_control;
exports.getbuf_query_id= getbuf_query_id;
exports.getbuf_query_status= getbuf_query_status;
