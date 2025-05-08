import React, { useState } from 'react';
import Slide from './layout_page/Slide.js';
import Header from './layout_page/Header.js';
import Footer from './layout_page/Footer.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
      localStorage.setItem('username', username);
    } else {
      toast.error("Sai tên đăng nhập hoặc mật khẩu !");
    }
  };

  if (loggedIn) {
    toast.success("Đăng nhập thành công");
    return <Redirect to="/product-list" />;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div id="content">
          <form action="#" method="post" onSubmit={onLogin} className="beta-form-checkout">
            <div className="row">
              <div className="col-sm-3" />
              <div className="col-sm-6">
                <h4>Đăng nhập</h4>
                <div className="space20">&nbsp;</div>
                <div className="form-block">
                  <label htmlFor="username">UserName*</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                <div className="form-block">
                  <label htmlFor="password">Password*</label>
                  <input 
                    className="form-control" 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    required 
                  />
                </div>
                <div className="form-block">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </div>
              <div className="col-sm-3" />
            </div>
          </form>
        </div> {/* #content */}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Login;
