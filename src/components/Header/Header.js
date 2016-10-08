import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div className="text-center">
    <h1>Togglol</h1>
    <p>For us who have to use Toggl the wrong way</p>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Home
    </IndexLink>
    {' · '}
    <a href="https://github.com/gazab/togglol" target="_blank">Visit Togglol on Github</a>
  </div>
)

export default Header
