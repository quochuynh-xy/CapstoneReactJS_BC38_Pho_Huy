import React, { useEffect } from "react";
import { Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addNewUser } from "./thunk";
const AddUser = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch()
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const schema = object({
    taiKhoan: string().required("*Vui lòng điền tài khoản"),
    matKhau: string().required("*Vui lòng điền mật khẩu"),
    email: string()
      .email("*Email không đúng định dạng")
      .required("*Vui lòng điền email"),
    soDt: string().required("*Vui lòng điền SĐT"),
    maNhom: string().required("*Vui lòng điền mã  nhóm "),
    hoTen: string().required("*Vui lòng điền tên"),
  });
  const { handleSubmit, setFieldValue, handleChange, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "",
        maLoaiNguoiDung: "",
        hoTen: "",
      },
      onSubmit: (values) => {
        console.log(values);
        dispatch(addNewUser(values))
      },
      validationSchema: schema,
      validateOnBlur: false,
    });
  useEffect(() => {
    console.log(touched);
  }, [touched]);

  return (
    <div className="p-2">
      <h2 className="mb-4 font-semibold text-xl">Tác vụ: Thêm người dùng</h2>
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
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input name="hoTen" onChange={handleChange} />
          {errors.hoTen && touched.hoTen && (
            <span className="text-red-500">{errors.hoTen}</span>
          )}
        </Form.Item>
        <Form.Item label="Tài Khoản">
          <Input name="taiKhoan" onChange={handleChange} />
          {errors.taiKhoan && touched.taiKhoan && (
            <span className="text-red-500">{errors.taiKhoan}</span>
          )}
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input name="matKhau" onChange={handleChange} />
          {errors.matKhau && touched.matKhau && (
            <span className="text-red-500">{errors.matKhau}</span>
          )}
        </Form.Item>
        <Form.Item label="Email">
          <Input name="email" onChange={handleChange} />
          {errors.email && touched.email && (
            <span className="text-red-500">{errors.email}</span>
          )}
        </Form.Item>
        <Form.Item label="Số ĐT">
          <Input name="soDt" onChange={handleChange} />
          {errors.soDt && touched.soDt && (
            <span className="text-red-500">{errors.soDt}</span>
          )}
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Input name="maNhom" onChange={handleChange} />
          {errors.maNhom && touched.maNhom && (
            <span className="text-red-500">{errors.maNhom}</span>
          )}
        </Form.Item>
        <Form.Item label="Type User">
          <Select
            name="maLoaiNguoiDung"
            onChange={(value) => setFieldValue("maLoaiNguoiDung", value)}
          >
            <Select.Option value="QuanTri">QuanTri</Select.Option>
            <Select.Option value="KhachHang">KhachHang</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tác vụ :">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Thêm
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
