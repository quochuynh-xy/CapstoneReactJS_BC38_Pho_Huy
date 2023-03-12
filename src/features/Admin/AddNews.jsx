import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addNewFilm } from "./thunk";
const AddNews = () => {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const dispatch = useDispatch();
  const userSchema = object({
    tenPhim: string().required("*Vui lòng nhập tên phim"),
    trailer: string().required("*Vui lòng nhập đường dẫn "),
    moTa: string().required("*Vui lòng nhập mô tả"),
  });
  const [imgSrc, setImgSrc] = useState(null);
  const { handleSubmit, setFieldValue, handleChange, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        tenPhim: "",
        trailer: "",
        moTa: "",
        ngayKhoiChieu: "",
        dangChieu: false,
        sapChieu: false,
        hot: false,
        danhGia: 0,
        hinhAnh: {},
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
        // call api
        dispatch(addNewFilm(formData));
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
  return (
    <div className="p-2">
      <h3 className="font-medium mb-5">Tác vụ: Thêm phim</h3>
      <Form
        onSubmitCapture={handleSubmit}
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
          {errors.tenPhim && touched.tenPhim && (
            <span className="text-red-500">{errors.tenPhim}</span>
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={handleChange} />
          {errors.trailer && touched.trailer && (
            <span className="text-red-500">{errors.trailer}</span>
          )}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={handleChange} />
          {errors.moTa && touched.moTa && (
            <span className="text-red-500">{errors.moTa}</span>
          )}
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker
            format={"DD/MM/YYYY"}
            onChange={(value) => {
              let ngayKhoiChieu = moment(value.$d).format("DD/MM/YYYY");
              setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
            }}
          />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            min={1}
            max={5}
          />
        </Form.Item>

        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            className="bg-slate-400"
            onChange={handleSwitchChange("dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            className="bg-slate-400"
            onChange={handleSwitchChange("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            className="bg-slate-400"
            onChange={handleSwitchChange("hot")}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh ">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/gif"
          />
          <br />
          <img src={imgSrc} alt="img film" width="200px" height="150px" />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button className="bg-blue-600 text-white p-1 rounded-md ">
            Thêm phim
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNews;
