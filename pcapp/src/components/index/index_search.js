import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import Patientinfolist from './index_patientinfolist';
const { Header } = Layout;

class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
	    return (
	      	<Layout>
						<Header>
							<span><img src="index.png" className="icon-index" alt=""/>病人列表-张三丰</span>
						</Header>
						<span><Button onClick={
							()=>{
								this.props.history.goBack();
							}
						}>返回上页</Button></span>
						<div>
							这里有一个“张三”的搜索记录，共N条记录的那个样式
						</div>
						<Patientinfolist />
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
