import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import {  useFormik } from "formik";
import { useState } from "react";
const AddNews = () => {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const {handleSubmit} = useFormik=({
    initialValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu:'',
      DangChieu: false,
      DangChieu:false,
      Hot: false,
      danhGia: 0,
      hinhAnh: {

      }
    },
    onSubmit: (values) => {
      console.log(values);
    },
  })
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
          <Input />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Số sao">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch className="bg-slate-400" />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch className="bg-slate-400" />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch className="bg-slate-400" />
        </Form.Item>
        <Form.Item label="Hình ảnh ">
          <input type="file" />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button  className="bg-blue-600 text-white ">Thêm phim</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNews;
