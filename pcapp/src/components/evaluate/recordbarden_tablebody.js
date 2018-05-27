import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';
import {getpagelist,gettablebradengroups} from '../../util';

const style_nursing_record_td = {
  padding: '9px 10px',
  border: '1px solid #ddd',
  borderLeft: '0px',
  borderBottom: '0px',
};

const style_nursing_record_td_white = {
  backgroundColor:'#fff',
  textAlign: 'left'
};

const style_nursing_record_tdlast = {
  borderRight:'0px'
};

const style_nursing_record_tr2n = {
  backgroundColor:'#f9f9f9'
};

const style_trdate = {
  backgroundColor:'#e4f3f1'
};

class RecordbardenTableBody extends React.Component {

      constructor(props) {
        super(props);
        const {isfirst,islast,retlist} = getpagelist(0,props.evaluatebardenlist,4);
        this.state = {
          current: 0,
          isfirst,
          islast,
          retlist
        };
      }
      PageNext = ()=>{
        const current = this.state.current + 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatebardenlist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
      PagePrev = ()=>{
        const current = this.state.current - 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatebardenlist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
  		componentDidMount(){

  		}

  		componentWillUnmount() {

  		}
      render() {
            const {evaluatebardens} = this.props.db;
            const {isfirst,islast,retlist} = this.state;
            const tablebradengroups = gettablebradengroups();
            let tabletrlist = [];
            lodashmap(tablebradengroups,(tablegroup,gindex)=>{
                const rowspancount = tablegroup.labelsz.length;
                const labelvalue = tablegroup.labelvalue;
                lodashmap(tablegroup.labelsz,(vlabel,lindex)=>{
                  const styletr = lindex%2 === 1?style_nursing_record_tr2n:{};
                  if(lindex === 0){
                    tabletrlist.push(
                      <tr style={styletr} key={`${gindex}_${lindex}`}>
                        <td  style={style_nursing_record_td}  rowSpan={`${rowspancount}`} >{tablegroup.labeltitle}</td>
                        <td  style={style_nursing_record_td}  align="center">{vlabel.label}</td>
                        <td  style={style_nursing_record_td}  align="center">{vlabel.value}</td>
                        {
                          lodashmap(retlist,(bid,index)=>{
                            const ischecked = lodashget(evaluatebardens[bid],labelvalue,0) === vlabel.value;
                            return (<td style={style_nursing_record_td} key={index} align="center">
                              {ischecked && <span>{vlabel.value}</span>}
                            </td>);
                          })
                        }
                      </tr>
                    );
                  }
                  else{
                    tabletrlist.push(
                      <tr style={styletr}  key={`${gindex}_${lindex}`}>
                          <td  style={style_nursing_record_td} align="center">{vlabel.label}</td>
                          <td  style={style_nursing_record_td} align="center">{vlabel.value}</td>
                          {
                            lodashmap(retlist,(bid,index)=>{
                              const ischecked = lodashget(evaluatebardens[bid],labelvalue,0) === vlabel.value;
                              return (<td style={style_nursing_record_td}  key={index} align="center">
                                {ischecked && <span>{vlabel.value}</span>}
                              </td>);
                            })
                          }
                      </tr>
                    )
                  }
                })
              });
              const styletrdate = style_trdate;
              return (<table width="100%" style={{backgroundColor: '#fff'}}>
                        <tbody>
                                <tr>
                                    <td style={style_nursing_record_td}
                                      colSpan="" rowSpan="2">项目</td>
                                    <td style={style_nursing_record_td} colSpan="" rowSpan="2">具体指标</td>
                                    <td style={style_nursing_record_td} colSpan="" rowSpan="2">评分数值</td>
                                    <td style={style_nursing_record_td} colSpan={`${retlist.length}`}>
                                      <div align="center">实际得分（按照评估日期填写）</div>
                                    </td>
                                  </tr>
                                  <tr style={styletrdate}>
                                    {
                                      lodashmap(retlist,(info,index)=>{
                                        const styletddate = style_nursing_record_td;
                                        const curday = moment(info.updated_at).format('MM月DD日')
                                        if(index === 0){
                                          return (<td style={styletddate} key={index}><div align="center">{ !isfirst && <img src="arrow-left-green.png" alt="" onClick={
                                                  this.PagePrev
                                                }/>}{curday}</div></td>);
                                        }
                                        else if(index === retlist.length - 1){
                                            return (<td  style={styletddate}  key={index}><div align="center">{curday}
                                              {!islast && <img src="arrow-right-green.png" className="right" alt="" onClick={
                                                this.PageNext
                                              }/>}
                                            </div></td>);
                                        }
                                        else{
                                          return (<td style={styletddate} key={index}><div align="center">{curday}</div></td>);
                                        }

                                      })
                                    }
                                  </tr>

                                  {tabletrlist}

                                  <tr>
                                    <td style={{...style_nursing_record_td,...style_nursing_record_td_white}} colSpan="3">总得分</td>
                                    {
                                      lodashmap(retlist,(bid,index)=>{
                                        const score = lodashget(evaluatebardens[bid],'score',0);
                                        const tdstyle = style_nursing_record_td;
                                        const stylefont = {
                                          color:'#0084bf',
                                          fontSize: '18px',
                                          fontWeight: '500'
                                        };
                                        return (<td style={tdstyle} key={index} align="center">
                                          <font style={stylefont}>
                                            {score}
                                          </font>
                                          </td>);
                                      })
                                    }
                                  </tr>
                                  <tr>
                                    <td   style={style_nursing_record_td} colSpan={`${3+retlist.length}`}>评估护士签名
                                      <input type="text" readOnly/>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td   style={style_nursing_record_td} colSpan={`${3+retlist.length}`}>护士长签名
                                      <input type="text" readOnly/>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>);
            }

}

export default RecordbardenTableBody;
