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
import {  useDispatch } from "react-redux"
import jwtDecode from "jwt-decode";
import {  useHistory } from 'react-router-dom'
import { auth } from "../store/types";
function UserProfile() {
const router = useHistory();
const dispatch = useDispatch();

    function validate(value) {
      let error = { email: "", password: ""};
      if (!value.email) {
        error.email = "Email is required"
      } else  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
		   error.email = 'Invalid email address';
      }
      else return error.email = ''

      if (!value.password) {
        error.password = "Password is required";
      }
      else error.password = ''
      return error;

    // return error;
    }

    
    const formik = useFormik({
        enableReinitialize: true,
        validate: validate,
        initialValues: {
          email: '',
          password: ''
        },
        onSubmit: async values => {
       
            try {

                const { data } =  await axiosClient.post('/auth/jwt/create/',
                values,
                {
                    headers: {
                        'Content-Type': `application/json`,
                        // 'Access-Control-Allow-Origin' : '*'
                    }
                }
                )
                localStorage.setItem('access_token' , data.access )

                const payload =  jwtDecode(data.access);
               
                dispatch({type: auth.LOGIN, data: { user: payload, token: data.access}})

                router.push('/')
                
            } catch (error) {
                console.log(error)
                if ((error.message && error.message.toLowerCase() === 'network error') || (error && error.response && error.response.status === 500)) {
                 formik.setFieldError('email', 'Network Error!!!')
                    // actions.setSubmitting(false);
                }
                
                if ( error.response && error.response.data && error.response.data.detail) {
                    formik.setFieldError('email',error.response.data.detail)
                }
            }
     


        //   localStorage.setItem('auth_token', )
        },
      });

  return (
    <>
      <div className="container-fluid w-100">
        <Row className='d-flex justify-content-center mt-5 pt-5'>
          <Col className='d-flex flex-column' md="4" mx='auto'>
          <h1 className='mx-auto'>Logo</h1>
            <Card className='d-flex py-3'>
              <CardHeader className='d-flex flex-column'>
                 <i className="tim-icons icon-lock-circle displsy-4 font-size-30 mx-auto mb-5"></i>
                <h2 className="title mx-auto">Welcome Back</h2>
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
                </Form>
              </CardBody>

              <Row>
                <Col className="mx-auto" md="8">
              <CardFooter className='d-flex'>
                <Button 
                
                
                onClick={() => formik.submitForm()} className="btn-fill mx-auto w-100" color="primary" type="submit"
                >
                 { formik.isSubmitting ? 'Signing in' :  'Sign In' }
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

// const mapDispatchToProps = (dispatch) => ({
//     // startLogin: (data) => dispatch(startLogin(data)),
//     // startFetchLeads: () => dispatch(startFetchLeads())
// })

// export default connect(undefined, mapDispatchToProps)(UserProfile)

export default UserProfile
