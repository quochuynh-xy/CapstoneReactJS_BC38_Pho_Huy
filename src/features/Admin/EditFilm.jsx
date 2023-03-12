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
import { useSelector } from "react-redux";
import moment from "moment";

const EditFilm = () => {
  const dataFillForm = useSelector((state) => state.admin.filmDetailForUpdate);
  console.log(dataFillForm);
  const [imgSrc, setImgSrc] = useState(null);

  const userSchema = object({
    tenPhim: string().required("*Vui lòng nhập tên phim"),
    trailer: string().required("*Vui lòng nhập đường dẫn "),
    moTa: string().required("*Vui lòng nhập mô tả"),
  });
  const { handleSubmit, setFieldValue, handleChange, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
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
          } else {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      },
      validationSchema: userSchema,
      validateOnBlur: false,
    });
  useEffect(() => {
    console.log(touched);
  }, [touched]);
  const handleSwitchChange = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    // lấy ra file từ event
    let file = e.target.files[0];
    // tạo đối tượng để đọc file
    if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result)
        setImgSrc(e.target.result); // set hình base64
      };

      // truyền dữ liệu lên form
      setFieldValue("hinhAnh", file);
    }
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
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input />
        </Form.Item>

        <Form.Item label="Ngày chiếu: ">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={(value) => {
              let ngayKhoiChieu = moment(value.$d).format("DD/MM/YYYY");
              setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
            }}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber onChange={handleChangeInputNumber} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleSwitchChange} className="bg-slate-400" />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleSwitchChange} className="bg-slate-400" />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleSwitchChange} className="bg-slate-400" />
        </Form.Item>
        <Form.Item label="Hình ảnh: ">
          <input type="file" onChange={handleChangeFile} />
        </Form.Item>
        <Form.Item label="Tác vụ: ">
          <Button className="bg-blue-500 text-white">Xác nhận</Button>
          <Button className="ml-3 bg-green-500 text-white">Hủy</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFilm;
