import React, { useCallback } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import jwt_decode from "jwt-decode";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
// import 'react-notifications/lib/notifications.css';

// import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { connect, Provider, useDispatch } from "react-redux";
import store from "store";
import moment from 'moment'
import { useHistory } from "react-router-dom";
import { startLogin } from "store/actions/auth";
import CreatePartner from "views/partners/CreatePartner";
import UpdatePartnerForm from "views/partners/UpdatePartnerForm";
// import Login from "Login"
var ps;


function Admin(props) {
  const router = useHistory();
  const dispatch = useDispatch();
 console.log('srt',props.token)
  const authLogic = async  () => {
    const token =  localStorage.getItem('access_token');
   
    if (token) {
      try {
              // decode the token
      const decoded = await jwt_decode(token);

      if ((moment().unix()/1) > +decoded.exp) {
    
      }
      else {
        // console.log('here')
        dispatch({type: 'AUTHENTICATE', data: { user: decoded, token}})
        startLogin({decoded, token})
       
      }
      } catch (error) {
        router.push('/signin');  
      }

      // console.log((moment().unix()/1) < +decoded.exp)
 
  }else {
    router.push('/signin');   
  }
  }
  const authenticate = useCallback(authLogic,[dispatch,router])
  const location = useLocation();
  //logic for authentication
  React.useEffect(()=> {

    authenticate()
    // authLogic()
   

  },[authenticate, location])



  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
  
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
            <Provider store={store()}>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "/",
                text: "Admin Restaurant",
                imgSrc: 'https://www.thenewboston.com/static/media/thenewboston-primary.52b925da.svg',
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Switch>
                <Route path="/admin/partners/create" render={(props) => <CreatePartner />} />
                <Route path="/admin/partners/edit/:id" render={(props) => <UpdatePartnerForm />} />
                {getRoutes(routes)}
                <Redirect from="*" to="/admin/dashboard" />
              </Switch>
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
          </Provider>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

const mapDispatchToProps = (dispatch) => ({
 startLogin: (data) => dispatch(startLogin(data))
})

const mapStateToProps = (state) => ({
  token : state.auth && state.auth.token ? state.auth.token : null
})


export default connect(mapStateToProps, mapDispatchToProps)(Admin);
