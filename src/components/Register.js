/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
//   CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { useFormik } from 'formik';
import axiosClient from "../services/AxiosClient";
import {  connect } from "react-redux"
import {  NavLink, useHistory } from 'react-router-dom'
import { startLogin } from "store/actions/auth";
import * as Yup from 'yup';
import { useAlert } from "react-alert";


const validationSchema = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
    re_password: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function UserProfile() {


const router = useHistory();
// const dispatch = useDispatch();
const alert = useAlert();

    
    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
          email: '',
          password: '',
          re_password: ''
        },
        onSubmit: async values => {
       
            try {

                  await axiosClient.post('/auth/users/',
                values,
                {
                    headers: {
                        'Content-Type': `application/json`,
                        // 'Access-Control-Allow-Origin' : '*'
                    }
                }
                )
            //     localStorage.setItem('access_token' , data.access )

            //     const payload =  jwtDecode(data.access);
            //     dispatch({type: 'AUTHENTICATE',  data: {user: payload, token : data.access}})
            //     // console.log(payload)
            //   //  await startLogin({decoded: payload, token:  data.access})
            //     // dispatch({type: 'AUTHENTICATE', data: { user: payload, token: data.access}})
                alert.success("Registration Successful")
                setTimeout(() => {
                    router.push('/signin')
                }, 2000);
               
                
            } catch (error) {
                console.log(error)
                if ((error.message && error.message.toLowerCase() === 'network error') || (error && error.response && error.response.status === 500)) {
                    alert.error("Network Error!");
                //  formik.setFieldError('email', 'Network Error!!!')
                    // actions.setSubmitting(false);
                }
                
                if ( error.response && error.response.data && error.response.data.detail) {
                    alert.error(error.response.data.detail);
                    formik.setFieldError('email',error.response.data.detail);
                }

                if(error.response && error.response.data && error.response.data) {
                    formik.setErrors(error.response.data)
                }
            }
     


        //   localStorage.setItem('auth_token', )
        },
      });

  return (
    <>
      <div className="container-fluid w-100">
        <Row className='d-flex justify-content-center pt-5'>
          <Col className='d-flex flex-column' md="4" mx='auto'>
          <h1 className='mx-auto'>Logo</h1>
            <Card className='d-flex py-3'>
              <CardHeader className='d-flex flex-column'>
                 <i className="tim-icons icon-lock-circle displsy-4 font-size-30 mx-auto mb-5"></i>
                <h2 className="title mx-auto">Register Now</h2>
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col className="mx-auto" md="8">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                          {/* {JSON.stringify(formik.errors)} */}
                        </label>
                        <Input name='email' onChange={e => formik.setFieldValue('email', e.target.value) } 
                        className={formik.errors && formik.errors.email &&  'is-invalid'}
                         placeholder="mike@email.com" type="email" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.email}</div>
                      </FormGroup>
                    </Col>
                    </Row>

                <Row>
                <Col className="mx-auto" md="8">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                          Password
                        </label>
                        <Input 
                          className={formik.errors && formik.errors.password && ' is-invalid'}
                         name='password' onChange={e => formik.setFieldValue('password', e.target.value)} 
                         placeholder="mike@email.com" type="password" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.password}</div>
                      </FormGroup>
                    
                    </Col>
                  </Row>

                  <Row>
                <Col className="mx-auto" md="8">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                          Password Confirmation
                        </label>
                        <Input 
                          className={formik.errors && formik.errors.re_password && ' is-invalid'}
                         name='re_password' onChange={e => formik.setFieldValue('re_password', e.target.value)} 
                         placeholder="password confirmation" type="password" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.re_password}</div>
                      </FormGroup>
                    
                    Already have an account, <NavLink to='/signin'>click to sign in</NavLink>
                    </Col>
                  </Row>
                </Form>

              </CardBody>

              <Row>
                <Col className="mx-auto" md="8">
              <CardFooter className='d-flex'>
                <Button 
                
                
                onClick={() => formik.submitForm()} className="btn-fill mx-auto w-100" color="primary" type="submit"
                >
                 { formik.isSubmitting ? 'Signing you up' :  'Sign Up' }
                </Button>
              </CardFooter>
              </Col>
              </Row>
            </Card>
          </Col>
         
        </Row>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: data => dispatch(startLogin(data)),
  
})

export default connect(undefined, mapDispatchToProps)(UserProfile)

