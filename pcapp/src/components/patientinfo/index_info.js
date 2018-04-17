import React from 'react';
import { connect } from 'react-redux';
import { Layout,Button } from 'antd';
import lodashget from 'lodash.get';
import InfoBarden from './info_barden';
import InfoNursingmeasures from './info_nursingmeasures';
import InfoWoundsurface from './info_woundsurface';
import InfoSmartdevice from '../smartdevice/patientinfo_smartdevice';
import InfoLapsetto from '../evaluate/lapseto';

class App extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						btnindex : 0
				};
		}
		componentDidMount(){

		}

		componentWillUnmount() {

		}

  	render() {
			const {curpaientinfo} = this.props;
			if(!curpaientinfo){
				return <div>无病人信息</div>
			}
			return (
					<Layout>
						<div>头部标题栏</div>
						<span><Button onClick={
							()=>{
								this.props.history.goBack();
							}
						}>返回首页</Button></span>
						<span></span>
						<span></span>
						<span></span>
						<div>
							<Button onClick={
								()=>{
									this.setState({btnindex:0});
								}
							}>Barden评估</Button>
							<Button onClick={
								()=>{
									this.setState({btnindex:1});
								}
							}>创面评估</Button>
							<Button onClick={
								()=>{
									this.setState({btnindex:2});
								}
							}>护理措施</Button>
							<Button onClick={
								()=>{
									this.setState({btnindex:3});
								}
							}>转归与申报</Button>
							<Button onClick={
								()=>{
									this.setState({btnindex:4});
								}
							}>翻身治疗</Button>
						</div>
						<div>
							{this.state.btnindex === 0 && <InfoBarden curpaientinfo={curpaientinfo} />}
							{this.state.btnindex === 1 && <InfoWoundsurface curpaientinfo={curpaientinfo} />}
							{this.state.btnindex === 2 && <InfoNursingmeasures curpaientinfo={curpaientinfo} />}
							{this.state.btnindex === 3 && <InfoLapsetto curpaientinfo={curpaientinfo} />}
							{this.state.btnindex === 4 && <InfoSmartdevice curpaientinfo={curpaientinfo} />}
						</div>
					</Layout>
			);
  	}
}

const mapStateToProps = ({paientinfo},props) => {
		const {paientinfos} = paientinfo;
		const id = lodashget(props,'match.params.id');
		let curpaientinfo = paientinfos[id];
    return {curpaientinfo};
}
export default connect(mapStateToProps)(App);
