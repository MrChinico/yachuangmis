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
							这里是编辑病人表单这里是编辑病人表单这里是编辑病人表单这里是编辑病人表单这里是编辑病人表单
						</div>
						<div>
							<button>保存修改</button>
						</div>
          </Form>);
        }
    }


    PageForm = reduxForm({
        form: 'EditpatientinfoForm'
    })(PageForm);

    export default PageForm;
