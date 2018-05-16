import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';


class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit } = this.props;
    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <div>
							<ul><li>病人分类：<span class="on">压疮</span></li><li>病人姓名：王一</li><li>性别：男</li><li>住院时间：2008-04-23 18:00:10</li><li>床号：BD121</li><li>所在科室：科室一</li><div class="clearfix"></div></ul>
						</div>
						<div>
							<button className="ant-btn-edit">保存修改</button>
						</div>
          </Form>);
        }
    }


    PageForm = reduxForm({
        form: 'EditpatientinfoForm'
    })(PageForm);

    export default PageForm;
