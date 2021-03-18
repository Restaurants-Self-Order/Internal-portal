
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
//   Button
} from "reactstrap";
import { connect } from "react-redux";
import DeleteModalPartner from "components/DeleteModalPartner";
// import AddPartnerModal from "components/AddPartnerModal";
// import { useHistory } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;
function StaffTable() {
//   const history = useHistory();
  // const auth = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPartners = async () => {
   
    try {
       setLoading(true);
      const {data} = await axios.get(REACT_APP_API_URL+ 'partner-application', {
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
              <CardHeader className='d-flex justify-content-between'>
                <CardTitle tag="h4">Partner Applications</CardTitle>
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
                    <th className="text-center">Action</th>
                  </tr>
               
                  </thead>
                  <tbody>
                  {loading ? <h2 className='mx-auto'>Fetching partner applications...</h2> :
                  
                  (data && data.map(data => (
                       <tr>
                       <td>{data.shop_name}</td>
                       <td>{data.first_name + ' ' + data.last_name}</td>
                       <td>{data.email}</td>
                       <td>{data.detailed_address}</td>
                       <td>{data.country}</td>
                       <td>{data.city}</td>
                       <td>{data.phone}</td>
                       <td className='d-flex justify-content-between'>
                        <DeleteModalPartner buttonLabel='Delete'/>
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right cursor-pointer" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                      </svg>

                       </td>
                    
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