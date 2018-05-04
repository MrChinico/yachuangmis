import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';
import SmartDeviceStatus from './smartdevice_status';
import {sendsmartdevicecmd_request} from '../../actions';

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickSendCmd = (cmd)=>{
			const {curpaientinfo,cursmartdevice} = this.props;
			this.props.dispatch(sendsmartdevicecmd_request({
				paientid:curpaientinfo._id,
				smartdeviceid:cursmartdevice._id,
				deviceid:cursmartdevice.deviceid,
				cmd
			}));
		}
		onClickTurnover = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/defineturnover/${curpaientinfo._id}/${curpaientinfo.bid}`)
		}
  	render() {
			const {curpaientinfo,cursmartdevice} = this.props;
			if(!curpaientinfo || !cursmartdevice){
				return <div>无病人信息</div>
			}
	    return (
	      	<div>
					<SmartDeviceStatus cursmartdevice={cursmartdevice} />
					<div className="device-tittle">
						翻身卡标题
					</div>
					<div className="device-content">
						<div className="device-indicator">
							<div onClick={()=>{
									this.onClickSendCmd({
										angle:45,
										direct:'L',
										turnovermode:'A',//‘A’(0x41):单左 45 度循环
										turnovertime:120
									});
								}
							}><img src="device-indi01.png" alt=""/><p>120分钟45度单边循环左翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:45,
										direct:'R',
										turnovermode:'B',//‘B’(0x42):单右 45 度循环
										turnovertime:120
									});
								}
							}><img src="device-indi02.png" alt=""/><p>120分钟45度单边循环右翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:45,
										direct:'LR',
										turnovermode:'D',//‘D’(0x44):双侧 45 度循环
										turnovertime:120
									});
								}
							}><img src="device-indi03.png" alt=""/><p>120分钟45度左右循环翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:30,
										direct:'LR',
										turnovermode:'C',//‘C’(0x43):双侧 30 度循环
										turnovertime:120
									});
								}
							}><img src="device-indi04.png" alt=""/><p>120分钟30度左右循环翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:45,
										direct:'LR',
										turnovermode:'D',//‘D’(0x44):双侧 45 度循环
										turnovertime:30
									});
								}
							}><img src="device-indi05.png" alt=""/><p>30分钟45度左右循环翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:60,
										direct:'L',
										turnovermode:'E',//‘E’(0x45):双侧 60 度循环
										turnovertime:30
									});
								}
							}><img src="device-indi06.png" alt=""/><p>30分钟60度左右循环翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:30,
										direct:'LR',
										turnovermode:'C',//‘C’(0x43):双侧 30 度循环
										turnovertime:60
									});
								}
							}><img src="device-indi07.png" alt=""/><p>60分钟30度左右循环翻</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:45,
										direct:'L',
										turnovermode:'D',//‘D’(0x44):双侧 45 度循环
										turnovertime:60
									});
								}
							}><img src="device-indi08.png" alt=""/><p>60分钟45度左右循环翻</p></div>
							<div className="clearfix"></div>

						</div>
						<div className="device-button">
							<div onClick={()=>{
									this.onClickSendCmd({
										angle:45,
										direct:'L',
										turnovermode:'K',//‘K’(0x4B):45 度自检
										turnovertime:5
									});
								}
							}><img src="run-time.png" alt=""/><p>5分钟45度左右循环自检</p></div>



							<div onClick={
								()=>{
									this.onClickTurnover();
								}
							}><img src="custom.png" alt=""/><p>自定义翻身</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:0,
										direct:'S',
										turnovermode:'S',//‘S’(0x53):停止
										turnovertime:0
									});
								}
							}><img src="reset.png" alt=""/><p>复位</p></div>

							<div onClick={()=>{
									this.onClickSendCmd({
										angle:0,
										direct:'R',
										turnovermode:'R',//‘R’(0x52):复位
										turnovertime:0
									});
								}
							}><img src="on-off.png" alt=""/><p>关OFF</p></div>

							<div className="clearfix"></div>
						</div>
						<div className="clearfix"></div>
					</div>
					<div>
					</div>
	      	</div>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
