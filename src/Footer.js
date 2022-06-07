import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function Footer() {
  return (
    <div className="container mb-3">
      <div className="row">
        <div className="col-12 col-md-4 pt-3 mx-auto">
          <h5 className="text-center footerText">Developed by <a className="footerLink color-black" href="https://collins-personal-portfolio.netlify.app/" target="_blank">Collin Dapper</a>  © 2022</h5>
        </div>
        <div className="col-12 col-md-4 pt-3 mx-auto">
          <h5 className="text-center text-white"><a className="portfolioLink me-3" href="https://collins-personal-portfolio.netlify.app/" target="_blank"><i className="far fa-folder-open"></i> Portfolio</a><a className="linkedinLink me-3" href="https://www.linkedin.com/in/collin-dapper-a1b59a152/" target="_blank"><i className="fab fa-linkedin me-1"></i>LinkedIn</a><a className="githubLink" href="https://github.com/collindapper" target="-blank"><i className="fab fa-github me-1"></i>GitHub</a></h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;