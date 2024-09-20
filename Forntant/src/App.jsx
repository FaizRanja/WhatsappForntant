// App.js
import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { Fragment } from "react";



function App() {
  const location = useLocation();
  const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") || location.pathname.includes("blank");
  return (
    <Fragment>
      {isAuthPath ? (
        <AppRoutes />
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </Fragment>
  );
}

export default App;
