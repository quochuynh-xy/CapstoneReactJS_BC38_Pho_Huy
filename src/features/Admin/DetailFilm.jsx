import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./utils/Loading";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./utils/antModal.css";
import { NavLink } from "react-router-dom";
import { getDetailFilm } from "./thunk";
const App = () => {
  const dataDetailFilm = useSelector((state) => state.admin.filmDetail);
  console.log(dataDetailFilm);
  const dispatch = useDispatch();

  // xử lý form
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  // handle get maPhim when click
  // check điều kiện data lần đâu
  if (!dataDetailFilm || !dataDetailFilm.length)
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{
              width: 90,
            }}
            className="flex items-center bg-blue-500"
          >
            <SearchOutlined />
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "maPhim",
      dataIndex: "maPhim",
      ...getColumnSearchProps("maPhim"),
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "hinhAnh",
      dataIndex: "hinhAnh",
      render: (text, film) => (
        <img src={film.hinhAnh} alt={film.tenPhim} width={150} height={100} />
      ),
    },
    {
      title: "tenPhim",
      dataIndex: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
      width: "25%",
    },
    {
      title: "moTa",
      dataIndex: "moTa",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, film) => (
        <div className="flex  ">
          <NavLink to={`edit-film/${film?.maPhim}`}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={()=> {
                dispatch(getDetailFilm(film?.maPhim))
              }}
            >
              <AiOutlineEdit />
            </button>
          </NavLink>
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {}}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataDetailFilm} />
    </div>
  );
};
export default App;
