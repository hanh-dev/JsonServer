import React, { useState } from 'react';
import Slide from './layout_page/Slide.js';
import Header from './layout_page/Header.js';
import Footer from './layout_page/Footer.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Gửi request lên json-server
    const response = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      toast.success("Đăng ký thành công!");
      setTimeout(() => {
        history.push('/login');
      }, 1500);
    } else {
      toast.error("Đăng ký thất bại!");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div id="content">
          <form onSubmit={handleSubmit} className="beta-form-checkout">
            <div className="row">
              <div className="col-sm-3" />
              <div className="col-sm-6">
                <h4>Đăng ký</h4>
                <div className="space20">&nbsp;</div>
                <div className="form-block">
                  <label htmlFor="username">Tên đăng ký*</label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-block">
                  <label htmlFor="password">Mật khẩu*</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-block">
                  <button type="submit" className="btn btn-success">Đăng ký</button>
                </div>
              </div>
              <div className="col-sm-3" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Register;
