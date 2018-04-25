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
            <div>
              这里是评估创面评估表单这里是评估创面评估表单这里是评估创面评估表单这里是评估创面评估表单这里是评估创面评估表单
            </div>
            <div>
              <button>递交评估</button>
            </div>
          </Form>);
        }
    }


    PageForm = reduxForm({
        form: 'NewwoundsurfaceForm'
    })(PageForm);

    export default PageForm;
