import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Wrapper from './layout_admin/wrapper.js';
import Banner from './layout_admin/banner.js';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
    color: '',
    name_category: '',
    material: '',
    expiry_date: '',
    origin: '',
    description: '',
    tinhtranghang: true
  });

  const imageRef = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/products/${id}`)
        .then(res => {
          const data = res.data;
          setFormData({
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image,
            color: data.color,
            name_category: data.name_category,
            material: data.material,
            expiry_date: data.expiry_date,
            origin: data.origin,
            description: data.description,
            tinhtranghang: data.tinhtranghang,
          });
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const onChange = (event) => {
    const { name, type, value } = event.target;
    let newValue = value;

    if (name === 'tinhtranghang') {
      newValue = value === 'true';
    }

    if (type === 'file') {
      newValue = imageRef.current.value.replace(/C:\\fakepath\\/i, "/images/");
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const onSave = (e) => {
    e.preventDefault();
    const {
      name, price, image, name_category, color, material,
      expiry_date, origin, description, tinhtranghang
    } = formData;

    if (formData.id) {
      axios.put(`http://localhost:3000/products/${formData.id}`, {
        name, price, image, color, name_category, material,
        expiry_date, origin, description, tinhtranghang
      }).then(() => {
        toast.success("Cập nhật sản phẩm thành công");
        history.goBack();
      });
    } else {
      if (!name || !price || !image || !material || !expiry_date) {
        toast.warn("Vui lòng nhập đủ nội dung");
        return;
      }
      axios.post('http://localhost:3000/products', {
        name, price, image, color, name_category, material,
        expiry_date, origin, description, tinhtranghang
      }).then(() => {
        toast.success("Thêm sản phẩm thành công");
        history.goBack();
      });
    }
  };

  const onClear = () => {
    setFormData({
      id: '',
      name: '',
      price: '',
      image: '',
      color: '',
      name_category: '',
      material: '',
      expiry_date: '',
      origin: '',
      description: '',
      tinhtranghang: true
    });
  };

  return (
    <React.Fragment>
      <div id="wrapper">
        <Wrapper />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="contentt">
            <Banner />
            <div className="panel panel-warning col-md-8 ml">
              <div className="container">
                <div className="panel-body mt-4">
                  <form onSubmit={onSave}>
                    <div className="form-group">
                      <label>Tên Sản phẩm :</label>
                      <input type="text" name="name" value={formData.name} onChange={onChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Giá Sản phẩm ($) :</label>
                      <input type="number" name="price" value={formData.price} onChange={onChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Chọn Ảnh :</label>
                      <input type="file" name="image" ref={imageRef} onChange={onChange} className="form-control" />
                    </div>
                    <label>Loại sản phẩm:</label>
                    <select className="form-control" name="name_category" value={formData.name_category} onChange={onChange}>
                      <option value="sản phẩm mới">mới</option>
                      <option value="sản phẩm hot">hot</option>
                      <option value="sản phẩm khuyến mãi">khuyến mãi</option>
                    </select>
                    <div className="form-group">
                      <label>Màu bánh :</label>
                      <input type="text" name="color" value={formData.color} onChange={onChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Nguyên liệu :</label>
                      <input type="text" name="material" value={formData.material} onChange={onChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Hạn sử dụng :</label>
                      <input type="date" name="expiry_date" value={formData.expiry_date} onChange={onChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Xuất xứ :</label>
                      <input type="text" name="origin" value={formData.origin} onChange={onChange} className="form-control" />
                    </div>
                    <label>Tình trạng hàng :</label>
                    <select className="form-control" name="tinhtranghang" value={formData.tinhtranghang} onChange={onChange}>
                      <option value={true}>Còn hàng</option>
                      <option value={false}>Hết hàng</option>
                    </select>
                    <div className="form-group">
                      <label>Mô tả :</label>
                      <input type="text" name="description" value={formData.description} onChange={onChange} className="form-control" />
                    </div>
                    <br />
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">Lưu</button>&nbsp;
                      <button type="button" onClick={onClear} className="btn btn-primary">Clear</button>
                      <NavLink to="/product-list" className="btn btn-primary ml-1">Trở về</NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Add;