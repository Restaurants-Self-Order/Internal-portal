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
// import { useHistory } from "react-router-dom";
import PartnerForm from "components/PartnerForm";


function CreatePartner() {
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
              <PartnerForm title="Create Partner"/>
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

export default connect(mapStateToProps, undefined)(CreatePartner)