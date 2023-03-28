import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserFriends,
  FaInfoCircle,
  FaPlus,
  // FaCalendarAlt,
} from "react-icons/fa";

const NavTab = () => {
  return (
    <div >
      <aside
        id="logo-sidebar"
        className=" z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-auto px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/user"
                className={(params) => {
                  if (params.isActive) {
                    return "flex items-center p-2 text-base font-normal text-white bg-black rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  } else {
                    return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  }
                }}
              >
                <FaUserFriends />
                <span className="ml-3">User</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/detail-films"
                   className={(params) => {
                  if (params.isActive) {
                    return "flex items-center p-2 text-base font-normal text-white bg-black rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  } else {
                    return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  }
                }}
              >
                <FaInfoCircle />
                <span className="ml-3">Detail Films</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/add-new"
                   className={(params) => {
                  if (params.isActive) {
                    return "flex items-center p-2 text-base font-normal text-white bg-black rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  } else {
                    return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  }
                }}
              >
                <FaPlus />
                <span className="ml-3">Add New Film</span>
              </NavLink>
            </li>
            <li>
              {/* <NavLink
                to="/admin/show-time"
                   className={(params) => {
                  if (params.isActive) {
                    return "flex items-center p-2 text-base font-normal text-white bg-black rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  } else {
                    return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700";
                  }
                }}
              >
                <FaCalendarAlt />
                <span className="ml-3">Show time</span>
              </NavLink> */}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default NavTab;
