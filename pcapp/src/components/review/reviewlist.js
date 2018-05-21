import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Radio } from 'antd';

import lodashget from 'lodash.get';
import IndexHead from '../index/index_title';
import ReviewDetaillist from './review_detaillist';
import './reviewlist.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;




class App extends React.Component {

		constructor(props) {
				super(props);
				this.state = {
						query : {}
				};
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onChange = (e)=>{
			const selectedstring = e.target.value;
			console.log(selectedstring)
			if(selectedstring === 'all'){
				this.setState({query:{}});
			}
			if(selectedstring === 'mine'){
				const {userlogin} = this.props;
				const userid = lodashget(userlogin,'_id');
				const permissionname = lodashget(userlogin,'permission.name','普通护士');
				if(permissionname === '普通护士'){
					this.setState({query:{usercreatorid:userid}});
				}
				else if(permissionname === '护士长'){
					this.setState({query:{signed_headnurse:userid}});
				}
				else  if(permissionname === '护理部主管'){
					this.setState({query:{signed_nursingdepartment:userid}});
				}

			}
			if(selectedstring === 'reviewing'){
				this.setState({query:{
					stagestatus:{$in:['护士长审核中','护理部审核中']}
				}});
			}
			if(selectedstring === 'reviewed'){
				this.setState({query:{
					stagestatus:{$in:['已审核','已上报']}
				}});
			}
			if(selectedstring === 'notreviewed'){
				this.setState({query:{
					stagestatus:{$in:['未审核']}
				}});
			}

			window.setTimeout(()=>{
				const h1 = this.refs.rlistsearch;
				console.log(h1);
				if(!!h1){
					const h2 = h1.refs.refreviewinfo.getWrappedInstance();
					if(!!h2){
						h2.onRefresh();
					}			
				}
			},0);
		}

  	render() {
	    return (
	      	<Layout>
						<IndexHead title="申报审阅"/>
						<div className="content-box">
								<div className="content">
										<h4><span>
											<RadioGroup defaultValue="all" onChange={this.onChange}>
												<RadioButton value="all">全部</RadioButton>
												<RadioButton value="mine">我的递交</RadioButton>
												<RadioButton value="reviewing">审核中</RadioButton>
								        <RadioButton value="reviewed">已审</RadioButton>
								        <RadioButton value="notreviewed">未审</RadioButton>
								      </RadioGroup>
										</span>
										<button className="return" onClick={
											()=>{
												this.props.history.replace('/');
											}
										}><img src="return.png" alt=""/></button>
										<div className="clearfix"></div>
									</h4>
								</div>
								<ReviewDetaillist
									query={this.state.query}
									db={this.props.db}
									history={this.props.history}
									ref='rlistsearch'/>
						</div>
	      	</Layout>
	    );
  	}
}

const mapStateToProps = ({db,userlogin}) => {
    return {db,userlogin};
}
// App = withRouter(App);
export default connect(mapStateToProps)(App);
