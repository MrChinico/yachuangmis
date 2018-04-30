import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
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
						<div className="index-box">
							<div className="index-content assess">
								<h2 className="bbm-green">“张三”的搜索结果，共2条记录！
									<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt="" /></button>
									<div className="clearfix">
								</div>
								</h2>

								 {/* <div className="modify-password" >
									<h1>您好，张三！<img src="close-white.png" alt=""/><div className="clearfix"></div></h1>
									<p><span>旧&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span><input type="text" /></p>
									<p><span>新&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span><input type="text" /></p>
									<p><span>新密码确认：</span><input type="text" /></p>
									<div className="modify">
										<button className="ant-btn-edit">确认修改</button>
									</div>
								</div> */}

								{/*<div className="modify-password" style="display:none">
									<h1>您好，张三！<img src="close-white.png" /><div className="clearfix"></div></h1>
									<p><span className="bbm">修改密码</span></p>
									<p><span className="bbm">退出账号</span></p>
								</div>*/}
								<Patientinfolist query={{}}/>
							</div>
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
