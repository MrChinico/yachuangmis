import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import renderansweroptions from './renderansweroptions';

const AnswerOptionsInput = (props) => {
  const {source,label,record} = props;
  return(
      <span>
      <Field
          name={source}
          component={renderansweroptions}
          label={label}
          record={record}
      />
    </span>
  )
}

AnswerOptionsInput.defaultProps = {
    addLabel: true,
};

export {AnswerOptionsInput};
