import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ApiServices from './ApiServices';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault(); //to stop form from submission
    setLoad(true);
    let data = {
      email: email,
      password: password
    };

    ApiServices.getLogin(data)
      .then((res) => {
        if (res.data.success === true) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.data.email);
          toast.success("Login successfully");
          setTimeout(() => {
            nav("/ToDo");
          }, 2000);
        } else {
          console.log("no token found");
          toast.error("invalid email");
          setTimeout(() => {
            setLoad(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const obj = {
    display: "block",
    margin: "0 auto"
  };

  return (
    <>
      <main>
        <div className="container">

          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 mt-2 mb-2 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="/assets/img/logo1.png" alt="" />
                      <span className="d-none d-lg-block">TO DO APP</span>
                    </a>
                  </div>

                  <PacmanLoader color="blue" size={40} cssOverride={obj} loading={load} />
                  <section className={load === true ? "d-none" : "my-5"}>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">
                            Login to Your Account
                          </h5>
                          <p className="text-center small">
                            Enter your username &amp; password to login
                          </p>
                        </div>
                        <form className="row g-3 needs-validation" noValidate="">
                          <div className="col-12">
                            <label htmlFor="yourUsername" className="form-label">
                              Username
                            </label>
                            <div className="input-group has-validation">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                @
                              </span>
                              <input
                                type="text"
                                name="username"
                                className="form-control"
                                id="yourUsername"
                                required=""
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                              />
                              <div className="invalid-feedback">
                                Please enter your username.
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="yourPassword" className="form-label">
                              Password
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                name="password"
                                className="form-control"
                                id="yourPassword"
                                required=""
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                              />
                              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                              </button>
                              <div className="invalid-feedback">
                                Please enter your password!
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="remember"
                                defaultValue="true"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="rememberMe"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="btn btn-primary w-100" type="submit" onClick={handleForm}>
                              Login
                            </button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0">
                              Don't have an account?{" "}
                              <Link to="/UserRegister">Create an account</Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>

                  </section>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* End #main */}

    </>
  );
}
