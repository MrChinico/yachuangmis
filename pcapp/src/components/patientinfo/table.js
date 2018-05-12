import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import lodashmap from 'lodash.map';
import paginate_array from 'paginate-array';


class App extends React.Component {

	constructor(props) {
			super(props);
			this.state = {
					current:1,
					pageSize:props.pagenumber,
			}
	}
		onChangePagination =(page, pageSize)=>{
			this.setState({
				current:page,
				pageSize
			});
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}
		// onClickEdit = ()=>{
		// 	const {currecord} = this.props;
		// 	this.props.history.push(`/indexdetailedit/${currecord._id}`);
		// }
  	render() {
			const {allrecords,renderTableRecord} = this.props;
			const {current,pageSize} = this.state;
			const paginateCollection = paginate_array(allrecords,current,pageSize);

			let ulsz = [];
			lodashmap(paginateCollection.data,(data,index)=>{
				ulsz.push(<li key={index}>
					{renderTableRecord(data)}
				</li>)
			});

		  let retlist = [];
			retlist.push(<div className="record-box" key={'div0'}>
				<ul>
					{ulsz}
				</ul>
			</div>);
			if(paginateCollection.totaPages > 0){
				retlist.push(<Pagination key={'div1'} defaultCurrent={1}
					total={paginateCollection.totaPages}
					current={paginateCollection.currentPage}
					pageSize={paginateCollection.perPage}
					onChange={this.onChangePagination}
				/>);
			}
	    return retlist;
  	}
}

// const mapStateToProps = ({paientinfo},props) => {
// 		const {paientinfos} = paientinfo;
// 		const id = lodashget(props,'match.params.pid');
// 		let curpaientinfo = paientinfos[id];
//     return {curpaientinfo};
// }
export default connect()(App);
