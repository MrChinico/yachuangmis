import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<Layout>
						<div>
							<span>自定义翻身</span>
							<span><Button onClick={
								()=>{
									this.props.history.goBack();
								}
							}>返回上页</Button></span>
						</div>
						<div>
							<div>两个按钮</div>
							<div>
								<span>方向选择</span>
								<span>角度选择</span>
								<span>保持X分钟</span>
								<span>平躺时间X分钟</span>
							</div>
							<div>
								<span>方向选择</span>
								<span>角度选择</span>
								<span>保持X分钟</span>
								<span>平躺时间X分钟</span>
							</div>
							<div>
								<span>........</span>
							</div>
							</div>
						<div>
							<Button onClick={
								()=>{
									this.props.history.goBack();
								}
							}>开始执行</Button>
						</div>
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({paientinfo},props) => {
		const {paientinfos} = paientinfo;
		const pid = lodashget(props,'match.params.pid');
		const bid = lodashget(props,'match.params.bid');
		let curpaientinfo = paientinfos[pid];
    return {curpaientinfo};
}

export default connect(mapStateToProps)(App);
