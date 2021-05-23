import React, { useState } from 'react'
import logo from '../logo.svg';
import {
  Button, Form, Grid, Message, Segment, Image
} from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { login, getErrorDisplay } from '../frameworks/HttpClient';


export default function LoginScreen() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("required"),
    password: Yup.string().required("required"),
    baseUrl: Yup.string().required("required"),
  });
  
  const formik = useFormik({
    validateOnChange: false,
    validationSchema: validationSchema,
    initialValues: {
      username: '',
      password: '',
      baseUrl: 'http://localhost:8000'
    },
    onSubmit: (values) => onSubmitLogin(values),
  });

  const onSubmitLogin = async (values) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await login({...values});
      history.replace("/");
    } catch (error) { console.log(error); setErrorMessage(getErrorDisplay(error)) } 
    finally { setIsLoading(false) }
  };

  return (
    <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}
      </style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column
          style={{
            maxWidth: 450,
            display: 'flex',
            alignItems: "center"
          }}>
          <Image src={logo} size='small' centered />
            <Segment
              style={{ width: "100%" }} >
              <Form onSubmit={formik.handleSubmit} >
                <Message
                  error
                  header={"เข้าสู่ระบบไม่สำเร็จ"}
                  content={errorMessage}
                  visible={errorMessage != null}
                />
                <Form.Input
                  fluid
                  name='username'
                  icon='user'
                  iconPosition='left'
                  placeholder={"ชื่อผู้ใช้"}
                  value={formik.values.username}
                  error={formik.errors.username}
                  onChange={formik.handleChange}
                />
                <Form.Input
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder={"รหัสผ่าน"}
                  type='password'
                  value={formik.values.password}
                  error={formik.errors.password}
                  onChange={formik.handleChange}
                />
                <Form.Input
                  fluid
                  name='baseUrl'
                  icon='at'
                  iconPosition='left'
                  placeholder={"REST API Server Address"}
                  value={formik.values.baseUrl}
                  error={formik.errors.baseUrl}
                  onChange={formik.handleChange}
                />
                <Button
                  color='blue'
                  fluid size='large'
                  type='submit'
                  loading={isLoading}
                >
                  {"เข้าสู่ระบบ"}
                </Button>
              </Form>
            </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

