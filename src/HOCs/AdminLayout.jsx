import React from 'react'
import NavTab from '../features/Admin/components/NavTab'
const AdminLayout = (props) => {
  return (
    <div>
        <NavTab />
        {props.children}
    </div>
  )
}

export default AdminLayout