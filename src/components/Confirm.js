import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from './layout_admin/wrapper.js';
import Banner from './layout_admin/banner.js';
import { useParams, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {
  const { id } = useParams();
  const history = useHistory();

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/contacts/${id}`)
        .then((res) => {
          const data = res.data;
          setStatus(data.status);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'status') {
      setStatus(value);
    }
  };

  const onSave = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/contacts/${id}`, {
        status: status === 'true' || status === true,
      })
      .then(() => {
        toast.success("Cập nhật trạng thái thành công");
        history.goBack();
      })
      .catch((err) => {
        toast.error("Đã xảy ra lỗi khi cập nhật");
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <div>
        <div id="wrapper">
          <Wrapper />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="contentt">
              <Banner />
              <form onSubmit={onSave} className="contact-form">
                <select
                  className="form-control sl"
                  name="status"
                  value={status}
                  onChange={onChange}
                  required
                >
                  <option value={true}>Xác nhận</option>
                  <option value={false}>Chưa xác nhận</option>
                </select>
                <div className="form-block">
                  <button type="submit" className="btn btn-primary">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Add;