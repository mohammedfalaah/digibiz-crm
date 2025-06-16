import React, { useState } from 'react';
import Axioscall from './services/Axioscall';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [passwordType, setPasswordType] = useState('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// if (!emailRegex.test(username)) {
//   toast.error('Enter a valid email address');
//   return;
// }

    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }

    // if (password.length < 6) {
    //   toast.error('Password must be at least 6 characters');
    //   return;
    // }

    try {
      let data = { username, password };
      const res = await Axioscall('post', 'user/login', data, false);
      console.log('Login Success:', res.data.data);
      const decodedToken = jwtDecode(res.data.data.token);
      console.log(decodedToken,"decoded token");
      localStorage.setItem('digibiztocken', res.data.data.token);
      if(decodedToken.role=="superadmin"||decodedToken.role=='admin'){
        toast.success(res.data.message);
        navigate('/');
      }
      else{
        toast.error("You don't have Permission to Access")
      }
    
    } catch (err) {
      console.error('Login Failed:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-primary-subtle">
                  <div style={{ background: "black", color: "white" }} className="row">
                    <div className="col-7">
                      <div className="text-primary p-4">
                        <h5 style={{ color: "#a8870f" }}>Login</h5>
                      </div>
                    </div>
                    <div className="col-5 align-self-end">
                      <img src="assets/images/construction-silhouette-removebg-preview.png" alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="auth-logo">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJGyYm_xL81Josj16wvc_z9BMIHK3Iw1vRnQ&s" alt="" className="rounded-circle" height={34} />
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <form className="form-horizontal" onSubmit={login}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group auth-pass-inputgroup">
                          <input
                            type={passwordType}
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}
                            className="btn btn-light"
                          >
                            <i className="mdi mdi-eye-outline" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 d-grid">
                        <button
                          style={{ background: "#e6ac00" }}
                          className="btn btn-primary waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Optional: Signup & Footer */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
