import React, { useEffect, useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import { useAlert } from "react-alert";
// reactstrap components
import {
  Button,
  // Card,
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
import {  connect } from "react-redux"
// import jwtDecode from "jwt-decode";
import {  useHistory } from 'react-router-dom'
import { startLogin } from "store/actions/auth";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
 
const { REACT_APP_API_URL } = process.env
function UserProfile() {
  const alertCus = useAlert();
  const [country, setCountry] = useState([])
const [value] = useState('')
  const getCountry = async () => {
    try {
      const {data} = await axios.get(REACT_APP_API_URL+ 'country')
      setCountry(data)
    } catch (error) {
      console.log(error)
    }

  }
useEffect(()=> {
 getCountry()
},[])
const router = useHistory();
// const dispatch = useDispatch();

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
          name: '',
          first_name: '',
          last_name: '',
          email: '',
          country: '',
          state: '',
          street_address: ''
        },
        onSubmit: async values => {
            // return alert(JSON.stringify(  {...values, country: country.find(c => c.alpha_two_code == values.country).uuid}))
            try {
              await axios.post(REACT_APP_API_URL+ 'partner', 
              {...values ,country: country.find(c => c.alpha_two_code === values.country).uuid},
                {
                    headers: {
                        'Content-Type': `application/json`,
                        // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        // 'Access-Control-Allow-Origin' : '*'
                    }
                }
                )
              
             
               
                alertCus.success("Partner created successfully");
                setTimeout(() => {
                  router.push('/admin/partners')
                }, 2000);
               
                
            } catch (error) {
                console.log(error)
                if ((error.message && error.message.toLowerCase() === 'network error') || (error && error.response && error.response.status === 500)) {
                  alertCus.error("Network Error!");
              //  formik.setFieldError('email', 'Network Error!!!')
                  // actions.setSubmitting(false);
              }
              
              if ( error.response && error.response.data && error.response.data.detail) {
                  alertCus.error(error.response.data.detail);
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
    {/* <NotificationAlertCus ref={ref} zIndex={9999} onClick={() => console.log("hey")}/> */}
      <div className="container-fluid w-100">
        <Row className='d-flex justify-content-center'>
          <Col className='d-flex flex-column' md="12" mx='auto'>
          <h1 className='mx-auto'>Create Partner</h1>
            {/* <Card className='d-flex py-3'> */}
              <CardHeader className='d-flex flex-column'>
                 {/* <i className="tim-icons icon-lock-circle displsy-4 font-size-30 mx-auto mb-5"></i>
                <h2 className="title mx-auto">Welcome Back</h2> */}
              </CardHeader>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col className="mx-auto" md="12">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                        Business Name
                          {/* {JSON.stringify(formik.errors)} */}
                        </label>
                        <Input name='name' onChange={e => formik.setFieldValue('name', e.target.value) } 
                        className={formik.errors && formik.errors.name &&  'is-invalid'}
                         placeholder="Business Name" type="name" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.name}</div>
                      </FormGroup>
                    </Col>

                   
                    </Row>
                <Row>
                    <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                         First Name
                          {/* {JSON.stringify(formik.errors)} */}
                        </label>
                        <Input name='first_name' onChange={e => formik.setFieldValue('first_name', e.target.value) } 
                        className={formik.errors && formik.errors.first_name &&  'is-invalid'}
                         placeholder="First Name" type="first_name" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.first_name}</div>
                      </FormGroup>
                    </Col>

                    <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                          Last Name
                          {/* {JSON.stringify(formik.errors)} */}
                        </label>
                        <Input name='last_name' onChange={e => formik.setFieldValue('last_name', e.target.value) } 
                        className={formik.errors && formik.errors.last_name &&  'is-invalid'}
                         placeholder="Last Name" type="last_name" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.last_name}</div>
                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                    <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                          {/* {JSON.stringify(formik.errors)} */}
                        </label>
                        <Input name='email' onChange={e => formik.setFieldValue('email', e.target.value) } 
                        className={formik.touched && formik.touched.email && formik.errors && formik.errors.email &&  'is-invalid'}
                         placeholder="mike@email.com" type="email" />
                        <div className="invalid-feedback d-block">{formik.touched && formik.touched.email && formik.errors && formik.errors.email}</div>
                      </FormGroup>          
                    </Col>

                    <Col className="mx-auto" md="6">
                      {/* <FormGroup className='is-invalid'> */}
                        <label htmlFor="exampleInputEmail1">
                          Phone
                          {/* {JSON.stringify(formik.errors)} */}
                        </label>
                        <PhoneInput
                          className=''
                          placeholder="Enter phone number"
                          value={value}
                          onChange={(val)=> formik.setFieldValue('phone', val)}/>
                        {/* <Input name='phone' onChange={e => formik.setFieldValue('phone', e.target.value) } 
                        className={formik.errors && formik.errors.phone &&  'is-invalid'}
                         placeholder="mike@phone.com" type="phone" /> */}
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.phone}</div>
                      {/* </FormGroup> */}
                    </Col>
                    </Row>

                    <Row>

                    <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                        
                         Country
                        </label>
                        <ReactFlagsSelect
                         className="menu-flags"
                          countries={country && country.map(d => d.alpha_two_code)}
                          selected={formik.values.country}
                          onSelect={code => formik.setFieldValue('country', code)}
                          // customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
                          placeholder="Select Country" />
                        {/* <Input name='country' onChange={e => formik.setFieldValue('country', e.target.value) } 
                        className={formik.errors && formik.errors.country &&  'is-invalid'}
                         placeholder="Country" type="country" /> */}
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.country}</div>
                      </FormGroup>
                    </Col>

                     <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                        
                          Street Address
                        </label>
                        <Input name='street_address' onChange={e => formik.setFieldValue('street_address', e.target.value) } 
                        className={formik.errors && formik.errors.street_address &&  'is-invalid'}
                         placeholder="Street Address" type="address" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.street_address}</div>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    

                    <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                        
                          State
                        </label>
                        <Input name='state' onChange={e => formik.setFieldValue('state', e.target.value) } 
                        className={formik.errors && formik.errors.state &&  'is-invalid'}
                         placeholder="State" type="state" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.state}</div>
                      </FormGroup>
                    </Col>

                    <Col className="mx-auto" md="6">
                      <FormGroup className='is-invalid'>
                        <label htmlFor="exampleInputEmail1">
                        
                          City
                        </label>
                        <Input name='state' onChange={e => formik.setFieldValue('city', e.target.value) } 
                        className={formik.errors && formik.errors.city &&  'is-invalid'}
                         placeholder="city" type="city" />
                        <div className="invalid-feedback d-block">{formik.errors && formik.errors.city}</div>
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
                 { formik.isSubmitting ? 'Creating' :  'Create' }
                </Button>
              </CardFooter>
              </Col>
              </Row>
            {/* </Card> */}
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

