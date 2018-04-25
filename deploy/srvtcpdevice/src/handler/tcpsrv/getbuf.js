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

const getbuf_query = ()=>{
    const buf = Buffer.allocUnsafe(data_headlen);
    //buf.writeInt8(0xAA, 0);
    buf[0] = 0x49;
    buf[1] = 0x37;

    buf[idoffset] = 0;
    buf[lengthoffset] = 0;
    buf[protocoloffset] = 0x04;
    buf[cmdoffset] = 0x02;
    // let macbuf = Buffer.from(mac,'hex');
    // macbuf.copy(buf,macoffset,0,maclen);
    // buf.writeInt16BE(bufvalue.length, lengthoffset);
    // //buf.writeInt8(cmd,cmdoffset);
    // buf[cmdoffset] = cmd;
    // //buf.writeInt8(value,data_headlen);
    // bufvalue.copy(buf,data_headlen,0,bufvalue.length);
    return buf;
}

const getbuf_c = (cmd)=>{

}
