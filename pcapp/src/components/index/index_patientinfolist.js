import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import lodashmap from 'lodash.map';
// import { Layout } from 'antd';
// import { Pagination } from 'antd';
import './index.css';
import Paientinfo from './index_patientinfo';
import {
  callthen,page_getpatientinfolist_request,page_getpatientinfolist_result
} from '../../sagas/pagination';
import AsyncTable from './asyncpatientinfotable.js';

// const { Content } = Layout;

let g_querysaved;
class App extends React.Component {

		componentDidMount(){

		}

		componentWillUnmount() {

		}

		onClickDetail = (pid)=>{
			this.props.history.push(`/indexdetail/${pid}`);
		}
		onClickEvalute = (pid)=>{
			this.props.history.push(`/indexinfo/${pid}`);
		}
    onItemConvert(item){
      return item;
    }
  	render() {
      return (
        <AsyncTable
          onClickDetail = {this.onClickDetail}
          onClickEvalute = {this.onClickEvalute}
          listtypeid = 'antdtablealarmdetail'
          usecache = {!!g_querysaved}
          ref='antdtablealarmdetail'
          onItemConvert={this.onItemConvert.bind(this)}
          pagenumber={16}
          query={this.props.query}
          sort={{DataTime: -1}}
          queryfun={(payload)=>{
            return callthen(page_getpatientinfolist_request,page_getpatientinfolist_result,payload);
          }}
        />);
			// const {paientinfolist,paientinfos} = this.props;
	    // return (
	    //   	<Content>
      //     	{
			// 				lodashmap(paientinfolist,(pid)=>{
			// 					return (<Paientinfo key={pid}
			// 						curpaientinfo={paientinfos[pid]}
			// 						onClickDetail={()=>{this.onClickDetail(pid)}}
			// 						onClickEvalute={()=>{this.onClickEvalute(pid)}}/>);
			// 				})
			// 			}
			// 			<div className="clearfix"></div>
			// 			<Pagination defaultCurrent={1} total={50} />
      //
	    //   	</Content>
	    // );
  	}
}


const mapStateToProps = ({paientinfo}) => {
		const {paientinfolist,paientinfos} = paientinfo;
    return {paientinfolist,paientinfos};
}
App = withRouter(App);
export default connect(mapStateToProps)(App);
