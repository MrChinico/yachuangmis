import React from 'react';
import { Field, reduxForm, Form  } from 'redux-form';
import { connect } from 'react-redux';

// evaluateWoundsurfaces:[
//   {
//     '分期':String,
//     '部位':String,
//     '创面大小':{
//       '长':String,
//       '宽':String,
//       '深':String,
//       '潜行':String,
//       '窦道':String,
//       '颜色':String,
//       '渗液量':String
//     }
//   }
// ],
class PageForm extends React.Component {
  render() {
    const { handleSubmit,onClickSubmit,pristine,submitting } = this.props;
    return (
      <Form
          onSubmit={handleSubmit(onClickSubmit)}
          >
            <div className="wound-surface">
              <h4><span>创面1</span>
                <button className="return"><img src="close-blue.png" alt=""/></button>
                <div className="clearfix"></div>
              </h4>
              <div className="wound-surface-form">
                <table>
                  <tr>
                    <td className="black font-weight">项目</td>
                    <td>一期</td>
                    <td>二期</td>
                    <td>-三期-</td>
                    <td>四期</td>
                    <td>可疑深部组织损伤</td>
                    <td colspan="2">不能分期</td>
                  </tr>
                  <tr>
                    <td className="black font-weight">部位</td>
                    <td>枕部</td>
                    <td>（左）耳廓（右）</td>
                    <td>鼻梁</td>
                    <td>棘突</td>
                    <td>（左）肩峰（右）</td>
                    <td colspan="2">（左）肩胛部（右）</td>
                  </tr>
                  <tr>
                    <td className="black font-weight"></td>
                    <td>（左）<span className="blue">耳廓（右）</span></td>
                    <td>（左）耳廓（右）</td>
                    <td>鼻梁</td>
                    <td>棘突</td>
                    <td>（左）肩峰（右）</td>
                    <td colspan="2">（左）肩胛部（右）</td>
                  </tr>
                  <tr>
                    <td className="black font-weight"></td>
                    <td>枕部</td>
                    <td>足跟</td>
                    <td>足趾</td>
                  </tr>
                  <tr>
                    <td className="black font-weight">大小</td>
                    <td>长：<input type="text" />cm</td>
                    <td>宽：<input type="text" />cm</td>
                    <td>深：<input type="text" />cm</td>
                    <td>潜行：<input type="text" /></td>
                    <td>窦道：<input type="text" /></td>
                    <td>颜色：<input type="text" /></td>
                    <td>渗液量：<input type="text" /></td>
                  </tr>
                </table>
              </div>
              <button className="add-btn"><img src="add-blue.png" alt="" />添加新创面</button>
            </div>
            <div className="mt40">
              <button className="ant-btn-edit blue white">提交评估</button>
            </div>
          </Form>);
        }
    }


    PageForm = reduxForm({
        form: 'NewwoundsurfaceForm'
    })(PageForm);

    export default PageForm;
