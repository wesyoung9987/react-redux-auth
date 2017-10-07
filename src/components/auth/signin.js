import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
          <label>Email:</label>
          <Field className="form-control" name="email" component="input" type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field className="form-control" name="password" component="input" type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Signin);
