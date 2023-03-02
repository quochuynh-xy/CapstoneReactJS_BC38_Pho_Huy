import React from 'react'
import { NavLink } from 'react-router-dom'

const NavTab = () => {
  return (
    <div>
      <div>
      <NavLink to="/admin/user">User</NavLink>
      </div>
      <div>
      <NavLink to="/admin/detail-films"> Detail Films</NavLink>
      </div>
      <div>
      <NavLink to="/admin/add-new">Add new film</NavLink>
      </div>
      <div>
      <NavLink to="/admin/show-time">Show time</NavLink>
      </div>
    </div>
  )
}

export default NavTab