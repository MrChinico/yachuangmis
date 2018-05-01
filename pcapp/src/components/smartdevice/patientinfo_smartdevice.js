import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';
// import lodashget from 'lodash.get';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

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
					<div className="device-info">
						<span className="device-name">XX智能床</span>
						<span>电源：<font>正常</font></span>
						<span>通讯：<font>正常</font></span>
						<span>病人：<font>在床</font></span>
						<span>状态：<font className="warn-color">每五分钟后左右循环</font></span>
					</div>
					<div className="device-tittle">
						翻身卡标题
					</div>
					<div className="device-content">
						<div className="device-indicator">
							<div><img src="device-indi01.png" alt=""/><p>120分钟45度单边循环左翻</p></div>
							<div><img src="device-indi02.png" alt=""/><p>120分钟45度单边循环右翻</p></div>
							<div><img src="device-indi03.png" alt=""/><p>120分钟45度左右循环翻</p></div>
							<div><img src="device-indi04.png" alt=""/><p>120分钟30度左右循环翻</p></div>
							<div><img src="device-indi05.png" alt=""/><p>30分钟45度左右循环翻</p></div>
							<div><img src="device-indi06.png" alt=""/><p>30分钟60度左右循环翻</p></div>
							<div><img src="device-indi07.png" alt=""/><p>60分钟30度左右循环翻</p></div>
							<div><img src="device-indi08.png" alt=""/><p>60分钟45度左右循环翻</p></div>
							<div className="clearfix"></div>
						</div>
						<div className="device-button">
							<div><img src="run-time.png" alt=""/><p>5分钟45度左右循环自检</p></div>
							<div onClick={
								()=>{
									this.onClickTurnover();
								}
							}><img src="custom.png" alt=""/><p>自定义翻身</p></div>
							<div><img src="reset.png" alt=""/><p>复位</p></div>
							<div><img src="on-off.png" alt=""/><p>关OFF</p></div>
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
