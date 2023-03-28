import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailFilm, updateDetailFilm } from "./thunk";

const EditFilm = () => {
  const dataFillForm = useSelector((state) => state.admin.filmDetailForUpdate);
  console.log(dataFillForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getDetailFilm(id));
  }, [id, dispatch]);
  const [imgSrc, setImgSrc] = useState("");
  const userSchema = object({
    tenPhim: string().required("*Vui lòng nhập tên phim"),
    trailer: string().required("*Vui lòng nhập đường dẫn "),
    moTa: string().required("*Vui lòng nhập mô tả"),
  });
  const fomik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: dataFillForm.maPhim,
      tenPhim: dataFillForm.tenPhim,
      trailer: dataFillForm.trailer,
      moTa: dataFillForm.moTa,
      ngayKhoiChieu: dataFillForm.ngayKhoiChieu,
      dangChieu: dataFillForm.dangChieu,
      sapChieu: dataFillForm.sapChieu,
      hot: dataFillForm.hot,
      danhGia: dataFillForm.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      console.log(values);

      // create dataForm
      values.maNhom = "GP01";
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else if (values.hinhAnh !== null) {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      dispatch(updateDetailFilm(formData));
    },
    validationSchema: userSchema,
    validateOnBlur: false,
  });
  useEffect(() => {
    console.log(fomik.touched);
  }, [fomik.touched]);
  const handleSwitchChange = (name) => {
    return (value) => {
      fomik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      fomik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = async (e) => {
    // lấy ra file từ event
    let file = e.target.files[0];
    await fomik.setFieldValue("hinhAnh", file);
    // tạo đối tượng để đọc file
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" || 
      file.type === 'image/webp'
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result)
        setImgSrc(e.target.result); // set hình base64
      };

      // truyền dữ liệu lên form
    }
  };
  const handleDatePicker = (value) => {
    fomik.setFieldValue("ngayKhoiChieu", moment(value));
  };
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div className="p-2">
      <h2 className="font-medium ml-2 mb-2">
        Tác vụ: Chỉnh sửa thông tin phim
      </h2>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        style={{
          maxWidth: 600,
        }}
        onSubmitCapture={fomik.handleSubmit}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={fomik.handleChange}
            value={fomik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={fomik.handleChange}
            value={fomik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={fomik.handleChange}
            value={fomik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Ngày chiếu: ">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={handleDatePicker}
            value={moment(fomik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            name="danhGia"
            onChange={handleChangeInputNumber("danhGia")}
            value={fomik.values.danhGia}
            min={1}
            max={5}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            name="dangChieu"
            onChange={handleSwitchChange("dangChieu")}
            className="bg-slate-400"
            checked={fomik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            name="sapChieu"
            onChange={handleSwitchChange("sapChieu")}
            className="bg-slate-400"
            checked={fomik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            name="hot"
            onChange={handleSwitchChange("hot")}
            className="bg-slate-400"
            checked={fomik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh: ">
          <input name="hinhAnh" type="file" onChange={handleChangeFile} />
          <img
            src={imgSrc === "" ? dataFillForm.hinhAnh : imgSrc}
            alt="img"
            width={150}
            height={125}
            className="mt-2"
          />
        </Form.Item>
        <Form.Item label="Tác vụ: ">
        <button  className="bg-blue-500 text-white px-3 py-1 rounded-md">
            Xác nhận
          </button>


          <Button
            className="ml-3 bg-green-500 text-white"
            onClick={() => {
              navigate("/admin/detail-films");
            }}
          >
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFilm;
