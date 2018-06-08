import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';
import {getpagelist,gettablebradengroups} from '../../util';

// const style_nursing_record_td = {
//   padding: '9px 10px',
//   border: '1px solid #ddd',
//   borderLeft: '0px',
//   borderBottom: '0px',
// };

// const style_nursing_record_td_white = {
//   backgroundColor:'#fff',
//   textAlign: 'left'
// };

const style_input = {
  background: '#f9f9f9',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom:'1px solid #646464',
}

// const style_nursing_record_tdlast = {
//   borderRight:'0px'
// };

// const style_nursing_record_tr2n = {
//   backgroundColor:'#f9f9f9',
// };

// const style_trdate = {
//   backgroundColor:'#e4f3f1'
// };

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
          // const rowspancount = tablegroup.labelsz.length;
          const labelvalue = tablegroup.labelvalue;

          tabletrlist.push(
            <div className="item" key={gindex}>
              <div className="flex-1 center">{tablegroup.labeltitle}</div>
              <div className="flex-5 column">
              {
                lodashmap(tablegroup.labelsz,(vlabel,lindex)=>{
                  return (
                    <div key={lindex}>
                      <div className="flex-4 center">{vlabel.label}</div>
                      <div className="flex-4 center">{vlabel.value}</div>
                      {
                        lodashmap(retlist,(bid,index)=>{
                          const ischecked = lodashget(evaluatebardens[bid],labelvalue,0) === vlabel.value;
                          return (
                            <div className="flex-3 center" key={index}>
                              {ischecked && <span>{vlabel.value}</span>}
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
              </div>
            </div>
          )
        })

        // const styletrdate = style_trdate;

          return (
            <div className = "form-body flex-1 column">
              <div className="item-head">
                <div className="flex-1 center">项目</div>
                <div className="flex-1 center">具体指标</div>
                <div className="flex-1 center">评分数值</div>
                <div className="flex-3 column">
                  <div className="flex-1 center">实际得分（按照评估日期填写）</div>
                  <div className="flex-1">
                    {
                      lodashmap(retlist,(info,index)=>{
                        // const styletddate = style_nursing_record_td;
                        const curday = moment(info.updated_at).format('MM月DD日')
                        if(index === 0)
                        {
                          return (
                            <div className="flex-1 center" key={index}>
                              <div>{ !isfirst && <img src="arrow-left-green.png" alt="" onClick={ this.PagePrev }/>}{curday}</div>
                            </div>
                          );
                        }
                        else if(index === retlist.length - 1)
                        {
                          return (
                            <div className="flex-1 center" key={index}>
                              <div>{curday}{!islast && <img src="arrow-right-green.png" className="right" alt="" onClick={this.PageNext}/>}
                              </div>
                            </div>
                          );
                        }
                        else{
                          return (
                            <div className="flex-1 center" key={index}>
                              <div>{curday}</div>
                            </div>
                          );
                        }
                      })
                    }
                  </div>
                </div>
              </div>

              {tabletrlist}

              <div className="score">
                <div className="flex-1 center">总得分</div>
                <div className="flex-1">
                {
                  lodashmap(retlist,(bid,index)=>{
                    const score = lodashget(evaluatebardens[bid],'score',0);
                    return (
                      <div className="flex-1 center" key={index}>
                        <font>
                          {score}
                        </font>
                      </div>
                    );
                  })
                }
                </div>
              </div>
              <div className="sign">
                <div>评估护士签名
                  <input style={style_input} type="text" readOnly/>
                </div>
                <div>护士长签名
                  <input style={style_input} type="text" readOnly/>
                </div>
              </div>
          </div>
          );
        }

}

export default RecordbardenTableBody;
