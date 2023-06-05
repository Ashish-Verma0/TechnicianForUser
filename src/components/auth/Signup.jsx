import React, { useEffect, useState } from "react";
import "./Signup.css";
import { postFetchUser } from "../api/Api";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [data, setData] = useState({
    userName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setValid(regex.test(passwordValue));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("userName", data.userName);
    myForm.append("email", data.email);
    myForm.append("phone", data.phone);
    myForm.append("state", data.state);
    myForm.append("city", data.city);
    myForm.append("password", password);
    myForm.append("lat", latitude);
    myForm.append("lng", longitude);
    myForm.append("avatar", avatar);

    try {
      const res = await postFetchUser(
        "http://localhost:8500/api/user/create",
        myForm
      );

      if (res.data.success === true) {
        navigate("/login");
        alert("signup successfully");
        setData({
          userName: "",
          email: "",
          phone: "",
          state: "",
          city: "",
        });
        setPassword("");
        setValid(false);
        setAvatar("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
                alt="Sample photo"
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Registration Info
                </h3>
                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form3Example1q"
                      className="form-control"
                      name="userName"
                      value={data.userName}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example1q">
                      Name
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleDatepicker1"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label"
                        >
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <input
                          type="tel"
                          className="form-control"
                          id="exampleDatepicker1"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label"
                        >
                          Phone
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleDatepicker1"
                          name="city"
                          value={data.city}
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label"
                        >
                          City
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <input
                          type="text"
                          className="form-control"
                          id="exampleDatepicker1"
                          name="state"
                          value={data.state}
                          onChange={handleChange}
                          required
                        />
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label"
                        >
                          State
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <input
                          type="password"
                          className="form-control"
                          id="exampleDatepicker1"
                          name="password"
                          placeholder="Mixed character of A-a-@-1"
                          value={password}
                          onChange={handlePasswordChange}
                          required
                        />
                        {password ? (
                          valid ? (
                            <p style={{ color: "green" }}>Password is strong</p>
                          ) : (
                            <p style={{ color: "red" }}>Password is weak</p>
                          )
                        ) : (
                          ""
                        )}
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label"
                        >
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline datepicker">
                        <input
                          type="file"
                          className="form-control"
                          id="exampleDatepicker1"
                          name="avatar"
                          onChange={(e) => setAvatar(e.target.files[0])}
                          required
                        />
                        <label
                          htmlFor="exampleDatepicker1"
                          className="form-label"
                        >
                          Avatar
                        </label>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success btn-lg mb-1">
                    Submit
                  </button>
                </form>
                <p style={{ textAlign: "center" }}>OR</p>
                <div>
                  <p>
                    Already have an account :-{" "}
                    <NavLink to="/login">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg mb-1"
                      >
                        SignIn
                      </button>
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
