import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';

const getpagelist = (currentpage,listall,perpage)=>{

    let istart = currentpage*perpage;
    if(istart + perpage >= listall.length){
      istart = listall.length - perpage;
      if(istart < 0){
        istart = 0;
      }
    }
    let iend = istart + perpage;
    if(iend > listall.length){
      iend = listall.length;
      if(iend < 0){
        iend =0;
      }
    }

    let retlist = [];
    for(let i = istart; i < iend ;i++){
      retlist.push(listall[i]);
    }

    const isfirst = istart === 0;
    const islast = iend + perpage >= listall.length;

    return {
      isfirst,
      islast,
      retlist
    }
}

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
              const {isfirst,islast,retlist} = this.state;
              const tablebradengroups = [
                {
                  labeltitle:"感觉",
                  labelsz:[{
                    label:'完全限制',
                    value:1
                  },{
                    label:'非常限制',
                    value:2
                  },{
                    label:'轻度受限',
                    value:3
                  },{
                    label:'未受伤害',
                    value:4
                  }]
                },
                {
                  labeltitle:"潮湿",
                  labelsz:[{
                    label:'持久潮湿',
                    value:1
                  },{
                    label:'非常潮湿',
                    value:2
                  },{
                    label:'偶尔潮湿',
                    value:3
                  },{
                    label:'很少潮湿',
                    value:4
                  }]
                },
                {
                  labeltitle:"潮湿",
                  labelsz:[{
                    label:'持久潮湿',
                    value:1
                  },{
                    label:'非常潮湿',
                    value:2
                  },{
                    label:'偶尔潮湿',
                    value:3
                  },{
                    label:'很少潮湿',
                    value:4
                  }]
                },
                {
                  labeltitle:"活动力",
                  labelsz:[{
                    label:'卧床不起',
                    value:1
                  },{
                    label:'局限于椅',
                    value:2
                  },{
                    label:'偶尔步行',
                    value:3
                  },{
                    label:'经常步行',
                    value:4
                  }]
                },
                {
                  labeltitle:"移动力",
                  labelsz:[{
                    label:'完全不能',
                    value:1
                  },{
                    label:'严重受限',
                    value:2
                  },{
                    label:'轻度受限',
                    value:3
                  },{
                    label:'不受限',
                    value:4
                  }]
              },
              {
                labeltitle:"营养",
                labelsz:[{
                  label:'非常差',
                  value:1
                },{
                  label:'可能不足',
                  value:2
                },{
                  label:'适当',
                  value:3
                },{
                  label:'良好',
                  value:4
                }]
              },
              {
                labeltitle:"摩擦力和剪切力",
                labelsz:[{
                  label:'有问题',
                  value:1
                },{
                  label:'有潜在问题',
                  value:2
                },{
                  label:'无明显问题',
                  value:3,
                }]
              }
            ];
            let tabletrlist = [];
            lodashmap(tablebradengroups,(tablegroup,gindex)=>{
                const rowspancount = tablegroup.labelsz.length;
                console.log(rowspancount);
                lodashmap(tablegroup.labelsz,(vlabel,lindex)=>{
                  if(lindex === 0){
                    tabletrlist.push(
                      <tr key={`${gindex}_${lindex}`}>
                        <td rowSpan={`${rowspancount}`} className="white-bg">{tablegroup.labeltitle}</td>
                        <td align="center">{vlabel.label}</td>
                        <td align="center">{vlabel.value}</td>
                        {
                          lodashmap(retlist,(info,index)=>{
                            return (<td key={index} align="center"></td>);
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
                            lodashmap(retlist,(info,index)=>{
                              return (<td key={index} align="center"></td>);
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
                                      lodashmap(retlist,(info,index)=>{
                                        return (<td key={index} align="center"></td>);
                                      })
                                    }
                                  </tr>
                                  <tr>
                                    <td colSpan="2">评估护士签名
                                      <input type="text" />
                                    </td>
                                    <td align="center"></td>
                                    {
                                      lodashmap(retlist,(info,index)=>{
                                        return (<td key={index} align="center"></td>);
                                      })
                                    }
                                  </tr>
                                  <tr>
                                    <td colSpan="2">护士长签名
                                      <input type="text" />
                                    </td>
                                    <td align="center"></td>
                                    {
                                      lodashmap(retlist,(info,index)=>{
                                        return (<td key={index} align="center"></td>);
                                      })
                                    }
                                  </tr>
                                  </tbody>
                                </table>);
            }

}

export default RecordbardenTableBody;
