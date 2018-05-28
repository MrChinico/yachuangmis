import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Patientinfolist from './index_patientinfolist';
import { Input } from 'antd'
// import lodashget from 'lodash.get';
const Search = Input.Search;
const { Header } = Layout;

class App extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				query:{},
				searchtxt:''
			}
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onSearch = (value)=>{
			// value => console.log(value)
			this.setState({
				searchtxt:value,
				query:{
					'Patientname_q':value
				}
			});

			window.setTimeout(()=>{
				console.log(this.refs);
				// const refhande = lodashget(this,``)
				const h1 = this.refs.plistsearch;
				if(!!h1){
					const h2 = h1.refs.refpaientinfo.getWrappedInstance();
					if(!!h2){
						h2.onRefresh();
					}
				}
			},0);
		}
  	render() {
			const showtext = this.state.searchtxt === ''?'所有病人记录':`${this.state.searchtxt}的搜索结果`;
	    return (
	      	<Layout>
						<Header>
							<span><img src="index.png" className="icon-index" alt=""/>病人搜索</span>
							<span>
								<Search
									 placeholder="输入病人姓名"
									 onSearch={(value)=>{
										 this.onSearch(value);
									 }}
									 enterButton
								 />
							</span>
						</Header>
						<div className="index-box">
							<div className="index-content assess">
								<h2 className="bbm-green">
									{showtext}
									<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt="" /></button>
									<div className="clearfix">
								</div>
								</h2>
								<Patientinfolist
									query={this.state.query}
									history={this.props.history}
									db={this.props.db}
									pagenumber={12}
									ref='plistsearch'/>
							</div>
						</div>

	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({db},props) => {
    return {db};
}

export default connect(mapStateToProps)(App);
