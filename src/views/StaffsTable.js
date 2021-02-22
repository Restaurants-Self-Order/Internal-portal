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
import React, { useEffect, useState } from "react";
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";

const { REACT_APP_API_URL } = process.env
function StaffTable() {
  // const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPartners = async () => {
   
    try {
       setLoading(true);
      const {data} = await axios.get(REACT_APP_API_URL+ 'partner', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }



  }

  useEffect(()=> {
    fetchPartners();
  },[])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Partners</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                 
                    <tr>
                    <th>Business Name</th>
                    <th>Owner's Name</th>
                    <th>Email</th>
                    <th>Street Address</th>
                    <th>Country</th>
                    <th>City</th>
                    <th className="text-center">Phone</th>
                  </tr>
               
                  </thead>
                  <tbody>
                  {loading ? <h2 className='mx-auto'>Fetching partners ...</h2> :
                  
                  (data && data.map(data => (
                       <tr>
                       <td>{data.name}</td>
                       <td>{data.first_name + ' ' + data.last_name}</td>
                       <td>{data.email}</td>
                       <td>{data.street_address}</td>
                       <td>{data.country}</td>
                       <td>{data.city}</td>
                       <td>{data.phone}</td>
                     </tr>
                      )))}  
                   
                  
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
 return { token: state} 
  // startFetchLeads: () => dispatch(startFetchLeads())
}

export default connect(mapStateToProps, undefined)(StaffTable)