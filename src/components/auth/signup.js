import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({
  input,
  label,
  type,
  meta: {touched, error, warning}
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type} />
      {touched &&
        ((error &&
          <div className="error">
            {error}
          </div>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>

class Signup extends Component {

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field name="email" component={renderField} type="text" label="Email:" />
        </fieldset>
        <fieldset className="form-group">
          <Field type="password" component={renderField} name="password" label="Password:" />
        </fieldset>
        <fieldset className="form-group">
          <Field type="password" component={renderField} name="passwordConfirm" label="Password Confirm:" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

function validate (formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = "Please enter email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors;
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Signup);
