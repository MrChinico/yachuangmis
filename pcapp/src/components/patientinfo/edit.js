import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';
import EditpatientinfoForm from './form_editpatientinfo';
const { Header } = Layout;
class App extends React.Component {


		componentDidMount(){

		}

		componentWillUnmount() {

		}
		onClickSubmit =(values)=>{
			this.props.history.goBack();
		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
	    return (
				<Layout>
				<Header>
					<span><img src="index.png" className="icon-index" alt=""/>病人列表-张三丰详情信息</span>
				</Header>
				<div className="content-box">
					<div className="content">
						<h2>21206<span>张三丰</span><button className="return" onClick={
							()=>{
								this.props.history.goBack();
							}
						}><img src="return.png" alt=""/></button>
						<div className="clearfix"></div>
						</h2>

						<EditpatientinfoForm curpaientinfo={curpaientinfo}  onClickSubmit={this.onClickSubmit}/>

						</div>
				</div>
				</Layout>
	    );
  	}
}

const mapStateToProps = ({db},props) => {
		const {paientinfos} = db;
		const id = lodashget(props,'match.params.pid');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo};
}
export default connect(mapStateToProps)(App);
