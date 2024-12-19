import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <div id="main-footer" className="foot">
    <div className="container content">
      <div className="rows text-left">
        <div className="col-sm-4 ">
          <h4>Links</h4>
          <ul className="footer-links p-0">
            <li >
              <a href="services.html" className="text-white">Services</a>
            </li>
            <li>
              <a href="info.html" className="text-white">Info</a>
            </li>
            <li>
              <a href="tracking.html" className="text-white">Tracking</a>
            </li>
            <li>
              <a href="about.html" className="text-white">About</a>
            </li>
            <li>
              <a href="contact.html" className="text-white">Contact</a>
            </li>
            <li>
              <a href="/user_profile/Dashboard.html" className="text-white">My Profile</a>
            </li>
            <li>
              <a href="contact.html" className="text-white">Login</a>
            </li>
            <li>
              <a href="contact.html" className="text-white">Register</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <h5 className="mx-outo">Company</h5>
          <ul className="footer-links p-0">
            <li>
              <a href="about.html" className="text-white">Mission</a>
            </li>
            <li>
              <a href="about.html" className="text-white">Our Success</a>
            </li>
            <li>
              <a href="index.html" className="text-white">How it works</a>
            </li>
            <li>
              <a href="services.html" className="text-white">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="col-sm-4">
          <h5>Contact</h5>
          <ul className="footer-links p-0">
            <li><i className="fas fa-map-pin"></i>  Polna 4/12 Krakow</li>
            <li><i className="fa fa-phone"></i>  +48 00000000</li>
            <li><i className="fa fa-envelope"></i>  email.com</li>
            <li className="d-flex">
              <a  className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a  className="text-white mx-3">
                <i className="fab fa-facebook"></i>
              </a>
              <a  className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-column justify-content-center">
              <p className="d-flex justify-content-center" style={{textAlign: "center"}}>Be the first to be informed about our new services</p>
              <form className="d-flex justify-content-center align-items-center">
                <input type="email" className="mb-2 mr-2 border border-primary px-2" placeholder="Enter Email" />
                <button className="btn btn-primary mb-2 btn-sm">Submit</button>
              </form>
            </div>
      </div>
    </div>
  </div> */}

    <div className="container">
      <div className="row">
        <div className="col">
          <p className="d-flex justify-content-center">Copyright  &copy; <span id="year"></span>Imaginario Pix</p>
        </div>
      </div>
    </div>
    </div>
  </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
.foot{
  background-color: var(--color-12);
}
@media (max-width: 991px) {
.foot {
  
  .container{
    /* padding-bottom: 6rem; */
  }
}
}
`

export default Footer
