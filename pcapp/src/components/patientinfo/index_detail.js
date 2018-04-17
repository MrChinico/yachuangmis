import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';


class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickEdit = ()=>{
			const {curpaientinfo} = this.props;
			this.props.history.push(`/indexdetailedit/${curpaientinfo._id}`);
		}
  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
	      	<Layout>
						<div>头部标题栏</div>
						<span><Button onClick={
							()=>{
								this.props.history.goBack();
							}
						}>返回首页</Button></span>
						<span>按照图片显示数据</span>
						<span>按照图片显示数据</span>
						<span>按照图片显示数据</span>
						<span>按照图片显示数据</span>
						<div>
							<Button onClick={
								()=>{
									this.onClickEdit();
								}
							}>编辑</Button>
						</div>
	      	</Layout>
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
