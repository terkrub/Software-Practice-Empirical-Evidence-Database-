import React, { useEffect } from 'react';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';



function App({ Component, pageProps }) {
  useEffect(() => {
    // This code will only run on the client side
    const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};

export default App;
