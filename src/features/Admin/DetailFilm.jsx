import React from "react";
import { useSelector } from "react-redux";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Loading from "./utils/Loading";

const DetailFilm = () => {
  const filmData = useSelector((state) => state.admin.filmDetail);


  

  return (
    <div className="h-99">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  overscroll-y-auto	">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky  top-0">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Mã phim
            </th>
            <th scope="col" className="px-6 py-3">
              Hình ảnh
            </th>
            <th scope="col" className="px-6 py-3">
              Tên phim
            </th>
            <th scope="col" className="px-6 py-3">
              Mô tả
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filmData.length ? (
            filmData.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.maPhim}
                  </th>
                  <td class="px-6 py-4">
                    <img src={item.hinhAnh} alt="film img" width="100px" />
                  </td>
                  <td class="px-6 py-4">{item.tenPhim}</td>
                  <td class="px-6 py-4 ">{item.moTa}</td>
                  <td class="px-6 py-4">
                    <div className="flex text-xl">
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        onClick={() => {
                          // handleDeleteFilm(findIdFilm)
                        }}
                        type="button"
                        class="text-white  bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <Loading />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailFilm;
