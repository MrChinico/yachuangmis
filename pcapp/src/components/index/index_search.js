import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Patientinfolist from './index_patientinfolist';
import { Input } from 'antd'
import DepatSelect from './selector_depat';
import DiseaseclassificationSelect from './selector_diseaseclassification';
import lodashget 			from 'lodash.get';

const Search = Input.Search;
const { Header } = Layout;


class App extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				query:{},
				searchtxt:'',
				curdepatid:'0',
				curdiseaseclassification:'0'
			}
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}
	  refreshPaientList = ()=>{
			window.setTimeout(()=>{
				const h1 = this.refs.plistsearch;
				console.log(h1);
				if(!!h1){
					const h2 = h1.refs.refpaientinfo.getWrappedInstance();
					if(!!h2){
						h2.onRefresh();
					}
				}
			},0);
		}
		onChangeDiseaseclassification=(id)=>{
			let query = this.state.query;
			if(id !== '0'){
				query['Diseaseclassification'] = id;
			}
			else{
				const {Diseaseclassification,...rest} = query;
				query = rest;
			}
			this.setState({
				curdiseaseclassification:id,
				query
			});
			this.refreshPaientList();
		}

		onChangeDepat =(id)=>{
			let query = this.state.query;
			if(id !== '0'){
				query['depatid'] = id;
			}
			else{
				const {depatid,...rest} = query;
				query = rest;
			}
			this.setState({
				curdepatid:id,
				query
			});
			this.refreshPaientList();
		}

		onSearch = (value)=>{
			let query = this.state.query;
			query['Patientname_q'] = value;
			this.setState({
				searchtxt:value,
				query
			});

			this.refreshPaientList();
		}
  	render() {
			const PermissionName	= lodashget( this, 'props.userlogin.permission.name', '' );
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
									{/* 第二题修改位置 */}
									<button className="return" onClick={
									()=>{
										this.props.history.goBack();
									}
								}><img src="return.png" alt="" /></button>
									{
										PermissionName === '护理部主管' && (<DepatSelect
											onChangeDepat={this.onChangeDepat}
											db={this.props.db}
											curdepatid={this.state.curdepatid}
										/>)
									}

									<DiseaseclassificationSelect
										onChangeDiseaseclassification={this.onChangeDiseaseclassification}
										curdiseaseclassification={this.state.curdiseaseclassification}
									/>
									{/* -------------- */}
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

const mapStateToProps = ({userlogin,db},props) => {
    return {userlogin,db};
}

export default connect(mapStateToProps)(App);
