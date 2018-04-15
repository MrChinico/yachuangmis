let islocalhost = true;
let serverurl = islocalhost?'http://localhost:6012':'http://yachuang.i2u.top';

export default {
    restserverurl:`${serverurl}/adminapi/v1`,
    adminauthserverurl:`${serverurl}/adminauth/v1`,
    admincustomapi:`${serverurl}/admincustomapi/v1`,
    serverurl:`${serverurl}`,
    appversion:'1.1.1'
};
