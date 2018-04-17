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
	    return (
	      	<Layout>
						<div>搜索页面</div>
						<span><Button onClick={
							()=>{
								this.props.history.goBack();
							}
						}>返回上页</Button></span>
						<div></div>
						<div>

						</div>
	      	</Layout>
	    );
  	}
}

// const mapStateToProps = ({paientinfo},props) => {
// 		const {paientinfos} = paientinfo;
// 		const id = lodashget(props,'match.params.pid');
// 		let curpaientinfo = paientinfos[id];
//     return {curpaientinfo};
// }
export default connect()(App);
