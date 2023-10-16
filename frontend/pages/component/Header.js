import React, { useState, useEffect } from 'react';
import stylesComponet from './stylesComponet/HeaderStyles.module.css';
import Link from 'next/link';


const Header = () => {
  const [curentPage, setCurentPage] = useState("");
  const [user, setUser] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [mod, setMod] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const [admin, setAdmin] = useState(false);
  const modId = ["mod@gmail.com"]
  const analysisId = ["analysis@gmail.com"]
  const adminId = ["admin@gmail.com"]

  useEffect(() => {
    console.log("useEffect is running!");
    const user = localStorage.getItem('user');
    if (user) {
      setLocalUser(user);
    }
  }, []);

  useEffect(() => {
    setMod(modId.includes(localUser))
    setAnalysis(analysisId.includes(localUser))
    setAdmin(adminId.includes(localUser))
  }, [localUser]);

  const handleLogout = () => {
    console.log("handleLogout is being called");
    localStorage.removeItem('user');
    setLocalUser(null);
};

    return (
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">SPEED</a>
          <div className="navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className={curentPage == "home"? "nav-link active": "nav-link"} onClick={()=>setCurentPage("home")} aria-current="page" href="/">Home</a>
              <a className={curentPage == "submit"? "nav-link active": "nav-link"} onClick={()=>setCurentPage("submit")} href="/submit">Submit Article</a>
              {mod || admin ? (
                <a className={(curentPage === "mod" || curentPage === "admin") ? "nav-link active" : "nav-link"} onClick={() => setCurentPage("mod")} aria-current="page" href="/moderation">Moderation</a>
              ) : null}
              {analysis || admin ? (
                <a className={(curentPage === "analysis" || curentPage === "admin") ? "nav-link active" : "nav-link"} onClick={() => setCurentPage("analysis")} aria-current="page" href="/analysis">Analysis</a>
              ) : null}
              

            </div>
            {localUser ? 
            <div className="col-md-10 text-end">
              <a style={{color: "white"}}>{localUser} </a> 
              <button type="button" className="btn btn-warning" onClick={() => handleLogout()}>Sign-out</button>
            </div> 
            :
            <div className="col-md-11 text-end">
              <a type="button" className="btn btn-outline-primary me-2" href="/login">Login</a>
              <a type="button" className="btn btn-primary" href="/register">Sign-up</a>
            </div>
          }
            
              
      </div>
        </div>
      </nav>
    );
};

export default Header;