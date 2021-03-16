
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
      const {data} = await axios.get(REACT_APP_API_URL+ 'partner-applications', {
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
                <CardTitle tag="h4">Categories</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                 
                    <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Created At</th>
                   
                
               
                  </tr>
               
                  </thead>
                  <tbody>
                  {loading ? <h2 className='mx-auto'>Fetching partner applications...</h2> :
                  
                  (data && data.map(data => (
                       <tr>
                       <td>{data.name}</td>
                       <td>{data.status}</td>
                       <td>{data.createdAt}</td>
                      
                       
                    
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