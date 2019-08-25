import { TokenDto } from '@zorko/dto';
import { Field, Form, Formik, FormikActions, FormikBag } from 'formik';
import React from 'react';
import Api from '@zorko/client-api';

export interface FormValues {
  login: string,
  password: string,
}

export interface PropTypes {
  readonly onSuccess: (token: TokenDto) => void;
}

export function LoginForm (props: PropTypes){

  function handleSubmit(values: FormValues, actions: FormikActions<FormValues>) {
    Api.createToken({
      email: values.login,
      password: values.password
    }).then((payload) => {
      actions.setSubmitting(true);
      props.onSuccess(payload);
    }).catch((error) => {
      actions.setError(error);
    })
  }

  return (
    <Formik initialValues={{
    login: '',
    password: ''
  }}
  onSubmit={handleSubmit}>
    {(form: FormikBag<PropTypes, FormValues>) => (
      <Form autoComplete='off'>
        <Field name="login" type="text" />
        <Field name="password" type="text" />
        <button type="submit">Submit</button>
        <button onClick={()=> {
          form.resetForm()
        }}>Cancel</button>
      </Form>
    )}
  </Formik>
  )
}
