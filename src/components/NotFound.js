import React from 'react';
import Header from './layout_page/Header.js';
import Footer from './layout_page/Footer.js';

const NotFound = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h1 className="text-center text-danger mt-5 mb-5">
          404 - Không tìm thấy trang!
        </h1>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default NotFound;
