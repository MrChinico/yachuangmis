import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';
import {getpagelist} from '../../util';

class RecordNursingMeasuresTableBody extends React.Component {

      constructor(props) {
        super(props);
        const {isfirst,islast,retlist} = getpagelist(0,props.evaluatenursingmeasureslist,4);
        this.state = {
          current: 0,
          isfirst,
          islast,
          retlist
        };
      }
      PageNext = ()=>{
        const current = this.state.current + 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatenursingmeasureslist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
      PagePrev = ()=>{
        const current = this.state.current - 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatenursingmeasureslist,4);
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
            const {evaluatenursingmeasuress,users} = this.props.db;
            const {isfirst,islast,retlist} = this.state;

            let tabletrlist = [];
            let sample_nursingmeasures = [];
            if(retlist.length > 0){
              sample_nursingmeasures = evaluatenursingmeasuress[retlist[0]].nursingmeasures;
            }
            lodashmap(sample_nursingmeasures,(nursingmeasuretmpl,tmpl_index)=>{
              const rowspancount = nursingmeasuretmpl.options.length;
              lodashmap(nursingmeasuretmpl.options,(tmp_option,tmp_option_index)=>{

                if(tmp_option_index === 0){
                  tabletrlist.push(<tr key={`${tmpl_index}_${tmp_option_index}`}>
                      <td rowSpan={`${rowspancount}`} className="white-bg">{nursingmeasuretmpl.groupname}</td>
                      <td>{tmp_option.name}</td>
                      {
                        lodashmap(retlist,(id,index)=>{
                          const nursingmeasurerecordoptions = evaluatenursingmeasuress[id].nursingmeasures[tmpl_index].options;
                          const ischecked = nursingmeasurerecordoptions[tmp_option_index].checked;
                          return (
                            <td align="center" key={id}>
                              {ischecked && <font className="blue fontSize18 font-weight">√</font>}
                            </td>
                          )
                        })
                      }
                    </tr>);
                }
                else{
                  tabletrlist.push(<tr key={`${tmpl_index}_${tmp_option_index}`}>
                    <td>{tmp_option.name}</td>
                    {
                      lodashmap(retlist,(id,index)=>{
                        const nursingmeasurerecordoptions = evaluatenursingmeasuress[id].nursingmeasures[tmpl_index].options;
                        const ischecked = nursingmeasurerecordoptions[tmp_option_index].checked;
                        return (
                          <td align="center" key={id}>
                            {ischecked && <font className="blue fontSize18 font-weight">√</font>}
                          </td>
                        )
                      })
                    }
                  </tr>);
                }
              })

            });

            tabletrlist.push(<tr key={'000'}>
              <td colSpan="2" className="white-bg">其他</td>
              {
                lodashmap(retlist,(id,index)=>{
                  return (
                    <td key={id} align="center"></td>
                  )
                })
              }
            </tr>);

            return (
              <table width="100%" className="nursing-record white-bg">
                <tbody>
                                  <tr>
                                    <td colSpan="2" rowSpan="2">请在采取的护理措施项目内打“<font className="blue fontSize18 font-weight">√</font>”</td>
                                    <td colSpan={`${retlist.length}`}><div align="center">护理日期</div></td>
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
                                    <td colSpan="2">护士签名
                                      <input type="text" readOnly/>
                                    </td>
                                    {
                                      lodashmap(retlist,(id,index)=>{
                                        return (
                                          <td key={id} align="center"></td>
                                        )
                                      })
                                    }
                                   </tr>
                                   <tr>
                                    <td colSpan="2">护士长签名
                                    <input type="text" readOnly/>
                                   </td>
                                   {
                                     lodashmap(retlist,(id,index)=>{
                                       return (
                                         <td key={id} align="center"></td>
                                       )
                                     })
                                   }
                                  </tr>
                                  </tbody>
                                </table>)
      }

}

export default RecordNursingMeasuresTableBody;
