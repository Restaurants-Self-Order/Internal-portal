import React, { useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  // CardTitle,
  // Table,
  Row,
  Col,
  // Button
} from "reactstrap";
import { connect } from "react-redux";
// import AddPartnerModal from "components/AddPartnerModal";
import { useParams } from "react-router-dom";
import PartnerForm from "components/PartnerForm";
// import axios from 'axios';

function UpdatePartnerAForm(props) {
    const history = useParams()
//   const [loading, setLoading] = useState(false)
    useEffect(()=> {
        console.log(history.id)
    },[history])
    // const fetchUser = async () => {
    //     try {
    //         setLoading(true);
    //        const {data} = await axios.get(REACT_APP_API_URL+ 'partner', {
    //          headers: {
    //            'Content-Type': 'application/json',
    //            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //          }
    //        })
    //        setData(data);
    //        setLoading(false);
    //      } catch (error) {
    //        console.log(error);
    //        setLoading(false);
    //      }
     
    // }

 
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className='d-flex justify-content-between'>
                {/* <CardTitle tag="h4">Partners</CardTitle> */}
              </CardHeader>
              <CardBody className='p-0'>
              <PartnerForm title={"Update Partner"}/>
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

export default connect(mapStateToProps, undefined)(UpdatePartnerAForm)