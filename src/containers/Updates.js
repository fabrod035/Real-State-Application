import React from 'react'
import {Link} from 'react-router-dom'

export default function Updates() {
  return (
    <div className="container mb-3 mt-4">
      <p>
        <span className="bg-primary text-white p-2">Updates</span>
      </p>
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-1">Final Search V7.0</h3>
            <small>Apr 18</small>
          </div>
          <p class="mb-1">
            We now finally support all seven property estimators.{' '}
            <p>
              <code>zillow</code>, <code>chase</code>, <code>eppraisal</code>,{' '}
              <code>pennymacusa</code> <code>AttomData</code>{' '}
              <code>Realtor</code>
            </p>
            <code>Bankofamerica Real estate center</code> gets it's data from
            zillow. Hence, we technically support all 7 services.
          </p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Search V3.0</h5>
            <small>Mar 25</small>
          </div>
          <p class="mb-1">
            Now we provide search results from zillow, eppraisal and
            pennymacusa. You can see the estimated value of a property by all
            three <code>zillow</code>, <code>eppraisal</code> and{' '}
            <code>pennymacusa</code>.
          </p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Error handling</h5>
            <small>Mar 24</small>
          </div>
          <p class="mb-1">
            Now, errors are being handled more gracefully. If someone enters
            property address which doesn't exist it notifies to the user in the
            first place.
          </p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Search V2.0</h5>
            <small>Mar 24</small>
          </div>
          <p class="mb-1">
            Now we provide search results from zillow and eppraisal both. You
            can see the estimated value of a property by both{' '}
            <code>zillow</code> and <code>eppraisal</code>.
          </p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Search</h5>
            <small>Mar 9</small>
          </div>
          <p class="mb-1">
            Right now you can only search properties from zillow.
          </p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Added help</h5>
            <small class="text-muted">Mar 9</small>
          </div>
          <p class="mb-1">
            Not sure how to use this app. We have a demo for you. Later in
            future we'll give you access to quick demo in case you are lost how
            this application works.
          </p>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Start</h5>
            <small class="text-muted">Mar 9</small>
          </div>
          <p class="mb-1">
            This application is aimed to provide easy access to data from zillow
            and other real estate web applications.
          </p>
        </a>
      </div>
    </div>
  )
}
