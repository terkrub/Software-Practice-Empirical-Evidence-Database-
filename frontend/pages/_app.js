import React, { useEffect } from 'react';
import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }) {
  useEffect(() => {
    // This code will only run on the client side
    const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return <Component {...pageProps} />;
}

export default App;
