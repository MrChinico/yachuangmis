import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import HeadTitle from './index_title';
import Patientinfolist from './index_patientinfolist';
class App extends React.Component {

	// constructor(props) {
  //       super(props);
  //   }

		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
	    return (
	      	<Layout>
						<HeadTitle />
						<Patientinfolist />
	      	</Layout>
	    );
  	}
}

// const mapStateToProps = ({app:{ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,mapstyle},
// 	device:{devicelist,devices,devicetype},
// 	userlogin:{usersettings,loginsuccess}}) => {
// 		let curdevice;
// 		let curdeviceid = lodashget(usersettings,'indexdeviceid');
// 		if(!!curdeviceid){
// 			curdevice = devices[curdeviceid];
// 		}
// 		if(!curdevice){
// 			if(devicelist.length > 0){
// 				curdevice = devices[devicelist[0]];
// 			}
// 		}
//     return {ispopuserinfo,ispoppwd,ispopcare,ispopcaresel_single_index,curdevice,loginsuccess,devices,usersettings,mapstyle,devicetype};
// }
export default connect()(App);
