import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';
import {getpagelist,gettablebradengroups} from '../../util';

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
            const {evaluatebardens,users} = this.props.db;
            const {isfirst,islast,retlist} = this.state;
            const tablebradengroups = gettablebradengroups();
            let tabletrlist = [];
            lodashmap(tablebradengroups,(tablegroup,gindex)=>{
                const rowspancount = tablegroup.labelsz.length;
                const labelvalue = tablegroup.labelvalue;
                lodashmap(tablegroup.labelsz,(vlabel,lindex)=>{
                  if(lindex === 0){
                    tabletrlist.push(
                      <tr key={`${gindex}_${lindex}`}>
                        <td rowSpan={`${rowspancount}`} className="white-bg">{tablegroup.labeltitle}</td>
                        <td align="center">{vlabel.label}</td>
                        <td align="center">{vlabel.value}</td>
                        {
                          lodashmap(retlist,(bid,index)=>{
                            const ischecked = lodashget(evaluatebardens[bid],labelvalue,0) === vlabel.value;
                            //<font className="blue fontSize18 font-weight">√</font>
                            return (<td key={index} align="center">
                              {ischecked && <span>{vlabel.value}</span>}
                            </td>);
                          })
                        }
                      </tr>
                    );
                  }
                  else{
                    tabletrlist.push(
                      <tr key={`${gindex}_${lindex}`}>
                          <td align="center">{vlabel.label}</td>
                          <td align="center">{vlabel.value}</td>
                          {
                            lodashmap(retlist,(bid,index)=>{
                              const ischecked = lodashget(evaluatebardens[bid],labelvalue,0) === vlabel.value;
                              return (<td key={index} align="center">
                                {ischecked && <span>{vlabel.value}</span>}
                              </td>);
                            })
                          }
                      </tr>
                    )
                  }
                })
              });
              return (<table width="100%" className="nursing-record white-bg">
                        <tbody>
                                <tr>
                                    <td colSpan="" rowSpan="2">项目</td>
                                    <td colSpan="" rowSpan="2">具体指标</td>
                                    <td colSpan="" rowSpan="2">评分数值</td>
                                    <td colSpan={`${retlist.length}`}><div align="center">实际得分（按照评估日期填写）</div></td>
                                  </tr>
                                  <tr className="date">
                                    {
                                      lodashmap(retlist,(info,index)=>{
                                        const curday = moment(info.updated_at).format('MM月DD日')
                                        if(index === 0){
                                          return (<td key={index}><div align="center">{ !isfirst && <img src="arrow-left-green.png" alt="" onClick={
                                                  this.PagePrev
                                                }/>}{curday}</div></td>);
                                        }
                                        else if(index === retlist.length - 1){
                                            return (<td  key={index}><div align="center">{curday}
                                              {!islast && <img src="arrow-right-green.png" className="right" alt="" onClick={
                                                this.PageNext
                                              }/>}
                                            </div></td>);
                                        }
                                        else{
                                          return (<td  key={index}><div align="center">{curday}</div></td>);
                                        }

                                      })
                                    }
                                  </tr>

                                  {tabletrlist}

                                  <tr>
                                    <td colSpan="3" className="white-bg">总得分</td>
                                    {
                                      lodashmap(retlist,(bid,index)=>{
                                        const score = lodashget(evaluatebardens[bid],'score',0);
                                        return (<td key={index} align="center">
                                          <font className="blue fontSize18 font-weight">
                                            {score}
                                          </font>
                                          </td>);
                                      })
                                    }
                                  </tr>
                                  <tr>
                                    <td colSpan="6">评估护士签名
                                      <input type="text" />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan="6">护士长签名
                                      <input type="text" />
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>);
            }

}

export default RecordbardenTableBody;
