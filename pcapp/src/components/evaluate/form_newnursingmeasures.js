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
            <div className="wound-surface">
              <div className="wound-surface-form">
                <table>
                  <tr>
                    <td className="black font-weight">全面治疗</td>
                    <td className="blue">-积极治疗原发病-</td>
                    <td>-增加营养-</td>
                    <td>-三期-</td>
                    <td>四期</td>
                    <td>可疑深部组织损伤</td>
                    <td colspan="2">不能分期</td>
                  </tr>
                  <tr>
                    <td className="black font-weight">体位与活动</td>
                    <td>-建立翻身卡-</td>
                    <td className="blue">-定期翻身-</td>
                  </tr>
                  <tr>
                    <td className="black font-weight">皮肤护理</td>
                    <td>（左）<span className="blue">耳廓（右）</span></td>
                    <td>（左）耳廓（右）</td>
                    <td>鼻梁</td>
                    <td>棘突</td>
                    <td>（左）肩峰（右）</td>
                    <td colspan="2">（左）肩胛部（右）</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="mt40">
              <button className="ant-btn-edit blue white">提交措施</button>
            </div>
          </Form>);
        }
    }


    PageForm = reduxForm({
        form: 'NewnursingmeasuresForm'
    })(PageForm);

    export default PageForm;
