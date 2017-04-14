import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div style={{marginTop: '20px'}}>
    <nav className="navbar navbar-light bg-faded rounded navbar-toggleable-md">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#containerNavbar" aria-controls="containerNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand" >Togglol</span>
        <div className="collapse navbar-collapse" id="containerNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <IndexLink className="nav-link" to='/' activeClassName='route--active'>
                  Home
              </IndexLink>
            </li>
            <li className="nav-item">
              <IndexLink className="nav-link" to='/reports' activeClassName='route--active'>
                  Reports
              </IndexLink>
            </li>
          </ul>
        </div>
        <div className="my-2 my-lg-0">
          
        </div>
      </nav>
  </div>
)

export default Header
