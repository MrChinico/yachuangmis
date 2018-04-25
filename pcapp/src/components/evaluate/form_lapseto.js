import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';


class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit,pristine,submitting } = this.props;
    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <div className="form-box">

    						<h1>某某市某某医院高危压疮申报表</h1>
    						<table className="patient-info">
    							<tbody>
    							<tr className="elastic">
    								<td>姓名：<input type="text" /></td>
    								<td>性别：<input type="text" /></td>
    								<td>年龄：<input type="text" /></td>
    								<td>住院号：<input type="text" /></td>
    							</tr>
    							<tr className="elastic">
    								<td>科室：<input type="text" /></td>
    								<td className="w-50">入院日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    								<td>床号：<input type="text" /></td>
    							</tr>
    							</tbody>
    						</table>

    						<table className="choose-info">
    							<tbody>
    							<tr>
    								<td>诊断：</td>
    								<td></td>
    							</tr>
    							<tr>
    								<td>压疮评分：</td>
    								<td>分</td>
    							</tr>
    							<tr className="gray title">
    								<td>必备条件和选择条件</td>
    								<td></td>
    							</tr>
    							<tr className="gray">
    								<td>必备条件：强迫体位需要严格限制造成强迫体位的原因</td>
    								<td>可选择条件</td>
    							</tr>
    							<tr>
    								<td><input type="checkbox" name="check[]" />1、意识障碍</td>
    								<td><input type="checkbox" name="check[]" />1、高龄≥70岁</td>
    							</tr>
    							<tr>
    								<td><input type="checkbox" name="check[]" />10、其他</td>
    								<td></td>
    							</tr>
    							<tr className="gray title">
    								<td>预防措施：</td>
    								<td></td>
    							</tr>
    							<tr>
    								<td colSpan="2"><input type="checkbox" name="check[]" />
    								1、告知患者及家压疮属的危险并悬挂“压疮高危”警示标志，进行健康宣教，讲解相关注意事项。
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2"><input type="checkbox" name="check[]" />
    								2、告知患者及家压疮属的危险并悬挂“压疮高危”警示标志，进行健康宣教，讲解相关注意事项。
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2">
    									<input type="checkbox" name="check[]" />3、使用：
    									<span>1)翻身床治疗<input type="checkbox" name="check[]" /></span>
    									<span>2)翻身床治疗<input type="checkbox" name="check[]" /></span>
    									<span>3)翻身床治疗<input type="checkbox" name="check[]" /></span>
    									<span>4)其他：<input type="text" className="" /></span>
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2"><input type="checkbox" name="check[]" />
    								10、动态评估与记录
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2"><input type="checkbox" name="check[]" />11、其他<input type="text" /></td>
    							</tr>
    							<tr>
    								<td>申报人：<input type="text" /></td>
    								<td className="w-50">申报时间：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr>
    								<td>护士长签字：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr className="gray title">
    								<td colSpan="2">主管部门审核与指导意见</td>
    							</tr>
    							<tr>
    								<td colSpan="2">
    									<input type="checkbox" name="check[]" />符合难免压疮申报的条件：
    									<span>是<input type="checkbox" name="check[]" /></span>
    									<span>否<input type="checkbox" name="check[]" /></span>
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2">指导意见：<input type="text" /></td>
    							</tr>
    							<tr>
    								<td>主管部门签字：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr className="blue title">
    								<td colSpan="2">转归情况：</td>
    							</tr>
    							<tr>
    								<td>
    									<input type="checkbox" name="check[]" />1、是否发生压疮：
    									<span>是<input type="checkbox" name="check[]" /></span>
    									<span>否<input type="checkbox" name="check[]" /></span>
    								</td>
    								<td className="w-50">压疮发生时间：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							<tr>
    								<td colSpan="2">
    									<input type="checkbox" name="check[]" />1、患者去向：
    									<span>出院/转院<input type="checkbox" name="check[]" /></span>
    									<span>死亡<input type="checkbox" name="check[]" /></span>
    								</td>
    							</tr>
    							<tr>
    								<td>上报人：<input type="text" /></td>
    								<td className="w-50">日期：
    									<input type="text" />年
    									<input type="text" />月
    									<input type="text" />日
    									<input type="text" />:<input type="text" />
    								</td>
    							</tr>
    							</tbody>
    						</table>

    				</div>

            <div><button className="ant-btn-edit blue m30-0">提交数据</button></div>
      </Form>);
    }
}


PageForm = reduxForm({
    form: 'LapsettoForm'
})(PageForm);

export default PageForm;
