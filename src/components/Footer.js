import React from 'react'
import logo from './logo.png'
import zillow from './zillo.png'
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div class="footer">
      <div class="container">
        <hr class="footer-line" />
        <div class="row ">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
            <div class="footer-widget ">
              <div class="footer-title">Mioym Equities</div>
              <a target="_blank" href="http://www.mioymequities.com">www.mioymequities.com</a>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
            <div class="footer-widget ">
              <div class="footer-title">Quick Links</div>
              <ul class="list-unstyled">
                <li>
                  <a target="_blank" href="https://realestatecenter.bankofamerica.com/tools/marketvalue4.aspx">Real Estate Center - Bank of America</a>
                </li>
                <li>
                  <a target="_blank" href="https://realtor.com">Realtor</a>
                </li>
                <li>
                  <a target="_blank" href="https://zillow.com">Zillow</a>
                </li>
                <li>
                  <a target="_blank" href="https://google.com/maps">Google Maps</a>
                </li>
                <li>
                  <a target="_blank" href="http://a810-bisweb.nyc.gov/bisweb/bispi00.jsp">Bisweb</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
            <div class="footer-widget ">
              <div class="footer-title">Social</div>
              <ul class="list-unstyled">
                <li>
                  <a target="_blank" href="https://facebook.com">Facebook</a>
                </li>
              </ul>
            </div>
          </div>

          
        </div>
        <div class="row ">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center ">
            <div class="tiny-footer">
              <p>
                Copyright © All Rights Reserved 2019 | Developed by{' '}
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  class="copyrightlink"
                >
                  The Good Programmer
                </a> & <a
                  href="https://facebook.com/shubhamtiwari0000"
                  target="_blank"
                  class="copyrightlink"
                >
                  Shubham Tiwari
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
