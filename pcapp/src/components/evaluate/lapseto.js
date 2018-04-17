import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import lodashget from 'lodash.get';


class App extends React.Component {


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
	      	<div>
						<div>
							<span>转归与申报记录</span>
							<Button>转归填写</Button>
							<Button>打印报表</Button>
						</div>
						<div>
							这里是表单？？
						</div>
						<div>
						</div>
	      	</div>
	    );
  	}
}


export default connect()(App);
