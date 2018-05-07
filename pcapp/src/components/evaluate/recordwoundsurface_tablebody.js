import React from 'react';
import lodashmap from 'lodash.map';
import lodashget from 'lodash.get';

import moment from 'moment';
import {getpagelist} from '../../util';

class RecordbardenTableBody extends React.Component {

      constructor(props) {
        super(props);
        const {isfirst,islast,retlist} = getpagelist(0,props.evaluatewoundsurfacelist,4);
        this.state = {
          current: 0,
          isfirst,
          islast,
          retlist
        };
      }
      PageNext = ()=>{
        const current = this.state.current + 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatewoundsurfacelist,4);
        this.setState({
          current,
          isfirst,
          islast,
          retlist
        });
      }
      PagePrev = ()=>{
        const current = this.state.current - 1;
        const {isfirst,islast,retlist} = getpagelist(current,this.props.evaluatewoundsurfacelist,4);
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
            const {evaluatewoundsurfaces,users} = this.props.db;
            const {isfirst,islast,retlist} = this.state;
            let tabletrs = [];

            tabletrs.push(
              <tr>
                <td rowSpan="9" className="white-bg">创面一</td>
                <td colSpan="2" align="center">分期</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

            tabletrs.push(
              <tr>
                <td colSpan="2" align="center">部位</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);


              tabletrs.push(
              <tr>
                <td rowSpan="7">创面大小</td>
                <td align="center">长cm</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

              tabletrs.push(
              <tr>
                <td align="center">宽cm</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

              tabletrs.push(
              <tr>
                <td align="center">深cm</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

              tabletrs.push(
              <tr>
                <td align="center">潜行</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

              tabletrs.push(
              <tr>
                <td align="center">窦道</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

              tabletrs.push(
              <tr>
                <td align="center">颜色</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>);

            tabletrs.push(
              <tr>
                <td align="center">渗液量</td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>
            );
            return (<table width="100%" className="nursing-record white-bg">
                <tbody>
                <tr>
                  <td colSpan="" rowSpan="2">创面</td>
                  <td colSpan="" rowSpan="2">创面大小</td>
                  <td colSpan="" rowSpan="2">项目指标</td>
                  <td colSpan="4"><div align="center">评估日期</div></td>
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

                {tabletrs}

                <tr>
                  <td rowSpan="9" className="white-bg">创面二</td>
                  <td colSpan="2" align="center">分期</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">部位</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td rowSpan="7">创面大小</td>
                  <td align="center">长cm</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">宽cm</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">深cm</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">潜行</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">窦道</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">颜色</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td align="center">渗液量</td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td colSpan="3" className="white-bg">评估人
                  <input type="text" />
                  </td>
                  <td align="center" className="white-bg"></td>
                  <td align="center" className="white-bg"></td>
                  <td align="center" className="white-bg"></td>
                  <td align="center" className="white-bg"></td>
                </tr>
                </tbody>
                </table>);
            }

}

export default RecordbardenTableBody;
