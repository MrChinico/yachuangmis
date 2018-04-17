import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import lodashget from 'lodash.get';


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
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<div>
						<div>
							<span>XX智能床</span>
							<span>电源</span>
							<span>通讯</span>
							<span>病人</span>
							<span>状态</span>
						</div>
						<div>
							翻身卡标题
						</div>
						<div>
							<Button>120分钟45度单边循环左翻</Button>
							<Button>120分钟45度单边循环右翻</Button>
							<Button>120分钟45度左右循环翻</Button>
							<Button>120分钟30度左右循环翻</Button>
							<Button>30分钟45度左右循环翻</Button>
							<Button>30分钟60度左右循环翻</Button>
							<Button>60分钟30度左右循环翻</Button>
							<Button>60分钟45度左右循环翻</Button>
					</div>
					<div>
						<Button>5分钟45度左右循环自检</Button>
						<Button onClick={
							()=>{
								this.onClickTurnover();
							}
						}>自定义翻身</Button>
						<Button>复位</Button>
						<Button>关OFF</Button>
					</div>
						<div>
						</div>
	      	</div>
	    );
  	}
}

App = withRouter(App);
export default connect()(App);
