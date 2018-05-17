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
            const {evaluatewoundsurfaces,} = this.props.db;
            const {isfirst,islast,retlist} = this.state;
            let tabletrs = [];
            let maxcount = 0;
            lodashmap(retlist,(id)=>{
              const curinfo = evaluatewoundsurfaces[id];
              const efs = lodashget(curinfo,'evaluateWoundsurfaces',[]);
              if(efs.length > maxcount){
                maxcount = efs.length;
              }
            });

            for(let i = 0 ;i < maxcount; i++){
              let tabletds_fq = [];
              let tabletds_bw = [];
              let tabletds_cm_syl = [];
              let tabletds_cm_ys = [];
              let tabletds_cm_dd = [];
              let tabletds_cm_qx = [];
              let tabletds_cm_s = [];
              let tabletds_cm_k = [];
              let tabletds_cm_c = [];
              lodashmap(retlist,(id,index)=>{
                const curinfo = evaluatewoundsurfaces[id];
                const efs = lodashget(curinfo,'evaluateWoundsurfaces',[]);
                if(efs.length > i){
                  const fq = lodashget(efs[i],'分期.label','');
                  let bw = lodashget(efs[i],'部位.label','');
                  const bw_lr = lodashget(efs[i],'部位.lr','');
                  const cm_syl = lodashget(efs[i],'创面大小.渗液量','');
                  const cm_ys  = lodashget(efs[i],'创面大小.颜色','');
                  const cm_dd = lodashget(efs[i],'创面大小.窦道','');
                  const cm_qx  = lodashget(efs[i],'创面大小.潜行','');
                  const cm_s = lodashget(efs[i],'创面大小.深','');
                  const cm_k = lodashget(efs[i],'创面大小.宽','');
                  const cm_c = lodashget(efs[i],'创面大小.长','');

                  if(!!bw_lr){
                    bw = `${bw}(${bw_lr})`;
                  }
                  tabletds_fq.push(<td key={`${id}_${i}_fq`} align="center">{fq}</td>);
                  tabletds_bw.push(<td key={`${id}_${i}_bw`} align="center">{bw}</td>);
                  tabletds_cm_syl.push(<td key={`${id}_${i}_cm_syl`} align="center">{cm_syl}</td>);
                  tabletds_cm_ys.push(<td key={`${id}_${i}_cm_ys`} align="center">{cm_ys}</td>);
                  tabletds_cm_dd.push(<td key={`${id}_${i}_cm_dd`} align="center">{cm_dd}</td>);
                  tabletds_cm_qx.push(<td key={`${id}_${i}_cm_qx`} align="center">{cm_qx}</td>);
                  tabletds_cm_s.push(<td key={`${id}_${i}_cm_s`} align="center">{cm_s}</td>);
                  tabletds_cm_k.push(<td key={`${id}_${i}_cm_k`} align="center">{cm_k}</td>);
                  tabletds_cm_c.push(<td key={`${id}_${i}_cm_c`} align="center">{cm_c}</td>);
                }
                else{
                  tabletds_fq.push(<td key={`${id}_${i}_fq`} align="center"></td>);
                  tabletds_bw.push(<td key={`${id}_${i}_bw`} align="center"></td>);
                  tabletds_cm_syl.push(<td key={`${id}_${i}_cm_syl`} align="center"></td>);
                  tabletds_cm_ys.push(<td key={`${id}_${i}_cm_ys`} align="center"></td>);
                  tabletds_cm_dd.push(<td key={`${id}_${i}_cm_dd`} align="center"></td>);
                  tabletds_cm_qx.push(<td key={`${id}_${i}_cm_qx`} align="center"></td>);
                  tabletds_cm_s.push(<td key={`${id}_${i}_cm_s`} align="center"></td>);
                  tabletds_cm_k.push(<td key={`${id}_${i}_cm_k`} align="center"></td>);
                  tabletds_cm_c.push(<td key={`${id}_${i}_cm_c`} align="center"></td>);
                }
              });

              tabletrs.push(
                <tr key={`c1_${i}`}>
                  <td rowSpan="9" className="white-bg">创面{i+1}</td>
                  <td colSpan="2" align="center">分期</td>
                  {
                    tabletds_fq
                  }
                </tr>);

              tabletrs.push(
                <tr key={`c2_${i}`}>
                  <td colSpan="2" align="center">部位</td>
                  {
                    tabletds_bw
                  }
                </tr>);


                tabletrs.push(
                <tr key={`c3_${i}`}>
                  <td rowSpan="7">创面大小</td>
                  <td align="center">长cm</td>
                  {
                    tabletds_cm_c
                  }
                </tr>);

                tabletrs.push(
                <tr key={`c4_${i}`}>
                  <td align="center">宽cm</td>
                  {
                    tabletds_cm_k
                  }
                </tr>);

                tabletrs.push(
                <tr key={`c5_${i}`}>
                  <td align="center">深cm</td>
                  {
                    tabletds_cm_s
                  }
                </tr>);

                tabletrs.push(
                <tr key={`c6_${i}`}>
                  <td align="center">潜行</td>
                  {
                    tabletds_cm_qx
                  }
                </tr>);

                tabletrs.push(
                <tr key={`c7_${i}`}>
                  <td align="center">窦道</td>
                  {
                    tabletds_cm_dd
                  }
                </tr>);

                tabletrs.push(
                <tr key={`c8_${i}`}>
                  <td align="center">颜色</td>
                  {
                    tabletds_cm_ys
                  }
                </tr>);

              tabletrs.push(
                <tr key={`c9_${i}`}>
                  <td align="center">渗液量</td>
                  {
                    tabletds_cm_syl
                  }
                </tr>
              );
            }

            return (<table width="100%" className="nursing-record white-bg">
                <tbody>
                <tr>
                  <td colSpan="" rowSpan="2">创面</td>
                  <td colSpan="" rowSpan="2">创面大小</td>
                  <td colSpan="" rowSpan="2">项目指标</td>
                  <td colSpan={`${retlist.length}`}><div align="center">评估日期</div></td>
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
                  <td colSpan="3" className="white-bg">评估人
                  <input type="text" readOnly/>
                  </td>
                  {
                    lodashmap(retlist,(id,index)=>{
                      return (
                        <td align="center" className="white-bg" key={`${id}`}></td>
                      )
                    })
                  }
                </tr>
                </tbody>
                </table>);
            }

}

export default RecordbardenTableBody;
