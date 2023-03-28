import React from "react";
import "./utils/antModal.css";
import { DatePicker, Form, InputNumber, Select } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { adminServices } from "./services/adminServices";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
const ShowTime = () => {

  let {idFilm} = useParams()
  console.log(idFilm)
  const [state, setState] = useState([
    {
      heThongRapChieu: [],
      cumRapChieu: [],
    },
  ]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await adminServices.adminGetInfoCinemaSys();
        setState({
          ...state,
          heThongRapChieu: response.data.content,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
const fomik = useFormik({
  initialValues:{
    maPhim: idFilm,
    ngayChieuGioChieu:'',
    maRap:'',
    giaVe:''
  },
  onSubmit:  async (values)=>{
    console.log(values)
      try{
        const res = await adminServices.adminTaoLichChieu(values)
        alert('res.data.content')
      }catch(err){
        console.log(err)
    }

  }
  
})
  const handleChangeHeThongRap =  (value) => {
    // từ hệ thống rạp call api lấy thông tin cụm rạp
    
    console.log('value', value.split(' ').join('%20'))
    async function fecthDataCinema(){
      try {
        const res = await adminServices.adminGetInfoCinema(value.split(' ').join('%20'));
        setState({
          ...state,
          cumRapChieu: res.data.content,
        });
        console.log(res.data.content)
      } catch (err) {
        console.log(err);
      }
    }
    fecthDataCinema()
  };
  const handleChangeCumRap = (value) => {
    fomik.setFieldValue('maRap', value)
  }
  const onChangeDate = (value) => {
    console.log(value)
    fomik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'))

  };
  const onOk = (value) => {
    console.log(value)
    fomik.setFieldValue('ngayChieuGioChieu',moment(value).format('DD/MM/YYYY hh:mm:ss'))
  };
  const onChangInputNum = (value) => {
    fomik.setFieldValue('giaVe', value)
  };
  const convertSelectHTR = () => {
    return state.heThongRapChieu?.map((item, index) => {
      return { label: item.tenHeThongRap, value: item.tenHeThongRap };
    });
  };
  return (
    <div className="p-3">
      <Form
      onSubmitCapture={fomik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
      >
        <h3 className="text-2xl">Tạo lịch chiếu</h3>
        <Form.Item label="Hệ thống rạp">
          <Select
            options={convertSelectHTR()}
            onChange={handleChangeHeThongRap}
            placeholder="Vui lòng chọn rạp"
          />
        </Form.Item>
        <Form.Item label="Cụm rạp">
          <Select
            options={state.cumRapChieu?.map((item) => ({
              label: item.tenCumRap,
              value: item.tenCumRap,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Vui lòng chọn rạp"
          />
        </Form.Item>
        <Form.Item label="Ngày chiếu & Giờ chiếu">
          <DatePicker format='DD/MM/YYYY hh:mm:ss' showTime onChange={onChangeDate} onOk={onOk} />
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber min={75000} max={150000} onChange={onChangInputNum} />
        </Form.Item>
        <Form.Item label="Tác vụ :">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Tạo lịch chiếu
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowTime;
