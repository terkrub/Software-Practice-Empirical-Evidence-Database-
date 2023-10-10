import React, { useState } from 'react';
import stylesComponet from './stylesComponet/HeaderStyles.module.css';
import Link from 'next/link';


const Header = () => {
  const [curentPage, setCurentPage] = useState("");
    return (
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">SPEED</a>
          <div className="navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className={curentPage === "home"? "nav-link active": "nav-link"} onClick={()=>setCurentPage("home")} aria-current="page" href="/">Home</a>
              <a className={curentPage === "submit"? "nav-link active": "nav-link"} onClick={()=>setCurentPage("submit")} href="/submit">Submit Article</a>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Header;