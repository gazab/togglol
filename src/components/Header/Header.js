import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div className="row">
    <div className="col-sm-12 text-xs-center">
      <h1 className="display-4">Togglol</h1>
      <p className="lead">When you need to use Toggl a bit differently</p>
      <a href="https://github.com/gazab/togglol" target="_blank">Visit Togglol on Github</a>
    </div>
  </div>
)

export default Header
