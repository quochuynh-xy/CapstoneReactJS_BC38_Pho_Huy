import React from "react";
import { Pagination } from "antd";
import { NavLink,  useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsPencilSquare } from "react-icons/bs";
import Loading from "./utils/Loading";
import { FaPlus } from "react-icons/fa";
const User = () => {
  const dataUser = useSelector((state) => state.admin.userDetail);
  const [searchParam, setUseSearchParam] = useSearchParams();

  if (!dataUser || !dataUser.items) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }
  console.log(dataUser.items);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-screen">
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Họ Tên
              </th>
              <th scope="col" className="px-6 py-3">
                Tài khoản
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Số ĐT
              </th>
              <th scope="col" className="px-6 py-3">
                Type of user
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataUser.items.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.hoTen}
                  </th>
                  <td className="px-6 py-4">{item.taiKhoan}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.soDt}</td>
                  <td className="px-6 py-4">{item.maLoaiNguoiDung}</td>
                  <td>
                    <NavLink to={`edit-user/${index}`}>
                      <button
                        className="p-2 rounded-md bg-green-600 text-white"
                        onClick={() => {

                        }}
                      >
                        <BsPencilSquare />
                      </button>
                    </NavLink>
                    <NavLink to={'add-user'}>
                      <button
                        className="p-2 rounded-md bg-blue-500 ml-2 text-white"
                        onClick={() => {
                        }}
                      >
                        <FaPlus />
                      </button>
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center">
          <Pagination
            current={Number(searchParam.get("page"))}
            pageSize={10}
            onChange={(page, pageSize) => {
              setUseSearchParam({ page });
            }}
            total={dataUser.totalCount}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
