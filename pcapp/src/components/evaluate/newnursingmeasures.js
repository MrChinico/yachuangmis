import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
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
	      	<div>
						<div>
							<span>新建／编辑护理措施表单</span>
							<Button onClick={
								()=>{
									this.props.history.goBack();
								}
							}>返回上页</Button>
						</div>
						<div>
							这里是病人信息
						</div>
						<div>
							这里是评估表单
						</div>
						<div>
							<Button onClick={
								()=>{
									this.props.history.goBack();
								}
							}>递交评估</Button>
						</div>
	      	</div>
	    );
  	}
}


const mapStateToProps = ({paientinfo},props) => {
		const {paientinfos} = paientinfo;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo};
}
export default connect(mapStateToProps)(App);
