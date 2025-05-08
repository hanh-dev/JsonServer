import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from './layout_admin/wrapper.js';
import Banner from './layout_admin/banner.js';
import { useParams } from 'react-router-dom';

const ProDetailAdmin = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams(); // Using useParams to get the product id from URL

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <React.Fragment>
      <div>
        <div id="wrapper">
          <Wrapper />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="contentt">
              <Banner />
              <div className="container mb-5 mt-5">
                <div className="row">
                  <div className="col-sm-4">
                    <img
                      src={product.image}
                      height="300"
                      width="300"
                      alt=""
                    />
                  </div>
                  <div className="col-sm-8">
                    <div className="single-item-body">
                      <h2 className="single-item-title">{product.name}</h2>
                      <p className="single-item-price">
                        <span>${product.price}</span>
                      </p>
                    </div>
                    <div className="clearfix" />
                    <p>Màu bánh:</p>
                    <div className="single-item-options">
                      <h2 className="single-item-title">{product.color}</h2>
                      <div className="clearfix" />
                    </div>
                    <p>Nguyên liệu:</p>
                    <div className="single-item-options">
                      <h2 className="single-item-title">{product.material}</h2>
                      <div className="clearfix" />
                    </div>
                    <p>Xuất xứ:</p>
                    <div className="single-item-options">
                      <h2 className="single-item-title">{product.origin}</h2>
                      <div className="clearfix" />
                    </div>
                    <p>Hạn sử dụng:</p>
                    <div className="single-item-options">
                      <h2 className="single-item-title">
                        {product.expiry_date}
                      </h2>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
                <div className="woocommerce-tabs">
                  <ul className="tabs">
                    <li className="active">
                      <a>Mô tả</a>
                    </li>
                    <li>
                      <a>Reviews (0)</a>
                    </li>
                  </ul>
                  <div
                    className="panel"
                    id="tab-description"
                    style={{ display: 'block' }}
                  >
                    <p>{product.description}</p>
                  </div>
                  <div className="panel" style={{ display: 'none' }}>
                    <p>No Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProDetailAdmin;
