import React from 'react'
import { NavLink } from 'react-router-dom'

const NavTab = () => {
  return (
    <div>
      <div>
        <NavLink to='/user' >User</NavLink>
      </div>
      <div>
        <NavLink to='/detail-films' > Detail Films</NavLink>
      </div>
      <div>
        <NavLink to='/add-new' >Add new film</NavLink>
      </div>
      <div>
        <NavLink to='/show-time' >Show time</NavLink>
      </div>
    </div>
  )
}

export default NavTab