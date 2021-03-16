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
  Button
} from "reactstrap";
import { connect } from "react-redux";
// import AddPartnerModal from "components/AddPartnerModal";
import { useHistory } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;
function StaffTable() {
  const history = useHistory();
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
              <CardHeader className='d-flex justify-content-between'>
                <CardTitle tag="h4">Partners</CardTitle>
                <Button 
               
                
                onClick={() => history.push('/admin/partners/create')} className="btn-fill" color="primary" type="submit"
                >
               Create partner
                </Button>
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
                    <th className="text-center">Actions</th>
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
                       <td className='d-flex justify-content-between'>

                       <button type="button" class="btn btn-outline-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
                          <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
                        </svg>
                       <span class="visually-hidden">Edit</span>
                      </button>

                       {/* <i className="tim-icons icon-lock-circle displsy-4 font-size-30 mx-auto mb-5"></i> */}

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