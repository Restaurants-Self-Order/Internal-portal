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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
// import RTLLayout from "layouts/RTL/RTL.js";
import Login from "components/Login.js"
// import 'react-notifications/lib/notifications.css';
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { Provider } from "react-redux";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import Register from "components/Register";

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

ReactDOM.render(
  // <React.StrictMode>
  
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
    <Provider store={store()}>
      <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <Switch>
        
          <Route path="/signup" render={(props) => <Register {...props} />} />
          <Route path="/signin" render={(props) => <Login {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
          <Redirect from="/" to="/admin/dashboard" />
        
      
        </Switch>
        </AlertProvider>
       
      </BrowserRouter>
      </Provider>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
 
  // </React.StrictMode>
  
  ,
  document.getElementById("root")
);
